import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";

export default function SelectedCurrencyItem({
  currencyCode,
  exchangeRates,
  quantity,
  selectedCurrencies,
  handleSelectedCurrenciesUpdate,
}) {
  const handleRemoveCurrency = () => {
    handleSelectedCurrenciesUpdate(
      selectedCurrencies.filter(
        (selectedCurrency) => selectedCurrency !== currencyCode,
      ),
    );
  };

  const handleSwapUp = () => {
    const currencyIndex = selectedCurrencies.indexOf(currencyCode);
    if (currencyIndex !== 0) {
      const newSelectedCurrencies = [...selectedCurrencies];
      newSelectedCurrencies[currencyIndex] =
        selectedCurrencies[currencyIndex - 1];
      newSelectedCurrencies[currencyIndex - 1] = currencyCode;
      handleSelectedCurrenciesUpdate(newSelectedCurrencies);
    }
  };

  const handleSwapDown = () => {
    const currencyIndex = selectedCurrencies.indexOf(currencyCode);
    if (currencyIndex !== selectedCurrencies.length - 1) {
      const newSelectedCurrencies = [...selectedCurrencies];
      newSelectedCurrencies[currencyIndex] =
        selectedCurrencies[currencyIndex + 1];
      newSelectedCurrencies[currencyIndex + 1] = currencyCode;
      handleSelectedCurrenciesUpdate(newSelectedCurrencies);
    }
  };

  const getCurrencyData = () => {
    /*

      This will be shape of currencyData
  const currencyData =   {
      amount: 100,
      fromCurrency: "USD",
        toCurrency: "EUR",
        exchangeRates: {
          USD: 1,
          EUR: 0.85,
        },
      }
       */

    const baseCurrency = selectedCurrencies[0];

    const baseCurrencyExchangeRate =
      exchangeRates?.find((exchangeRate) => exchangeRate.code === baseCurrency)
        ?.rate || 1;

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
    <div
      className="currency-row"
      key={currencyCode}
      style={{ position: "relative" }}
    >
      <div className="info-box-main">
        <div className="info-box-left">
          <div className="left-data">
            <div className="currency-info">
              <img
                className="country-flag"
                src={`https://flagsapi.com/${currencyCode.slice(0, 2)}/flat/64.png`}
                alt={`${currencyCode} flag`}
              />
              <div className="currency-text">{currencyCode}</div>
            </div>

            <div className="amount-main">
              <div className="amount-top">
                {currencyCode} {currencyData.amount.toFixed(2)}
              </div>
              <div className="amount-bottom">
                1 {currencyData.fromCurrency} ={" "}
                {currencyData.exchangeRates[currencyCode].toFixed(4)}{" "}
                {currencyCode}
              </div>
            </div>
          </div>
        </div>
        <div
          className="info-box-right"
          // onClick={() => handleSwapAdjacent(index)}
        >
          <>
            <FaAngleUp onClick={handleSwapUp} />
            <FaAngleDown onClick={handleSwapDown} />
          </>
        </div>
        {/* X Button to Remove Currency */}
        <FaTimes
          className="remove-currency-button"
          onClick={handleRemoveCurrency}
        />
      </div>
    </div>
  );
}
