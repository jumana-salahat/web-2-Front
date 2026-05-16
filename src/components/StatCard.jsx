function StatCard({ title, value, trend, icon }) {
    return (
        <div style={{
            background: "rgba(20, 20, 20, 0.8)",
            padding: "20px",
            borderRadius: "20px",
            border: "1px solid rgba(0, 255, 127, 0.3)",
            position: "relative",
            overflow: "hidden"
        }}>

            <div style={{
                position: "absolute",
                right: "-10px",
                bottom: "-10px",
                fontSize: "40px",
                opacity: 0.1
            }}>
                {icon}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <p style={{ color: "#888", margin: 0, fontSize: "14px", fontWeight: "500" }}>{title}</p>
                {icon && <span style={{ fontSize: "18px" }}>{icon}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <h2 style={{ margin: 0, fontSize: "28px", color: "#fff" }}>{value}</h2>

                {trend && (
                    <span style={{
                        color: trend.includes('+') ? "#00ff88" : "#ff4444",
                        fontSize: "12px",
                        fontWeight: "bold"
                    }}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}

export default StatCard;