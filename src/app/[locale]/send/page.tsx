"use client";

import { useState } from "react";

const Send = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useState(false);

  const handleLogin = async () => {
    try {
      startTransition(true);

      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Welcome! 2 ",
          text: "Glad to have you here. my route handle is working",
        }),
      });

      const data = await res.json();

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
