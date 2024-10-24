import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrencies } from "@/context/Currencies";
import CurrencyFlagImage from "@/components/modules/Shared/CurrencyFlagImage";
import { XCircle } from "lucide-react";

export default function CurrencyCard({
  currencyCode,
}: {
  currencyCode: string;
}) {
  const {
    exchangeRates,
    selectedCurrencies,
    quantity,
    handleSelectedCurrenciesUpdate,
  } = useCurrencies();

  const handleRemoveCurrency = () => {
    handleSelectedCurrenciesUpdate(
      selectedCurrencies.filter(
        (selectedCurrency) => selectedCurrency !== currencyCode,
      ),
    );
  };

  // const handleSwapUp = () => {
  //   const currencyIndex = selectedCurrencies.indexOf(currencyCode);
  //   if (currencyIndex !== 0) {
  //     const newSelectedCurrencies = [...selectedCurrencies];
  //     newSelectedCurrencies[currencyIndex] =
  //       selectedCurrencies[currencyIndex - 1];
  //     newSelectedCurrencies[currencyIndex - 1] = currencyCode;
  //     handleSelectedCurrenciesUpdate(newSelectedCurrencies);
  //   }
  // };

  // const handleSwapDown = () => {
  //   const currencyIndex = selectedCurrencies.indexOf(currencyCode);
  //   if (currencyIndex !== selectedCurrencies.length - 1) {
  //     const newSelectedCurrencies = [...selectedCurrencies];
  //     newSelectedCurrencies[currencyIndex] =
  //       selectedCurrencies[currencyIndex + 1];
  //     newSelectedCurrencies[currencyIndex + 1] = currencyCode;
  //     handleSelectedCurrenciesUpdate(newSelectedCurrencies);
  //   }
  // };

  const getCurrencyData = () => {
    // const baseCurrency = selectedCurrencies[0];

    // const baseCurrencyExchangeRate =
    //   exchangeRates?.find((exchangeRate) => exchangeRate.code === baseCurrency)
    //     ?.rate || 1;

    const indexOfCurrentCurrency = selectedCurrencies.indexOf(currencyCode);
    const indexOfPreviousCurrency =
      indexOfCurrentCurrency === 0
        ? indexOfCurrentCurrency
        : indexOfCurrentCurrency - 1;

    const fromCurrency = selectedCurrencies[indexOfPreviousCurrency];
    const toCurrency = currencyCode;

    // Currency Exchange Rate based on Base Currency
    const fromCurrencyExchangeRate =
      exchangeRates?.find((exchangeRate) => exchangeRate.code === fromCurrency)
        ?.rate || 1;

    const toCurrencyExchangeRate =
      exchangeRates?.find((exchangeRate) => exchangeRate.code === toCurrency)
        ?.rate || 1;

    const conversionRate = toCurrencyExchangeRate / fromCurrencyExchangeRate;

    const rates = {
      [fromCurrency]: 1.0,
      [toCurrency]: conversionRate,
    };

    const currencyData = {
      amount: quantity * toCurrencyExchangeRate,
      fromCurrency,
      toCurrency,
      exchangeRates: rates,
    };

    return currencyData;
  };

  const currencyData = getCurrencyData();

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white relative">
      <CardHeader className="absolute -top-2 -right-4 p-2">
        <XCircle
          className="h-6 w-6 cursor-pointer z-[100]"
          onClick={handleRemoveCurrency}
        />
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-3xl">
            <CurrencyFlagImage code={currencyCode} size={48} />
          </span>
          <span className="text-3xl font-bold">
            {currencyCode} {currencyData.amount.toFixed(2)}
          </span>
        </div>
        <div className="text-sm">
          <p>
            {currencyData.fromCurrency} - {currencyCode}
          </p>
          <p>
            Rate: 1 {currencyData.fromCurrency} ={" "}
            {currencyData.exchangeRates[currencyCode].toFixed(4)} {currencyCode}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
