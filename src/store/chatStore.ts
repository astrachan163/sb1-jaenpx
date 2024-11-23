import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant' | 'system' | 'stream';
  timestamp: number;
  metadata?: {
    scrapeUrl?: string;
    processingSteps?: string[];
    generatedContent?: any;
  };
}

interface ChatState {
  messages: Message[];
  streamingContent: string;
  isProcessing: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  updateStreamingContent: (content: string) => void;
  clearChat: () => Promise<void>;
  setProcessing: (status: boolean) => void;
}

const CACHE_KEY = 'chat-history-v1';
const MAX_MESSAGES = 1000;

const handleError = (error: unknown, context: string) => {
  console.error(`Chat store error (${context}):`, error);
  if (error instanceof Error) {
    throw new Error(`${context}: ${error.message}`);
  }
  throw new Error(`${context}: An unknown error occurred`);
};

const safeGetCache = async (): Promise<Message[]> => {
  try {
    const cached = await get(CACHE_KEY);
    return Array.isArray(cached) ? cached : [];
  } catch (error) {
    console.error('Error reading cache:', error);
    return [];
  }
};

const safeSaveCache = async (messages: Message[]): Promise<void> => {
  try {
    // Ensure messages are serializable
    const cleanMessages = messages.map(msg => ({
      ...msg,
      metadata: msg.metadata ? JSON.parse(JSON.stringify(msg.metadata)) : undefined
    }));
    await set(CACHE_KEY, cleanMessages);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      streamingContent: '',
      isProcessing: false,

      addMessage: async (message) => {
        try {
          const newMessage = {
            ...message,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          };

          // Update state
          set((state) => {
            const currentMessages = Array.isArray(state.messages) ? state.messages : [];
            const updatedMessages = [...currentMessages, newMessage].slice(-MAX_MESSAGES);
            return { messages: updatedMessages };
          });

          // Update cache
          const currentState = get();
          await safeSaveCache(currentState.messages);

        } catch (error) {
          handleError(error, 'Failed to add message');
        }
      },

      updateStreamingContent: (content) => {
        set({ streamingContent: content });
      },

      clearChat: async () => {
        try {
          set({ messages: [], streamingContent: '' });
          await del(CACHE_KEY);
        } catch (error) {
          handleError(error, 'Failed to clear chat');
        }
      },

      setProcessing: (status) => {
        set({ isProcessing: status });
      },
    }),
    {
      name: 'chat-storage',
      storage: {
        getItem: async (name) => {
          try {
            const messages = await safeGetCache();
            return {
              state: {
                messages,
                streamingContent: '',
                isProcessing: false
              }
            };
          } catch (error) {
            console.error('Storage getItem error:', error);
            return null;
          }
        },
        setItem: async (name, value) => {
          try {
            const { state } = value;
            if (state?.messages) {
              await safeSaveCache(state.messages);
            }
          } catch (error) {
            console.error('Storage setItem error:', error);
          }
        },
        removeItem: async (name) => {
          try {
            await del(CACHE_KEY);
          } catch (error) {
            console.error('Storage removeItem error:', error);
          }
        }
      }
    }
  )
);