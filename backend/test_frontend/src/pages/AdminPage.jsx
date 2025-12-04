import { useEffect, useState } from "react";

const AdminPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [alerts, setAlerts] = useState([]);

  const loadAlerts = async () => {
    const res = await fetch(`${API_URL}/1/alerts`);
    const data = await res.json();
    setAlerts(data.alerts);
  };

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {alerts.length === 0 ? (
        <p>No alerts yet</p>
      ) : (
        alerts.map((alert, index) => (
          <div
            key={index}
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#ffe6e6",
              border: "1px solid #ff4d4d",
            }}
          >
            <h3>🚨 Alert {index + 1}</h3>

            <h4>Classification:</h4>
            <pre>{alert.classification}</pre>

            <h4>Authenticity:</h4>
            <pre>{alert.authenticity}</pre>

            <h4>AI Response:</h4>
            <pre>{alert.response}</pre>

            <h4>Admin Alert:</h4>
            <pre>{alert.admin_alert}</pre>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
