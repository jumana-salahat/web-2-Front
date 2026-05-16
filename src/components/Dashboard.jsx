import { useEffect, useState } from "react";
import WeeklyProgress from "./WeeklyProgress";
import StatCard from "./StatCard";
import HorizontalBars from "./HorizontalBars";
import WaterCard from "./WaterCard";
import SleepCard from "./SleepCard";
import NutritionCard from "./NutritionCard";
import AskAICard from "./AskAICard";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            setUser(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}, []);

    if (!user) return <p>Loading... </p>;

    return (
        <div>
            <h1 style={{
                fontSize: "30px",
                marginBottom: "10px"
            }}>
                Fitness Performance Dashboard 💪
            </h1>

            <div style={{
                padding: '10px',
                background: 'rgba(0, 255, 127, 0.1)',
                borderRadius: '10px',
                marginBottom: '20px'
            }}>
                <small>💡 AI Insight: You are 15% more active on Tuesdays! Keep it up.</small>
            </div>

            <p style={{
                color: "#ccc",
                marginBottom: "30px"
            }}>
                Track your weekly progress
            </p>


            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "20px",
                marginBottom: "30px"
            }}>
                {user.stats.map((item, i) => (
                    <StatCard
                        key={i}
                        title={item.title}
                        value={item.value}
                        trend={item.title === "Calories" ? "+12%": "+5%"}
                        icon={item.title === "Workouts" ? "🔥" : item.title === "Calories" ? "⚡" : "💪"}
                    />
                ))}
            </div>

            <div style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                flexWrap: "wrap",
                justifyContent: "space-between"
            }}>
                <WaterCard consumed={user.water.consumed} goal={user.water.goal} />
                <SleepCard data={user.sleep} />
                <NutritionCard
                    protein={user.nutrition.protein}
                    carbs={user.nutrition.carbs}
                    fat={user.nutrition.fat}
                />
            </div>




            <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "20px"
            }}>

                <div style={{
                    background: "rgba(20, 20, 20, 0.8)",
                    padding: "20px", borderRadius: "20px" ,
                    border: "1px solid rgba(0,255,127,0.3)"

                }}>
                    <h3>Performance Trend</h3>
                    <WeeklyProgress data={user.weeklyProgress} />
                </div>


                <div style={{
                    background: "rgba(20, 20, 20, 0.8)",
                    padding: "20px", borderRadius: "20px",
                    border: "1px solid rgba(0,255,127,0.3)"

                }}>
                    <h3>Muscle Focus</h3>
                    <HorizontalBars data={user.categories } />
                </div>

                <div style={{
                    gridColumn: "1 / -1",
                    background: "rgba(20, 20, 20, 0.8)",
                    padding: "20px",
                    borderRadius: "20px",
                    border: "1px solid rgba(0, 255, 127, 0.3)",
                    textAlign: "center"
                }}>
                    <AskAICard />
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
