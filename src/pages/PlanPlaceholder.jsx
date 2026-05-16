import { useEffect, useState } from "react";

export default function PlanPlaceholder() {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("generatedPlan");
    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }
  }, []);

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#050907] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">No Plan Generated Yet</h1>
      </div>
    );
  }

  const planData = plan.data;

  return (
    <div className="min-h-screen bg-[#050907] px-8 py-10 text-white">
      <h1 className="mb-2 text-4xl font-extrabold text-lime-400">
        Your Fitness Plan
      </h1>

      <p className="mb-8 text-gray-400">
        Goal: {planData.goal} | Workout Days: {planData.workoutDays}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {planData.workoutPlan?.map((workout, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-800 bg-[#101512] p-6 shadow-xl"
          >
            <p className="mb-2 text-sm font-bold text-lime-400">
              Day {index + 1}
            </p>
            <h2 className="text-2xl font-extrabold">{workout}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}