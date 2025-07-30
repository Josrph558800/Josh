import { useState } from 'react';
import { CreditCard, User, Loader2, CheckCircle } from 'lucide-react';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentSuccess(false);

    // Simulate processing
    setTimeout(() => {
      console.log('Payment submitted:', formData);
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-green-600 text-white rounded-full w-16 h-16 mb-4">
            <CreditCard className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Payment</h2>
          <p className="text-sm text-gray-600">You're one step away from owning this product</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {paymentSuccess ? (
            <div className="flex flex-col items-center justify-center text-green-600">
              <CheckCircle className="w-12 h-12 mb-2" />
              <p className="text-lg font-semibold">Payment Successful</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Your name"
                    required
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    onChange={handleChange}
                    value={formData.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    onChange={handleChange}
                    value={formData.expiry}
                    placeholder="MM/YY"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    onChange={handleChange}
                    value={formData.cvv}
                    placeholder="123"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-200 ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;