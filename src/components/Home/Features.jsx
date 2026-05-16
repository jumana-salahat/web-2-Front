import { features } from "../../data/features";

export default function Features() {
  return (
    <section className="features">
      <h2>
        Everything You Need to <span>Succeed</span>
      </h2>

      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}