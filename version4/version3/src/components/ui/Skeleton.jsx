import React from "react";

export function Skeleton({ width = "100%", height = "16px", borderRadius = "4px", style = {}, className = "" }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        padding: "16px 20px",
        background: "var(--c-surface)",
        border: "1px solid var(--c-border-subtle)",
        borderRadius: "6px",
        marginBottom: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton width="180px" height="18px" />
        <Skeleton width="80px" height="20px" borderRadius="12px" />
      </div>
      <Skeleton width="60%" height="14px" />
      <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
        <Skeleton width="120px" height="12px" />
        <Skeleton width="140px" height="12px" />
        <Skeleton width="100px" height="12px" />
      </div>
    </div>
  );
}
