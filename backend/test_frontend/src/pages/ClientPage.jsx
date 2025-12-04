import { useState } from "react";

const ClientPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendReport = async () => {
    if (!text.trim()) return alert("Please enter a report!");

    setLoading(true);
    setResult(null);

    const res = await fetch(`${API_URL}/1/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reporter_id: "client-user", text }),
    });

    const data = await res.json();
    setResult(data.result);

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Client Disaster Reporting</h1>

      <textarea
        rows="4"
        style={{ width: "100%", padding: "10px" }}
        placeholder="Describe the disaster..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={sendReport}
        style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Sending..." : "Send Report"}
      </button>

      {result && (
        <div style={{ marginTop: "20px", background: "#f2f2f2", padding: "15px" }}>
          <h2>AI Response</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ClientPage;
