export default function FAQs() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-semibold cursor-pointer">
            How often are the exchange rates updated?
          </summary>
          <p className="mt-2 text-gray-600">
            Our exchange rates are updated every 60 minutes to ensure accuracy
            in your conversions.
          </p>
        </details>
        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-semibold cursor-pointer">
            Can I add more currencies to the conversion chain?
          </summary>
          <p className="mt-2 text-gray-600">
            Currently, we support a fixed set of currencies. We&apos;re working
            on allowing custom currency chains in future updates.
          </p>
        </details>
        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-semibold cursor-pointer">
            Is there a mobile app available?
          </summary>
          <p className="mt-2 text-gray-600">
            Yes! CurrencyWizard is available as a mobile app for both iOS and
            Android devices. Check your app store for download.
          </p>
        </details>
      </div>
    </section>
  );
}
