import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PaymentCard from "../components/payment/PaymentCard";
import BillingSummary from "../components/payment/BillingSummary";

export default function PaymentMethods() {
  return (
    <div className="app">
      <Navbar />

      <section className="payment-page">
        <div className="payment-wrapper">

          <div className="payment-left">
            <div className="payment-header">
              <h1>Secure Checkout</h1>

              <p>
                Complete your payment securely using your preferred card.
              </p>
            </div>

            <PaymentCard />
          </div>

          <div className="payment-right">
            <BillingSummary />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}