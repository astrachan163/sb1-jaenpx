import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyACHoMMgDWqBdAnOeyrE9aHTLykSQ7TeLE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface GeminiResponse {
  content: string;
  resources: string[];
  generatedContent?: any;
}

export async function queryGemini(
  prompt: string,
  context: any[] = [],
  signal?: AbortSignal
): Promise<GeminiResponse> {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `${prompt}\n\nContext:\n${JSON.stringify(context, null, 2)}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          stopSequences: ["Human:", "Assistant:"]
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        signal,
        timeout: 30000
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const content = response.data.candidates[0].content.parts[0].text;
    
    return {
      content,
      resources: extractResources(content),
      generatedContent: extractGeneratedContent(content)
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Gemini API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('Network error: Failed to reach Gemini API');
      }
    }
    throw new Error('Failed to get response from Gemini API: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

function extractResources(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex) || [];
  
  return Array.from(new Set(
    matches.filter(url => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    })
  ));
}

function extractGeneratedContent(text: string): any {
  try {
    // Look for JSON blocks in the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    return null;
  } catch (error) {
    console.error('Error extracting generated content:', error);
    return null;
  }
}