function WeeklyProgress({ data }) {

    const maxValue = 800;

    return (
        <div style={{
            display: "flex",
            alignItems: "flex-end",
            height: "220px",
            gap: "12px",
            marginTop: "30px",
            paddingBottom: "20px"
        }}>
            {data.map((v, i) => (
                <div key={i} style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%"
                }}>
                    <span style={{ fontSize: "10px", color: "#00ff88", textAlign: "center", marginBottom: "5px" }}>
                        {v.burnt}
                    </span>


                    <div
                        style={{
                            height: `${(v.burnt / maxValue) * 100}%`,
                            background: v.burnt >= v.target ? "linear-gradient(to top, #00ff88, #55ffaa)" : "linear-gradient(to top, #ff7a00, #ffba00)",
                            borderRadius: "8px",
                            transition: "height 0.8s ease-out",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                        }}
                        title={`Burnt: ${v.burnt} / Target: ${v.target}`}
                    ></div>


                    <p style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#888",
                        marginTop: "12px",
                        fontWeight: "500"
                    }}>
                        {v.day}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default WeeklyProgress;