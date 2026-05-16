function SleepCard({ data }) {
    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: "#aaa" }}>Sleep Quality</p>
                <span>🌙</span>

            </div>
            <h2
  style={{
    fontSize: '32px',
    margin: '10px 0'
  }}
>
  {data?.[0]?.value ?? 0}h{" "}
  <span style={{ fontSize: '16px' }}>
    {data?.[1]?.value ?? 0}m
  </span>
</h2>
            <div style={{
                width: '100%',
                height: '8px',
                background: '#222',
                borderRadius: '10px'
            }}>
                <div style={{
                    width: `${(data?.[0]?.value ?? 0)/10*100}%`,
                    height: '100%',
                    background: '#a855f7',
                    borderRadius: '10px'
                }}></div>
            </div>
            <p style={{
                fontSize: '12px',
                color: '#a855f7',
                marginTop: '5px'
            }}> (Excellent)</p>
        </div>


    );
}
const cardStyle = {
    background: "rgba(20, 20, 20, 0.8)",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid rgba(0, 255, 127, 0.3)",
    textAlign: 'center',
    flex: 1
};
export default  SleepCard;