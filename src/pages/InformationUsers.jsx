import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Scale,
  User,
  Target,
  Flame,
  TrendingUp,
  Activity,
  Calendar,
  Dumbbell,
} from "lucide-react";

export default function InformationUsers() {
  const [goal, setGoal] = useState("Weight Loss");
  const [days, setDays] = useState(4);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const goals = [
    { title: "Weight Loss", desc: "Burn fat and get lean", icon: Flame },
    { title: "Muscle Gain", desc: "Build strength and mass", icon: TrendingUp },
    { title: "General Fitness", desc: "Improve overall health", icon: Activity },
  ];

  const handleGenerate = async () => {
  const userData = {
    weight: Number(weight),
    height: Number(height),
    age: Number(age),
    gender,
    goal,
    days: Number(days),
  };

  const planData = {
    goal,
    workoutDays: Number(days),
  };

  localStorage.setItem("userInfo", JSON.stringify(userData));

  try {
    const token = localStorage.getItem("token");

    // 1) Save user information
    await fetch("http://localhost:5000/api/user-information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // 2) Generate plan
    const response = await fetch("http://localhost:5000/api/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      throw new Error("Failed to generate plan");
    }

    const data = await response.json();

    localStorage.setItem("generatedPlan", JSON.stringify(data));
    window.location.pathname = "/plan";
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Data may be saved but plan was not generated.");
  }
};

  return (
    <div className="min-h-screen bg-[#050907] text-white">
      <header className="border-b border-white/10 bg-[#0d1210]">
        <div className="mx-auto flex h-[70px] max-w-[1050px] items-center justify-between px-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-gray-300 transition hover:bg-lime-400/10 hover:text-lime-400"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-black shadow-lg shadow-lime-400/30">
              <Dumbbell size={22} />
            </div>
            <h1 className="text-xl font-extrabold">
              Fit<span className="text-lime-400">Genie</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[950px] px-6 py-10">
        <section className="text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-5 py-2 text-sm font-bold text-lime-400 shadow-lg shadow-lime-400/10">
            <Sparkles size={17} />
            AI-Powered
          </div>

          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Generate Your{" "}
            <span className="text-lime-400">Personalized Plan</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[650px] text-gray-400">
            Tell us about yourself and your goals. We will create a custom
            workout and nutrition plan for you.
          </p>
        </section>

        <div className="mt-12 space-y-7">
          <Card title="Body Metrics" icon={<Scale />}>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Weight"
                value={weight}
                setValue={setWeight}
                placeholder="70"
                unit="kg"
              />
              <Input
                label="Height"
                value={height}
                setValue={setHeight}
                placeholder="175"
                unit="cm"
              />
            </div>
          </Card>

          <Card title="Personal Info" icon={<User />}>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Age"
                value={age}
                setValue={setAge}
                placeholder="25"
              />

              <div>
                <label className="mb-2 block font-bold">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-full border border-gray-700 bg-[#121814] px-4 py-3 text-gray-300 outline-none transition focus:border-lime-400"
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
          </Card>

          <Card title="Fitness Goal" icon={<Target />}>
            <div className="grid gap-5 md:grid-cols-3">
              {goals.map((g) => {
                const Icon = g.icon;
                const active = goal === g.title;

                return (
                  <button
                    key={g.title}
                    onClick={() => setGoal(g.title)}
                    className={`rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-lime-400/10 ${
                      active
                        ? "border-lime-400 bg-lime-400/10"
                        : "border-gray-700 bg-[#121814]"
                    }`}
                  >
                    <Icon
                      size={30}
                      className={active ? "text-lime-400" : "text-gray-400"}
                    />
                    <h4 className="mt-4 font-extrabold">{g.title}</h4>
                    <p className="mt-1 text-sm text-gray-400">{g.desc}</p>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card title="Workout Days" icon={<Calendar />}>
            <p className="mb-4 font-bold">
              How many days per week can you workout?
            </p>

            <div className="flex flex-wrap gap-4">
              {[2, 3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`h-16 w-16 rounded-2xl border text-xl font-extrabold transition hover:-translate-y-1 ${
                    days === d
                      ? "border-lime-400 bg-lime-400 text-black shadow-lg shadow-lime-400/30"
                      : "border-gray-700 bg-[#121814] hover:border-lime-400"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Card>

          <button
            onClick={handleGenerate}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-4 text-lg font-extrabold text-black shadow-xl shadow-lime-400/20 transition hover:scale-[1.02] hover:bg-lime-300"
          >
            Generate Plan
          </button>
        </div>
      </main>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <section className="rounded-3xl border border-gray-800 bg-[#101512] p-6 shadow-2xl shadow-black/30 transition hover:border-lime-400/40">
      <div className="mb-6 flex items-center gap-3 text-lime-400">
        {icon}
        <h3 className="text-2xl font-extrabold text-white">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Input({ label, value, setValue, placeholder, unit }) {
  return (
    <div>
      <label className="mb-2 block font-bold">{label}</label>
      <div className="flex items-center rounded-full border border-gray-700 bg-[#121814] px-4 py-3 transition focus-within:border-lime-400">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
        />
        {unit && <span className="text-sm font-bold text-gray-400">{unit}</span>}
      </div>
    </div>
  );
}