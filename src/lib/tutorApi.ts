/**
 * API helper for the AI Tutor edge function.
 *
 * Calls the Supabase Edge Function `ai-tutor` which proxies requests to
 * Google Gemini server-side. The Gemini API key lives only in the edge
 * function's secrets — it is never exposed to the frontend.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/ai-tutor`;

export interface TutorMessage {
  role: 'user' | 'tutor';
  content: string;
}

export interface TutorResponse {
  answer: string;
  citations: [];
  note: string;
}

export async function askTutor(
  question: string,
  history: TutorMessage[]
): Promise<TutorResponse> {
  const response = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ question, history }),
  });

  if (!response.ok) {
    let errorMessage = `Request failed (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.error) {
        errorMessage = errorBody.error;
      }
    } catch {
      // Response wasn't JSON — use the status-based message
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (!data || typeof data.answer !== 'string') {
    throw new Error('The server returned an unexpected response format.');
  }

  return {
    answer: data.answer,
    citations: data.citations ?? [],
    note: data.note ?? '',
  };
}

export async function checkTutorHealth(): Promise<{
  status: string;
  gemini_configured: boolean;
}> {
  const response = await fetch(`${FUNCTION_URL}/health`, {
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`);
  }

  return response.json();
}
