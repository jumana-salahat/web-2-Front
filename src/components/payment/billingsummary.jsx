export default function BillingSummary() {
  return (
    <div className="billing-summary">

      <h2>Billing Summary</h2>

      <div className="summary-item">
        <span>Premium Plan</span>
        <span>$29.00</span>
      </div>

      <div className="summary-item">
        <span>Tax</span>
        <span>$4.00</span>
      </div>

      <div className="summary-item total">
        <span>Total</span>
        <span>$33.00</span>
      </div>

    </div>
  );
}