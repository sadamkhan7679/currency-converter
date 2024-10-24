import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="text-center mb-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-xl text-gray-600 mb-6">
        Join thousands of users who trust CurrencyWizard for their currency
        conversion needs.
      </p>
      <Button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
        Sign Up for Free
      </Button>
    </section>
  );
}
