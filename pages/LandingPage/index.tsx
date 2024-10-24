"use client";
import Header from "@/components/modules/LandingPage/Header";
import Footer from "@/components/modules/LandingPage/Footer";
import WhyChooseUs from "@/components/modules/LandingPage/WhyChooseUs";
import CTA from "@/components/modules/LandingPage/CTA";
import FAQs from "@/components/modules/LandingPage/Faqs";
import HowItWorks from "@/components/modules/LandingPage/HowItWorks";
import CurrencyPairsList from "@/components/modules/LandingPage/CurrencyPairs";
import CurrenciesList from "@/components/modules/LandingPage/CurrenciesList";
import CurrencyInput from "@/components/modules/LandingPage/CurrencyInput";
import { CurrenciesProvider } from "@/context/Currencies";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white relative">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Currency Converter
          </h2>
          <CurrenciesProvider>
            <div>
              <CurrencyInput />

              <CurrencyPairsList />

              <CurrenciesList />
            </div>
          </CurrenciesProvider>
        </section>
        <WhyChooseUs />
        <HowItWorks />
        <FAQs />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
