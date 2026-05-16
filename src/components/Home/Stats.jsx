export default function Stats({ stats }) {

  return (
    <section className="stats">

      <div>
        <h2>{stats?.users || 0}</h2>
        <p>Active Users</p>
      </div>

      <div>
        <h2>{stats?.submissions || 0}</h2>
        <p>Plans Generated</p>
      </div>

      <div>
        <h2>{stats?.successRate || "0%"}</h2>
        <p>Success Rate</p>
      </div>

      <div>
        <h2>{stats?.rating || "0"}</h2>
        <p>User Rating</p>
      </div>

    </section>
  );
}