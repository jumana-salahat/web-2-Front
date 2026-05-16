function NutritionCard({ protein, carbs, fat }) {
    return (
        <div style={cardStyle}>
            <p style={{ color: "#aaa", marginBottom: '10px' }}>Nutrition</p>
            {[
                { label: 'Protein', val: protein, color: '#ff4d4d' },
                { label: 'Carbs', val: carbs, color: '#ffcc00' },
                { label: 'Fats', val: fat, color: '#00ff88' }
            ].map((m, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span>{m.label}</span>
                        <span>{m.val}g</span>
                    </div>
                    <div style={{ height: '4px', background: '#222', borderRadius: '10px' }}>
                        <div style={{ width: `${(m.val/200)*100}%`, height: '100%', background: m.color, borderRadius: '10px' }}></div>
                    </div>
                </div>
            ))}
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
export default NutritionCard;