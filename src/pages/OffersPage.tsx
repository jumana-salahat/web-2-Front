import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Offer } from "../types/offer";
import { offers as staticOffers } from "../data/offers";
import "./OffersPage.css";


type Screen = "choose" | "diet" | "training" | "confirm";

type CustomOptionKey =
  | "workout"
  | "meal"
  | "tracking"
  | "macros"
  | "support"
  | "guidance";

type GoalKey = "lose_weight" | "gain_muscle" | "stay_fit" | "healthy_habits";

type CustomOption = {
  key: CustomOptionKey;
  label: string;
  description: string;
  checked: boolean;
};

type FormState = {
  goal: string;
  calories: string;
  fitnessLevel: string;
  workoutDays: string;
  customGoal?: string;
  customCalories?: string;
};

type FieldErrors = Partial<Record<keyof FormState | "selected" | "addons", string>>;

type SubmissionPayload = {
  offerId: number;
  mainGoal: GoalKey;
  selectedAddons: CustomOptionKey[];
  goal?: string;
  calories?: number;
  fitnessLevel?: string;
  workoutDays?: number;
};

const OFFERS_API = "http://localhost:5000/api/offers";
const SUBMISSIONS_API = "http://localhost:5000/api/submissions";

const goalOptions: {
  key: GoalKey;
  label: string;
  description: string;
  recommendedPlan: number;
  addons: CustomOptionKey[];
}[] = [
  { key: "lose_weight", label: "Lose Weight", description: "Diet + tracking focused", recommendedPlan: 2, addons: ["meal", "tracking", "macros"] },
  { key: "gain_muscle", label: "Gain Muscle", description: "Workout + nutrition", recommendedPlan: 3, addons: ["workout", "meal", "tracking", "macros", "guidance"] },
  { key: "stay_fit", label: "Stay Fit", description: "Simple training routine", recommendedPlan: 1, addons: ["workout", "tracking", "guidance"] },
  { key: "healthy_habits", label: "Healthy Habits", description: "Balanced lifestyle plan", recommendedPlan: 3, addons: ["workout", "meal", "tracking"] },
];

const isValidCalories = (value: string) => {
  const calories = Number(value);
  return Number.isInteger(calories) && calories >= 500 && calories <= 5000;
};

const getApiErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data?.message || data?.error || "Request failed. Please try again.";
  } catch {
    return "Request failed. Please try again.";
  }
};

function OffersPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offersLoading, setOffersLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(3);
  const [selectedGoal, setSelectedGoal] = useState<GoalKey>("gain_muscle");
  const [screen, setScreen] = useState<Screen>("choose");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<FormState>({ goal: "Lose Weight", calories: "1500", fitnessLevel: "Beginner", workoutDays: "3" });
  const [customOptions, setCustomOptions] = useState<CustomOption[]>([
    { key: "workout", label: "Workout Plan", description: "Personalized exercises based on your level.", checked: true },
    { key: "meal", label: "Meal Plan", description: "Custom meals based on your goal.", checked: true },
    { key: "tracking", label: "Progress Tracking", description: "Track changes and weekly progress.", checked: true },
    { key: "macros", label: "Macro Breakdown", description: "Protein, carbs, and fats guidance.", checked: true },
    { key: "guidance", label: "Exercise Guidance", description: "Clear instructions for every workout.", checked: true },
    { key: "support", label: "Priority Support", description: "Faster response and extra support.", checked: false },
  ]);
    
  useEffect(() => {
  const fetchOffers = async () => {
    try {
      const res = await fetch(OFFERS_API);

      if (!res.ok) throw new Error("API error");

      const json = await res.json();

      if (json.data && json.data.length > 0) {
        setOffers(json.data);
      } else {
        setOffers(staticOffers);
      }
    } catch {
      /**
       * @fallback static data
       * If the backend is offline or unreachable,
       * fall back to the local static offers so the page still renders.
       */
      setOffers(staticOffers);
    } finally {
      setOffersLoading(false);
    }
  };

  fetchOffers();
}, []);

  const selectedOffer = offers.find((offer) => offer.id === selected);
  const selectedAddons = customOptions.filter((option) => option.checked);
  const selectedGoalLabel = goalOptions.find((goal) => goal.key === selectedGoal)?.label ?? "Choose goal";
  const progressStep = screen === "choose" ? 1 : screen === "confirm" ? 3 : 2;

  const clearError = (field?: keyof FieldErrors) => {
    setError(null);
    if (!field) return;
    setFieldErrors((current) => { const updated = { ...current }; delete updated[field]; return updated; });
  };

  const validateChooseStep = () => {
    const errors: FieldErrors = {};
    if (!selected) {
  errors.selected = "Please choose a plan.";
}
    if (selectedAddons.length === 0) errors.addons = "Please select at least one add-on.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateDietStep = () => {
    const errors: FieldErrors = {};
    if (form.goal === "other-goal" && !form.customGoal?.trim()) errors.customGoal = "Please write your goal.";
    if (form.calories === "other-cal") {
      if (!form.customCalories?.trim()) errors.customCalories = "Please enter daily calories.";
      else if (!isValidCalories(form.customCalories)) errors.customCalories = "Calories must be between 500 and 5000.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateTrainingStep = () => {
    const errors: FieldErrors = {};
    const workoutDays = Number(form.workoutDays);
    if (!form.fitnessLevel) errors.fitnessLevel = "Please choose your fitness level.";
    if (!Number.isInteger(workoutDays) || workoutDays < 2 || workoutDays > 6) errors.workoutDays = "Workout days must be between 2 and 6.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildPayload = (): SubmissionPayload | null => {
    if (!selected || selectedAddons.length === 0) return null;
    const selectedAddonsPayload = customOptions.filter((o) => o.checked).map((o) => o.key);
    const payload: SubmissionPayload = { offerId: selected, mainGoal: selectedGoal, selectedAddons: selectedAddonsPayload };
    if (hasAddon("meal")) {
      payload.goal = form.goal === "other-goal" ? form.customGoal?.trim() : form.goal;
      payload.calories = form.calories === "other-cal" ? Number(form.customCalories) : Number(form.calories);
    }
    if (hasAddon("workout")) {
      payload.fitnessLevel = form.fitnessLevel;
      payload.workoutDays = Number(form.workoutDays);
    }
    return payload;
  };

  const applyAddons = (addons: CustomOptionKey[]) => {
    setCustomOptions((current) => current.map((option) => ({ ...option, checked: addons.includes(option.key) })));
  };

  const setOptionsByPlan = (id: number) => {
    const selectedKeysByPlan: Record<number, CustomOptionKey[]> = {
      1: ["workout", "tracking", "guidance"],
      2: ["meal", "tracking", "macros"],
      3: ["workout", "meal", "tracking", "macros", "guidance"],
    };
    applyAddons(selectedKeysByPlan[id] ?? []);
  };

  const handleGoalSelect = (goalKey: GoalKey) => {
    const goal = goalOptions.find((item) => item.key === goalKey);
    if (!goal) return;
    clearError();
    setSelectedGoal(goal.key);
    setSelected(goal.recommendedPlan);
    applyAddons(goal.addons);
    setTimeout(() => { document.getElementById("cards-section")?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 120);
  };

  const handleSelect = (id: number) => {
    clearError("selected");
    setSelected(id);
    setOptionsByPlan(id);
    setTimeout(() => { document.getElementById("customize-box")?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 120);
  };

  const toggleOption = (key: CustomOptionKey) => {
    clearError("addons");
    setCustomOptions((current) => current.map((option) => option.key === key ? { ...option, checked: !option.checked } : option));
  };

  const hasAddon = (key: CustomOptionKey) => customOptions.some((option) => option.key === key && option.checked);

  const handleContinue = () => {
    if (!validateChooseStep()) return;
    if (hasAddon("meal")) { setScreen("diet"); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (hasAddon("workout")) { setScreen("training"); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    handleSubmit();
  };

  const handleDietNext = () => {
    if (!validateDietStep()) return;
    if (hasAddon("workout")) { setScreen("training"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { handleSubmit(); }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const isChooseValid = validateChooseStep();
    const isDietValid = hasAddon("meal") ? validateDietStep() : true;
    const isTrainingValid = hasAddon("workout") ? validateTrainingStep() : true;
    if (!isChooseValid || !isDietValid || !isTrainingValid) { setLoading(false); return; }
    const payload = buildPayload();
    if (!payload) { setError("Please complete your plan details before submitting."); setLoading(false); return; }
    try {
      const token = localStorage.getItem("token");
      if (!token) { setError("You must be logged in to submit."); setLoading(false); return; }
      const res = await fetch(SUBMISSIONS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await getApiErrorMessage(res));
      setScreen("confirm");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelected(3); setSelectedGoal("gain_muscle"); setScreen("choose");
    setError(null); setFieldErrors({});
    setForm({ goal: "Lose Weight", calories: "1500", fitnessLevel: "Beginner", workoutDays: "3" });
    applyAddons(["workout", "meal", "tracking", "macros", "guidance"]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayGoal = form.goal === "other-goal" ? form.customGoal || "—" : form.goal;
  const displayCalories = form.calories === "other-cal" ? `${form.customCalories || "—"} kcal` : `${form.calories} kcal`;

  if (offersLoading) return <div className="page"><p className="secure-note">Loading offers...</p></div>;
  return (
    <div className="page">
      <div className="steps-bar">
        {["Choose Plan", "Preferences", "Confirmation"].map((label, index) => (
          <div key={label} className={`step ${progressStep >= index + 1 ? "active" : ""}`}>
            <div className="step-circle">{index + 1}</div>
            <span>{label}</span>
            {index < 2 && <div className={`step-line ${progressStep > index + 1 ? "done" : ""}`} />}
          </div>
        ))}
      </div>

      <div className="content">
        {error && <div className="error-box">{error}</div>}

        {screen === "choose" && (
          <div className="fade-in">
            <h1 className="page-title">Choose Your Offer</h1>
            <p className="page-sub">Start with your main goal. We will recommend the best setup.</p>

            <div className="goal-selector">
              <div className="goal-header">
                <span>Main Goal</span>
                <strong>{selectedGoalLabel}</strong>
              </div>
              <div className="goal-options">
                {goalOptions.map((goal) => (
                  <button key={goal.key} type="button" className={`goal-chip ${selectedGoal === goal.key ? "active" : ""}`} onClick={() => handleGoalSelect(goal.key)}>
                    <span>{goal.label}</span>
                    <small>{goal.description}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="cards" id="cards-section">
              {offers.map((offer) => {
                const isSel = selected === offer.id;
                return (
                  <div key={offer.id} className={`offer-card ${isSel ? "active" : ""} ${offer.badge ? "best" : ""}`} onClick={() => handleSelect(offer.id)}>
                    {offer.badge && <div className="best-badge">{offer.badge}</div>}
                    {isSel && <div className="card-check">✓</div>}
                    <div className="card-tag">{offer.tag}</div>
                    <h3>{offer.title}</h3>
                    <p className="card-sub">{offer.subtitle}</p>
                    <div className="card-price">
                      <span className="price-amount">${offer.price}</span>
                      <span className="price-per"> / month</span>
                    </div>
                    {offer.discount && <div className="save-badge">{offer.discount}</div>}
                    <ul className="feature-list">
                      {offer.features.map((feature, index) => (
                        <li key={index} className={feature.included ? "included" : "excluded"}>
                          <span className={`feat-dot ${feature.included ? "active" : "inactive"}`} />
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                    <button type="button" className={`choose-btn ${isSel ? "selected" : ""}`} onClick={(e) => { e.stopPropagation(); handleSelect(offer.id); }}>
                      {isSel ? "Selected" : "Choose Plan"}
                    </button>
                  </div>
                );
              })}
            </div>

            {fieldErrors.selected && <div className="error-box">{fieldErrors.selected}</div>}

            <div className="customize-box" id="customize-box">
              <div className="customize-header">
                <div>
                  <h3 className="customize-title">Customize Your Plan</h3>
                  <p className="customize-sub">Select exactly what you want included.</p>
                </div>
                <div className="customize-count">{selectedAddons.length}/6 selected</div>
              </div>
              <div className="addon-list">
                {customOptions.map((option) => (
                  <label key={option.key} className="addon-item">
                    <input type="checkbox" checked={option.checked} onChange={() => toggleOption(option.key)} />
                    <span className="addon-check" />
                    <div>
                      <strong>{option.label}</strong>
                      <p>{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              {fieldErrors.addons && <p className="field-error">{fieldErrors.addons}</p>}
            </div>

            <div className="summary-bar" id="summary-bar">
              <div className="summary-left">
                {selectedOffer ? (
                  <><span className="summary-check">✓</span><div><div className="summary-label">Selected Plan</div><div className="summary-plan">{selectedOffer.title}</div></div></>
                ) : (
                  <div className="summary-label">No plan selected</div>
                )}
              </div>
              <div className="summary-addons">
                <div className="summary-label">Included</div>
                <div className="summary-addon-text">{selectedAddons.length > 0 ? selectedAddons.map((o) => o.label).join(", ") : "No add-ons selected"}</div>
              </div>
              {selectedOffer && (
                <div className="summary-price">
                  <div className="summary-label">Total</div>
                  <div className="summary-amount">${selectedOffer.price}<span> / month</span></div>
                </div>
              )}
              <button type="button" className="continue-btn" onClick={handleContinue} disabled={loading || !selected || selectedAddons.length === 0}>Continue</button>
            </div>
            <p className="secure-note">Secure & private</p>
          </div>
        )}

        {screen === "diet" && (
          <div className="step-box fade-in">
            <h2>Diet Plan Options</h2>
            <div className="form-field">
              <label>Goal</label>
              <select value={form.goal} onChange={(e) => { clearError("customGoal"); setForm({ ...form, goal: e.target.value, customGoal: "" }); }}>
                {["Lose Weight", "Maintain Weight", "Gain Muscle", "Improve Health"].map((g) => <option key={g} value={g}>{g}</option>)}
                <option value="other-goal">Write my own goal</option>
              </select>
              {form.goal === "other-goal" && (
                <><input className="custom-input" type="text" placeholder="Write your goal..." value={form.customGoal ?? ""} onChange={(e) => { clearError("customGoal"); setForm({ ...form, customGoal: e.target.value }); }} />
                {fieldErrors.customGoal && <p className="field-error">{fieldErrors.customGoal}</p>}</>
              )}
            </div>
            <div className="form-field">
              <label>Daily Calories</label>
              <select value={form.calories} onChange={(e) => { clearError("customCalories"); setForm({ ...form, calories: e.target.value, customCalories: "" }); }}>
                {["1200", "1500", "1800", "2000", "2200", "2500"].map((c) => <option key={c} value={c}>{c} kcal</option>)}
                <option value="other-cal">Write my own</option>
              </select>
              {form.calories === "other-cal" && (
                <><input className="custom-input" type="number" placeholder="e.g. 1750" min={500} max={5000} value={form.customCalories ?? ""} onChange={(e) => { clearError("customCalories"); setForm({ ...form, customCalories: e.target.value }); }} />
                {fieldErrors.customCalories && <p className="field-error">{fieldErrors.customCalories}</p>}</>
              )}
            </div>
            <div className="button-row">
              <button type="button" className="secondary-button" onClick={() => setScreen("choose")} disabled={loading}>Back</button>
              <button type="button" className="main-button" onClick={handleDietNext} disabled={loading}>{loading ? "Saving..." : "Continue"}</button>
            </div>
          </div>
        )}

        {screen === "training" && (
          <div className="step-box fade-in">
            <h2>Training Options</h2>
            <div className="form-field">
              <label>Fitness Level</label>
              <select value={form.fitnessLevel} onChange={(e) => { clearError("fitnessLevel"); setForm({ ...form, fitnessLevel: e.target.value }); }}>
                {["Beginner", "Intermediate", "Advanced"].map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              {fieldErrors.fitnessLevel && <p className="field-error">{fieldErrors.fitnessLevel}</p>}
            </div>
            <div className="form-field">
              <label>Workout Days</label>
              <select value={form.workoutDays} onChange={(e) => { clearError("workoutDays"); setForm({ ...form, workoutDays: e.target.value }); }}>
                {["2", "3", "4", "5", "6"].map((d) => <option key={d} value={d}>{d} days</option>)}
              </select>
              {fieldErrors.workoutDays && <p className="field-error">{fieldErrors.workoutDays}</p>}
            </div>
            <div className="button-row">
              <button type="button" className="secondary-button" onClick={() => hasAddon("meal") ? setScreen("diet") : setScreen("choose")} disabled={loading}>Back</button>
              <button type="button" className="main-button" onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Confirm"}</button>
            </div>
          </div>
        )}

        {screen === "confirm" && selectedOffer && (
          <div className="confirm-box fade-in">
            <div className="confirm-icon">✓</div>
            <h2 className="confirm-title">You're all set</h2>
            <p className="confirm-sub">Your plan is ready.</p>
            <div className="summary-card">
              <div className="summary-row"><span className="summary-key">Main Goal</span><span className="summary-val highlight">{selectedGoalLabel}</span></div>
              <div className="summary-row"><span className="summary-key">Plan</span><span className="summary-val">{selectedOffer.title}</span></div>
              <div className="summary-row"><span className="summary-key">Included</span><span className="summary-val">{selectedAddons.map((o) => o.label).join(", ")}</span></div>
              <div className="summary-row"><span className="summary-key">Price</span><span className="summary-val">${selectedOffer.price} / month</span></div>
              {hasAddon("meal") && (
                <><div className="summary-row"><span className="summary-key">Goal</span><span className="summary-val">{displayGoal}</span></div>
                <div className="summary-row"><span className="summary-key">Calories</span><span className="summary-val">{displayCalories}</span></div></>
              )}
              {hasAddon("workout") && (
                <><div className="summary-row"><span className="summary-key">Fitness Level</span><span className="summary-val">{form.fitnessLevel}</span></div>
                <div className="summary-row"><span className="summary-key">Workout Days</span><span className="summary-val">{form.workoutDays} days/week</span></div></>
              )}
            </div>
            <button
  type="button"
  className="main-button"
  onClick={() => navigate("/payment")}
>
  Start Over
</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OffersPage;