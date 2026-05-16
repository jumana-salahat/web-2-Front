import { useState } from "react";

export default function PaymentCard() {
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, "");

    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "MasterCard";
    if (/^3[47]/.test(cleaned)) return "American Express";

    return "Card";
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .substring(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 4);

    if (cleaned.length >= 3) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }

    return cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formatted = value;

    if (name === "card") {
      formatted = formatCardNumber(value);
    }

    if (name === "expiry") {
      formatted = formatExpiry(value);
    }

    if (name === "cvv") {
      formatted = value.replace(/\D/g, "").substring(0, 4);
    }

    setForm({
      ...form,
      [name]: formatted,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 3) {
      newErrors.name = "Cardholder name is required";
    }

    const cleanCard = form.card.replace(/\s/g, "");

    if (cleanCard.length < 16) {
      newErrors.card = "Invalid card number";
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!expiryRegex.test(form.expiry)) {
      newErrors.expiry = "Invalid expiry date";
    }

    if (form.cvv.length < 3) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Payment Successful ✅");
    }
  };

  return (
    <div className="payment-form-wrapper">

      <div className="live-card">
        <div className="card-top">
          <span>{detectCardType(form.card)}</span>
        </div>

        <div className="card-number">
          {form.card || "#### #### #### ####"}
        </div>

        <div className="card-bottom">
          <div>
            <small>Card Holder</small>
            <p>{form.name || "YOUR NAME"}</p>
          </div>

          <div>
            <small>Expires</small>
            <p>{form.expiry || "MM/YY"}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">

        <div className="input-group">
          <label>Cardholder Name</label>

          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />

          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className="input-group">
          <label>Card Number</label>

          <input
            type="text"
            name="card"
            placeholder="1234 5678 9012 3456"
            value={form.card}
            onChange={handleChange}
          />

          {errors.card && <span>{errors.card}</span>}
        </div>

        <div className="row">

          <div className="input-group">
            <label>Expiry Date</label>

            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
            />

            {errors.expiry && <span>{errors.expiry}</span>}
          </div>

          <div className="input-group">
            <label>CVV</label>

            <input
              type="password"
              name="cvv"
              placeholder="123"
              value={form.cvv}
              onChange={handleChange}
            />

            {errors.cvv && <span>{errors.cvv}</span>}
          </div>

        </div>

        <button className="pay-btn">
          Confirm Payment
        </button>

      </form>
    </div>
  );
}