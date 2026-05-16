import { useState } from "react";

function AskAICard() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    function askAI() {

        if (question.trim() === "") {
            return;
        }

        setLoading(true);

        fetch("http://localhost:5000/api/ai/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        })

            .then(function (res) {
                return res.json();
            })

            .then(function (data) {

                setAnswer(data.answer || data.message || "No answer returned");
                setLoading(false);

            })

            .catch(function (error) {

                console.log(error);
                setLoading(false);

            });
    }

    return (

        <div>

            <p style={{ color: "#00ff88", fontSize: '14px' }}>
                🤖 AI Fitness Coach
            </p>

            <p style={{ fontSize: '13px', color: '#ccc' }}>
                Ask me about your workout or diet...
            </p>

            <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '10px'
            }}>

                <input
                    type="text"
                    value={question}

                    onChange={function (e) {
                        setQuestion(e.target.value);
                    }}

                    placeholder="What should I eat now?"

                    style={{
                        flex: 1,
                        background: '#111',
                        border: '1px solid #333',
                        padding: '8px',
                        borderRadius: '8px',
                        color: 'white'
                    }}
                />

                <button

                    onClick={askAI}

                    style={{
                        background: '#00ff88',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 15px',
                        cursor: 'pointer'
                    }}
                >
                    🚀
                </button>

            </div>

            {loading && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    borderRadius: "10px",
                    background: "#111",
                    color: "#00ff88"
                }}>
                    Thinking...
                </div>
            )}

            <div style={{
                marginTop: "20px",
                minHeight: "80px",
                background: "#111",
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "15px",
                color: "white",
                textAlign: "left"
            }}>

                {answer ? answer : "AI answer will appear here..."}

            </div>

        </div>
    );
}

export default AskAICard;