function WaterCard({ consumed, goal }) {
    const percent = (consumed / goal) * 100;

    return (
        <div style={s.card}>
            <p style={s.title}>Hydration Goal 💧</p>

            <div style={s.circle}>
                <div style={{ ...s.water, height: percent + "%" }}></div>

                <div style={s.center}>
                    <h2>{consumed}L</h2>
                    <p>of {goal}L</p>
                </div>
            </div>

            <button style={s.btn}>+ Add Glass</button>
        </div>
    );
}

const s = {
    card: { background: "#141414", padding: "20px", borderRadius: "15px", textAlign: "center", width: "180px" },
    title: { color: "#aaa", fontSize: "13px" },
    circle: {
        width: "110px", height: "110px", borderRadius: "50%", border: "3px solid #00d4ff",
        margin: "15px auto", position: "relative", overflow: "hidden"
    },
    water: {
        position: "absolute", bottom: 0, width: "100%", background: "#00d4ff"
    },
    center: {
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        background: "#141414", width: "65px", height: "65px", borderRadius: "50%",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        color: "white", fontSize: "12px"
    },
    btn: {
        background: "none", border: "1px solid #00d4ff", color: "#00d4ff",
        padding: "6px 12px", borderRadius: "8px", cursor: "pointer"
    }
};

export default WaterCard;