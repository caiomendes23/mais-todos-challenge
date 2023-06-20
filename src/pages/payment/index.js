import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../store/cart';
import './styles.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const totalPrice = useCart((state) => state.totalPrice);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('Erro ao criar fonte de pagamento:', error);
    } else {
      try {
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: totalPrice,
          }),
        });
        console.log('Pagamento processado com sucesso!', paymentMethod);
      } catch (error) {
        console.log('Erro ao processar o pagamento:', error);
      }
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Página de Pagamento</h1>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <div className="payment-card-details">
          <CardElement className="payment-card" options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
          <button className="payment-button" type="submit">
            Payment with Card
          </button>
        </div>

      </form>
    </div>
  );
};

const PaymentPageWithStripe = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentPageWithStripe;
