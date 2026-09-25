import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { MOCK_USERS } from "../../data/mock";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import "./Login.css";

export function Login() {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0]);
  const [courtComplex, setCourtComplex] = useState("Tis Hazari Courts (Central)");
  const [pin, setPin] = useState("••••");

  const handleLogin = (e) => {
    e.preventDefault();
    setUser(selectedUser);
    navigate(selectedUser.defaultRoute);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Emblem & Title */}
        <div className="login-header">
          <div className="login-emblem">LR</div>
          <h1 className="login-title">LEXRECORD</h1>
          <p className="login-subtitle">DISTRICT & SESSIONS JUDICIARY CASE PROCESSING SYSTEM</p>
        </div>

        <form onSubmit={handleLogin} className="login-body">
          {/* Court Jurisdiction Select */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--c-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "6px",
              }}
            >
              Designated Court Complex & Bench
            </label>
            <select
              value={courtComplex}
              onChange={(e) => setCourtComplex(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "5px",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-primary)",
                fontSize: "13px",
                outline: "none",
              }}
            >
              <option value="Tis Hazari Courts (Central)">Tis Hazari Courts (Central District) — Court No. 4</option>
              <option value="Patiala House Courts (New Delhi)">Patiala House Courts (New Delhi) — Special CBI Court</option>
              <option value="Saket Courts (South)">Saket Courts (South District) — Court No. 12</option>
              <option value="Rouse Avenue Courts">Rouse Avenue Court Complex — Special Judge (PC Act)</option>
            </select>
          </div>

          {/* Operator Profile Select */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--c-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "8px",
              }}
            >
              Select Court Staff Profile
            </label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {MOCK_USERS.map((user) => {
                const isSelected = selectedUser.id === user.id;
                return (
                  <div
                    key={user.id}
                    className={`profile-card ${isSelected ? "active" : ""}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "2px",
                          backgroundColor: isSelected ? "var(--c-navy)" : "var(--c-surface-elevated)",
                          border: `1px solid ${isSelected ? "var(--c-navy)" : "var(--c-border)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: isSelected ? "#ffffff" : "var(--c-text-secondary)",
                        }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: isSelected ? "var(--c-navy)" : "var(--c-text-primary)" }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--c-text-muted)", marginTop: "2px" }}>
                          {user.role} • {user.court}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Badge variant="navy">Selected</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick PIN / Password */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--c-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Judicial Security PIN
              </label>
              <span style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>Mock Auth: 1234</span>
            </div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "5px",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-primary)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.2em",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ width: "100%", justifyContent: "center", borderRadius: "2px", fontSize: "15px" }}
          >
            Authenticate & Open Court Terminal →
          </Button>

          <div
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "11px",
              color: "var(--c-text-3)",
            }}
          >
            Connected to Court Stenography Network v2.4 • Tis Hazari LAN
          </div>
        </form>
      </div>
    </div>
  );
}
