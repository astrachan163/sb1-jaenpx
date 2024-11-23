import React, { useState, useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MessageCircle, Send, Trash2, Loader, StopCircle, Copy, Save, Reply } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useChatStore } from '../store/chatStore';
import { queryGemini } from '../utils/geminiClient';
import { searchContent } from '../utils/contentSearch';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant' | 'system';
  timestamp: number;
  metadata?: any;
}

const ChatInterface: React.FC = () => {
  const {
    messages,
    streamingContent,
    isProcessing,
    addMessage,
    updateStreamingContent,
    clearChat,
    setProcessing
  } = useChatStore();

  const [input, setInput] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [savedNotes, setSavedNotes] = useState<Message[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const listRef = useRef<List>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    setProcessing(true);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      await addMessage({
        content: userMessage,
        type: 'user',
      });

      const relevantContent = await searchContent(userMessage);
      const response = await queryGemini(userMessage, relevantContent, abortControllerRef.current.signal);

      await addMessage({
        content: response.content,
        type: 'assistant',
        metadata: {
          resources: response.resources,
          generatedContent: response.generatedContent
        }
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        await addMessage({
          content: 'Response generation was stopped.',
          type: 'system',
        });
      } else {
        console.error('Error processing message:', error);
        await addMessage({
          content: 'An error occurred while processing your request. Please try again.',
          type: 'system',
        });
      }
    } finally {
      setProcessing(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const handleSaveNote = (message: Message) => {
    setSavedNotes(prev => [...prev, message]);
  };

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReply = (message: Message) => {
    setInput(`Regarding your message "${message.content.slice(0, 50)}...": `);
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const message = messages[index];
    if (!message) return null;

    return (
      <div style={style} className={`p-4 ${
        message.type === 'user' ? 'bg-gray-800' : 'bg-gray-900'
      }`}>
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-sm ${
              message.type === 'user' ? 'text-cyan-400' : 'text-gray-400'
            }`}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
            <div className="flex items-center gap-2">
              <CopyToClipboard text={message.content} onCopy={() => handleCopy(message.id)}>
                <button className="p-1 hover:text-cyan-400 transition-colors">
                  <Copy size={16} />
                </button>
              </CopyToClipboard>
              <button
                onClick={() => handleSaveNote(message)}
                className="p-1 hover:text-cyan-400 transition-colors"
              >
                <Save size={16} />
              </button>
              <button
                onClick={() => handleReply(message)}
                className="p-1 hover:text-cyan-400 transition-colors"
              >
                <Reply size={16} />
              </button>
            </div>
          </div>

          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>

          {copiedId === message.id && (
            <span className="text-sm text-cyan-400">Copied to clipboard!</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 w-[32rem] h-[600px] bg-gray-900 rounded-lg shadow-xl flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="text-cyan-400" />
          <h2 className="font-semibold">Learning Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 transition-colors ${
              showNotes ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            Notes ({savedNotes.length})
          </button>
          <button
            onClick={clearChat}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              itemCount={messages.length}
              itemSize={100}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>

        {isProcessing && (
          <div className="absolute bottom-20 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400">
                <Loader className="animate-spin" size={16} />
                <span>Generating response...</span>
              </div>
              <button
                onClick={handleStopGeneration}
                className="p-2 text-red-400 hover:text-red-500 transition-colors"
              >
                <StopCircle size={18} />
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any topic..."
            className="flex-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {showNotes && (
        <div className="absolute top-16 right-0 w-64 max-h-[400px] overflow-y-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-medium">Saved Notes</h3>
          </div>
          <div className="p-2">
            {savedNotes.length === 0 ? (
              <p className="text-sm text-gray-400 p-2">No saved notes yet</p>
            ) : (
              savedNotes.map((note, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-700/50 rounded cursor-pointer"
                  onClick={() => handleReply(note)}
                >
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {note.content}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(note.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;