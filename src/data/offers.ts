import type { Offer } from "../types/offer";

export const offers: Offer[] = [
  {
    id: 1,
    tag: "Training",
    title: "Training Only",
    subtitle: "Personal workout program",
    price: 29,
    features: [
      { text: "Custom workout plan", included: true },
      { text: "Progress tracking", included: true },
      { text: "Exercise guidance", included: true },
      { text: "Meal plan", included: false },
      { text: "Priority support", included: false },
    ],
    showDiet: false,
    showTraining: true,
  },
  {
    id: 2,
    tag: "Nutrition",
    title: "Diet Plan Only",
    subtitle: "Personal nutrition program",
    price: 39,
    features: [
      { text: "Custom meal plan", included: true },
      { text: "Calorie tracking", included: true },
      { text: "Macro breakdown", included: true },
      { text: "Workout plan", included: false },
      { text: "Priority support", included: false },
    ],
    showDiet: true,
    showTraining: false,
  },
  {
    id: 3,
    tag: "Full Package",
    title: "Both Together",
    subtitle: "Complete fitness package",
    price: 59,
    badge: "Best Value",
    discount: "Save 20%",
    features: [
      { text: "Workout + diet plan", included: true },
      { text: "Full progress tracking", included: true },
      { text: "Macro breakdown", included: true },
      { text: "Exercise guidance", included: true },
      { text: "Priority support", included: true },
    ],
    showDiet: true,
    showTraining: true,
  },
];