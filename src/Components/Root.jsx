import QuantityCounter from "./QuantityCounter";
import { Fragment, useEffect, useState } from "react";
import CurrenciesModal from "./CurrenciesModal";
import axios from "axios";
import SelectedCurrencyItem from "./SelectedCurrencyItem";

const quantityStep = 100;

/* Currencies Data
const currencies = [
{ code: "USD", name: "United States Dollar" },
];
 */

/* Exchange Rates Data
const exchangeRates = [
{ code: "USD", rate: 1.0, base: "USD" },
];
 */

/* Selected Currencies Data
const selectedCurrencies = ["USD", "EUR"];
 */

export default function Root() {
  const [quantity, setQuantity] = useState(quantityStep);
  const [updateTime, setUpdateTime] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);

  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "97e21463b57145b0878babb91a447444"; // Your actual API key

  const getCurrencies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://openexchangerates.org/api/currencies.json?app_id=${API_KEY}`,
      );
      const currenciesData = response.data
        ? Object.entries(response.data).map(([code, name]) => ({
            code,
            name,
          }))
        : [];
      setLoading(false);
      // console.log("setCurrencies", currenciesData);
      setCurrencies(currenciesData);
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  const getExchangeRates = async (baseCurrency = "USD") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&base=${baseCurrency}`,
      );
      const timestamp = response.data.timestamp;
      const updateDate = new Date(timestamp * 1000);
      const formattedDate = updateDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setUpdateTime(formattedDate);

      const exchangeRatesData = response?.data?.rates
        ? Object.entries(response.data.rates).map(([code, rate]) => ({
            code,
            rate,
            base: baseCurrency,
          }))
        : [];

      setLoading(false);
      // console.log("setExchangeRates", exchangeRatesData);
      setExchangeRates(exchangeRatesData);
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrencies();
    getExchangeRates();
  }, [API_KEY]);

  const setIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + quantityStep);
  };

  const setDecrement = () => {
    const newQuantity = quantity - quantityStep;
    setQuantity(newQuantity > 0 ? newQuantity : 0);
  };

  const handleCurrencySelect = async (code) => {
    // Add or remove currency from selectedCurrencies

    const newSelectedCurrencies = selectedCurrencies.includes(code)
      ? selectedCurrencies.filter((currency) => currency !== code)
      : [...selectedCurrencies, code];

    setSelectedCurrencies(newSelectedCurrencies);

    // If new Currencies has a different base currency, fetch exchange rates
    if (selectedCurrencies[0] !== newSelectedCurrencies[0]) {
      await getExchangeRates(newSelectedCurrencies[0]);
    }
  };

  const handleSelectedCurrenciesUpdate = (newSelectedCurrencies) => {
    setSelectedCurrencies(newSelectedCurrencies);

    // If new Currencies has a different base currency, fetch exchange rates
    if (selectedCurrencies[0] !== newSelectedCurrencies[0]) {
      getExchangeRates(newSelectedCurrencies[0]);
    }
  };

  return (
    <div>
      <QuantityCounter
        quantity={quantity}
        handleDecrement={setDecrement}
        handleIncrement={setIncrement}
        updateTime={updateTime}
      />

      {error && <p className="error-text">{error}</p>}

      <CurrenciesModal
        currencies={currencies}
        selectedCurrencies={selectedCurrencies}
        handleCurrencySelect={handleCurrencySelect}
      />
      {loading ? (
        <p>Loading...</p>
      ) : selectedCurrencies.length === 0 ? (
        <p className="add-currency-txt">Please add a currency to begin</p>
      ) : (
        selectedCurrencies.map((currencyCode) => {
          return (
            <Fragment>
              <SelectedCurrencyItem
                currencyCode={currencyCode}
                exchangeRates={exchangeRates}
                quantity={quantity}
                selectedCurrencies={selectedCurrencies}
                handleSelectedCurrenciesUpdate={handleSelectedCurrenciesUpdate}
              />
            </Fragment>
          );
        })
      )}
    </div>
  );
}
