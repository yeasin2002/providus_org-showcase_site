import { useCallback, useState } from "react";

// Types
interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  data?: { messageId: string };
}

interface UseSendEmailReturn {
  sendEmail: (payload: EmailPayload) => Promise<EmailResponse>;
  loading: boolean;
  error: string | null;
  data: EmailResponse | null;
  reset: () => void;
}

// Hook
export const useSendEmail = (): UseSendEmailReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EmailResponse | null>(null);

  const sendEmail = useCallback(
    async (payload: EmailPayload): Promise<EmailResponse> => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Failed to send email: ${res.statusText}`);
        }

        const responseData: EmailResponse = await res.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { sendEmail, loading, error, data, reset };
};

// Usage Example:
/*
function MyComponent() {
  const { sendEmail, loading, error, data, reset } = useSendEmail();

  const handleSendEmail = async () => {
    try {
      await sendEmail({
        to: "user@example.com",
        subject: "Welcome! 2",
        text: "Glad to have you here. my route handle is working",
      });
      console.log("Email sent successfully!");
    } catch (err) {
      console.error("Failed to send email");
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail} disabled={loading}>
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {error && <p className="error">{error}</p>}
      {data && <p className="success">{data.message}</p>}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
*/
