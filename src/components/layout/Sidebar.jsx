import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { MOCK_USERS } from "../../data/mock";

export function Sidebar() {
  const { currentUser, setUser, isRecording, currentCase } = useApp();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    {
      group: "COURT SESSIONS",
      items: [
        { path: "/causelist", label: "Daily Cause List", roles: ["steno-01", "reader-01"] },
        { path: "/workspace", label: "Stenographer Workspace", roles: ["steno-01"] },
        { path: "/archive", label: "Precedent Archive", roles: ["steno-01", "reader-01", "admin-01"] },
      ],
    },
    {
      group: "ADMINISTRATION",
      items: [
        { path: "/admin", label: "Daily Roznama & Bench", roles: ["reader-01", "admin-01"] },
      ],
    },
  ];

  const filteredNavLinks = navLinks
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.roles.includes(currentUser.id)),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <aside
      className="app-sidebar"
      style={{
        width: "var(--sidebar-w)",
        height: "100vh",
        backgroundColor: "var(--c-surface)",
        borderRight: "1px solid var(--c-border)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        userSelect: "none",
        zIndex: 50,
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "20px 20px 16px 20px",
          borderBottom: "1px solid var(--c-border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            background: "var(--c-gold-gradient)",
            boxShadow: "var(--glow-gold)",
            border: "1px solid var(--c-gold-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontSize: "16px",
          }}
        >
          ⚖️
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--c-text-primary)",
              lineHeight: 1.1,
            }}
          >
            LEXRECORD
          </div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--c-text-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: "3px",
            }}
          >
            Tis Hazari Courts • Delhi
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <div style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        {filteredNavLinks.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "22px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--c-text-muted)",
                letterSpacing: "0.08em",
                padding: "0 10px 8px 10px",
              }}
            >
              {section.group}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "4px",
                    color: isActive ? "var(--c-gold-hover)" : "var(--c-text-secondary)",
                    backgroundColor: isActive ? "var(--c-gold-subtle)" : "transparent",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 400,
                    transition: "all 150ms ease",
                    boxShadow: isActive ? "var(--glow-gold)" : "none",
                    border: isActive ? "1px solid var(--c-gold-border)" : "1px solid transparent",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>{item.label}</span>
                      </div>
                      {item.path === "/workspace" && isRecording && (
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "var(--c-live)",
                            animation: "pulseDot 1.4s infinite ease-in-out",
                            boxShadow: "0 0 8px var(--c-live)",
                          }}
                          title="Audio Stream Active"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer with Clean Switcher */}
      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid var(--c-border)",
          backgroundColor: "var(--c-surface)",
          position: "relative",
        }}
      >
        {showUserDropdown && (
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              left: "10px",
              right: "10px",
              backgroundColor: "var(--c-surface-elevated)",
              border: "1px solid var(--c-border)",
              borderRadius: "6px",
              boxShadow: "var(--shadow-lg)",
              padding: "6px",
              zIndex: 100,
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--c-text-muted)",
                padding: "6px 8px",
                borderBottom: "1px solid var(--c-border-subtle)",
              }}
            >
              SWITCH COURT OPERATOR
            </div>
            {MOCK_USERS.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  setUser(u);
                  setShowUserDropdown(false);
                  navigate(u.defaultRoute);
                }}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: u.id === currentUser.id ? "var(--c-gold-subtle)" : "transparent",
                  color: u.id === currentUser.id ? "var(--c-gold-hover)" : "var(--c-text-primary)",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: u.id === currentUser.id ? "var(--c-gold-gradient)" : "var(--c-surface-elevated)",
                    color: u.id === currentUser.id ? "#000" : "inherit",
                    border: u.id === currentUser.id ? "1px solid var(--c-gold-border)" : "1px solid var(--c-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {u.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600 }}>{u.name}</div>
                  <div style={{ fontSize: "10px", color: "var(--c-text-muted)" }}>{u.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          title="Click to switch operator"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                background: "var(--c-gold-gradient)",
                border: "1px solid var(--c-gold-border)",
                boxShadow: "var(--glow-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontSize: "13px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {currentUser.avatar}
            </div>
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--c-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentUser.name}
              </div>
              <div style={{ fontSize: "11px", color: "var(--c-text-muted)", marginTop: "1px" }}>
                {currentUser.role}
              </div>
            </div>
          </div>
          <span style={{ color: "var(--c-text-muted)", fontSize: "12px", paddingLeft: "6px" }}>⇅</span>
        </div>
      </div>
    </aside>
  );
}
