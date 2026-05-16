import React, { useEffect, useState } from "react";
import StatCard from "../StatCard";
import AdminAnalytics from "./AdminAnalytics";
import AdminTable from "./AdminTable";
import StatusBadge from "./StatusBadge";
import styles from "./adminStyles";

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authorized");
        }

        return res.json();
      })
      .then((data) => {
        setAdminData(data);
      })
      .catch((error) => {
        console.log(error);
        setAdminData(null);
      });
  }, []);

  if (!adminData) {
    return <p>You are not authorized or not logged in</p>;
  }

  return (
    <div>
      <h1 style={styles.pageTitle}>Admin Dashboard 🛠️</h1>

      <div style={styles.insight}>
        <small>💡 Admin Insight: Orders increased by 12% this week.</small>
      </div>

      <p style={styles.subtitle}>
        Manage users, requests, orders, and platform activity
      </p>

      <div style={styles.statsGrid}>
        {adminData.stats.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      <div style={styles.mainGrid}>
        <AdminAnalytics analytics={adminData.analytics} />

        <div style={styles.card}>
          <h3>Activity</h3>

          {adminData.activities.map((item, i) => (
            <div key={i} style={styles.activityItem}>
              <span style={{ color: "#00ff88" }}>●</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <AdminTable
          title="Recent Users"
          columns={["Name", "Email", "Role", "Status", "Action"]}
        >
          {adminData.users.map((user, i) => (
            <tr key={i}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <StatusBadge status={user.status} />
              </td>
              <td style={styles.td}>
                <button style={styles.btn}>View</button>
              </td>
            </tr>
          ))}
        </AdminTable>

        <AdminTable
          title="Recent Orders / Requests"
          columns={["ID", "Customer", "Type", "Status", "Amount", "Action"]}
        >
          {adminData.orders.map((order, i) => (
            <tr key={i}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.customer}</td>
              <td style={styles.td}>{order.type}</td>
              <td style={styles.td}>
                <StatusBadge status={order.status} />
              </td>
              <td style={styles.td}>{order.amount}</td>
              <td style={styles.td}>
                <button style={styles.btn}>Manage</button>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}

export default AdminDashboard;
