function HorizontalBars({ data }) {
    return (
        <div style={{ marginTop: "20px" }}>
            {data.map((item, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>{item.name}</span>
                        <span style={{ fontSize: "12px", color: "#aaa" }}>{item.value}%</span>
                    </div>

                    <div style={{ background: "#222", borderRadius: "10px", overflow: "hidden" }}>
                        <div
                            style={{
                                width: `${item.value}%`,
                                background: "linear-gradient(to right, #ff7a00, #00ff88)",
                                height: "12px",
                                borderRadius: "10px",
                                transition: "width 1s ease-in-out"
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HorizontalBars;