export default function HowItWorks() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-4 text-center">
        How It Works
      </h2>
      <div className="max-w-3xl mx-auto">
        <ol className="list-decimal list-inside space-y-4">
          <li className="bg-white p-4 rounded-lg shadow">
            <span className="font-semibold">Enter Amount:</span> Input the
            amount you want to convert in the main currency (USD).
          </li>
          <li className="bg-white p-4 rounded-lg shadow">
            <span className="font-semibold">View Conversions:</span> Instantly
            see the converted amounts for each currency in the chain.
          </li>
          <li className="bg-white p-4 rounded-lg shadow">
            <span className="font-semibold">Check Rates:</span> Each card shows
            the current exchange rate for easy reference.
          </li>
          <li className="bg-white p-4 rounded-lg shadow">
            <span className="font-semibold">Explore Designs:</span> Try
            different card designs to suit your preference.
          </li>
        </ol>
      </div>
    </section>
  );
}
