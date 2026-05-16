import React from "react";
import styles from "./adminStyles";

function StatusBadge({ status }) {
    const isGood = status === "Active" || status === "Completed";
    const isWarning = status === "Pending" || status === "Processing";

    const color = isGood ? "#00ff88" : isWarning ? "#ffba00" : "#ff4444";

    return (
        <span
            style={{
                ...styles.badge,
                color,
                borderColor: color,
                background: isGood
                    ? "rgba(0,255,136,0.1)"
                    : isWarning
                    ? "rgba(255,186,0,0.1)"
                    : "rgba(255,68,68,0.1)"
            }}
        >
            {status}
        </span>
    );
}

export default StatusBadge;