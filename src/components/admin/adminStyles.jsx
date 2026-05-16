const styles = {
    pageTitle: {
        fontSize: "30px",
        marginBottom: "10px"
    },

    subtitle: {
        color: "#ccc",
        marginBottom: "30px"
    },

    insight: {
        padding: "10px",
        background: "rgba(0, 255, 127, 0.1)",
        borderRadius: "10px",
        marginBottom: "20px"
    },

    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
    },

    mainGrid: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px"
    },

    card: {
        background: "rgba(20, 20, 20, 0.8)",
        padding: "20px",
        borderRadius: "20px",
        border: "1px solid rgba(0,255,127,0.3)"
    },

    activityItem: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
        background: "#111",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        color: "#ccc",
        fontSize: "14px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "650px"
    },

    th: {
        textAlign: "left",
        color: "#888",
        fontSize: "13px",
        padding: "12px",
        borderBottom: "1px solid #333"
    },

    td: {
        padding: "12px",
        borderBottom: "1px solid #222",
        fontSize: "14px",
        color: "#ddd"
    },

    badge: {
        padding: "5px 10px",
        border: "1px solid",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold"
    },

    btn: {
        background: "#00ff88",
        border: "none",
        borderRadius: "8px",
        padding: "7px 12px",
        cursor: "pointer",
        fontWeight: "bold"
    },

    histogram: {
        display: "flex",
        gap: "12px",
        height: "360px",
        marginTop: "25px",
        paddingBottom: "45px"
    },

    yAxis: {
        width: "35px",
        height: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#aaa",
        fontSize: "13px"
    },

    chartArea: {
        position: "relative",
        flex: 1,
        height: "280px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        borderLeft: "1px solid #555",
        borderBottom: "1px solid #555",
        padding: "0 20px"
    },

    gridLine: {
        position: "absolute",
        left: 0,
        width: "100%",
        borderTop: "1px dashed rgba(255,255,255,0.12)"
    },

    barGroup: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "relative",
        flex: 1
    },

    verticalBar: {
        width: "58px",
        background: "linear-gradient(to top, #ff7a00, #00ff88)",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0 0 18px rgba(0,255,136,0.25)",
        transition: "height 0.8s ease-out"
    },

    barValue: {
        color: "#00ff88",
        fontWeight: "bold",
        marginBottom: "8px"
    },

    barLabel: {
        position: "absolute",
        top: "295px",
        color: "#aaa",
        fontSize: "12px",
        textAlign: "center",
        width: "90px",
        lineHeight: "14px"
    }
};

export default styles;