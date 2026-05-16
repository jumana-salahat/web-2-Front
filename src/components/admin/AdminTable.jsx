import React from "react";
import styles from "./adminStyles";

function AdminTable({ title, columns, children }) {
    return (
        <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
            <h3>{title}</h3>

            <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} style={styles.th}>{col}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminTable;