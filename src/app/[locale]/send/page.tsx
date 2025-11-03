"use client";

import { useSendEmail } from "@/hooks/useSendEmail";
import { useState } from "react";

const Send = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useState(false);
  const { sendEmail, data } = useSendEmail();

  const handleLogin = async () => {
    try {
      startTransition(true);

      const res = await sendEmail({
        to: email,
        subject: "Welcome! 2",
        text: "Glad to have you here. my route handle is working",
      });
      console.log("🚀 ~ handleLogin ~ res:", res);

      console.log(data);
    } catch (error) {
      console.log(error);
      startTransition(false);
    } finally {
      startTransition(false);
    }
  };

  return (
    <form className="p-6 space-y-4">
      <input
        className="border px-3 py-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="button"
      >
        {isPending ? "Sending..." : "Login & Send Email"}
      </button>
    </form>
  );
};

export default Send;
