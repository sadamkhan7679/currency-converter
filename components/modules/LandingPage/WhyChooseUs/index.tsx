import { CheckCircleIcon, GlobeIcon, SmartphoneIcon } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="text-center mb-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-4">
        Why Choose CurrencyWizard?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <GlobeIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Multi-Currency Chains</h3>
          <p className="text-gray-600">
            Convert through multiple currencies in one go, perfect for complex
            international transactions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-Time Rates</h3>
          <p className="text-gray-600">
            Stay updated with the latest exchange rates for accurate
            conversions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SmartphoneIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            User-Friendly Interface
          </h3>
          <p className="text-gray-600">
            Intuitive design makes currency conversion a breeze for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
