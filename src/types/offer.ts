export type OfferFeature = {
  text: string;
  included: boolean;
};

export type Offer = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  price: number;
  badge?: string;
  /**
   * @field discount
   * Renamed from "save" — matches the backend Offer model.
   * Displayed below the price on the card (e.g. "Save 20%").
   */
  discount?: string;
  features: OfferFeature[];
  showDiet: boolean;
  showTraining: boolean;
};