import React from "react";
import styles from "./adminStyles";

function AdminAnalytics({ analytics }) {
    return (
        <div style={styles.card}>
            <h3 style={{ marginTop: 0 }}>Admin Analytics</h3>

            <div style={styles.histogram}>
                <div style={styles.yAxis}>
                    {[100, 80, 60, 40, 20, 0].map((num) => (
                        <span key={num}>{num}</span>
                    ))}
                </div>

                <div style={styles.chartArea}>
                    {[20, 40, 60, 80, 100].map((line) => (
                        <div
                            key={line}
                            style={{
                                ...styles.gridLine,
                                bottom: `${line}%`
                            }}
                        />
                    ))}

                    {analytics.map((item, i) => (
                        <div key={i} style={styles.barGroup}>
                            <span style={styles.barValue}>{item.value}%</span>

                            <div
                                style={{
                                    ...styles.verticalBar,
                                    height: `${item.value}%`
                                }}
                            />

                            <p style={styles.barLabel}>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminAnalytics;