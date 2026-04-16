"use client";

import { useState } from "react";

export default function GitaChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const displayNameForRole = (role) => {
    if (role === "user") return "Bhakta";
    return "Madhav";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);

    const current = input;
    setInput("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: current }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Madhav is unable to respond right now. Please try again in a moment." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "rgba(255, 215, 100, 0.95)",
          border: "1px solid rgba(178, 132, 6, 0.35)",
          padding: "0",
          borderRadius: "50%",
          width: "62px",
          height: "62px",
          boxShadow: "0 10px 25px rgba(122, 31, 43, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img
          src="/images.jpg"
          alt="Krishna"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "24px",
            width: "360px",
            height: "520px",
            background: "linear-gradient(180deg, #fff7e6 0%, #ffffff 70%)",
            border: "1px solid rgba(178, 132, 6, 0.35)",
            borderRadius: "16px",
            boxShadow: "0 16px 40px rgba(122, 31, 43, 0.18)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              background:
                "linear-gradient(90deg, rgba(178, 132, 6, 0.22) 0%, rgba(122, 31, 43, 0.10) 100%)",
              borderBottom: "1px solid rgba(178, 132, 6, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(178, 132, 6, 0.25)",
                background: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <img
                src="/images.jpg"
                alt="Krishna"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 800, color: "#5a1622" }}>Madhav</div>
              <div style={{ fontSize: "12px", color: "rgba(90, 22, 34, 0.75)" }}>
                Calm guidance from the Gita
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 10px",
              background: "rgba(255, 255, 255, 0.25)",
              borderRadius: "16px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    marginBottom: "6px",
                    color: "rgba(90, 22, 34, 0.75)",
                    fontWeight: 700,
                  }}
                >
                  {displayNameForRole(m.role)}:
                </div>
                <div
                  style={{
                    maxWidth: "92%",
                    padding: "10px 12px",
                    borderRadius: "14px",
                    background:
                      m.role === "user"
                        ? "rgba(122, 31, 43, 0.10)"
                        : "rgba(178, 132, 6, 0.12)",
                    border:
                      m.role === "user"
                        ? "1px solid rgba(122, 31, 43, 0.18)"
                        : "1px solid rgba(178, 132, 6, 0.18)",
                    color: "#2b1b18",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "12px 12px 14px",
              borderTop: "1px solid rgba(178, 132, 6, 0.25)",
              background: "rgba(255, 255, 255, 0.55)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question for Madhav..."
              style={{
                flex: 1,
                borderRadius: "12px",
                border: "1px solid rgba(178, 132, 6, 0.28)",
                padding: "12px 12px",
                outline: "none",
                background: "rgba(255, 255, 255, 0.8)",
                color: "#2b1b18",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(178, 132, 6, 0.35)",
                background: "rgba(178, 132, 6, 0.20)",
                padding: "0 16px",
                cursor: "pointer",
                fontWeight: 800,
                color: "#5a1622",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}