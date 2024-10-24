import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type CurrenciesContextType = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  updateTime: string;
  currencies: CurrenciesListItem[];
  exchangeRates: ExchangeRate[];
  selectedCurrencies: string[];
  setSelectedCurrencies: (currencies: string[]) => void;
  handleCurrencySelect: (code: string) => void;
  handleSelectedCurrenciesUpdate: (currencies: string[]) => void;
  loading: boolean;
  error: string | null;
};
export const CurrenciesContext = createContext<
  CurrenciesContextType | undefined
>(undefined);

const quantityStep = 100;

const API_KEY = process.env.NEXT_PUBLIC_OPEN_EXCHANGE_RATES_API_KEY;

const API_BASE_URL = "https://openexchangerates.org/api";

export type CurrenciesListItem = {
  code: string;
  name: string;
};

export type ExchangeRate = {
  code: string;
  rate: number;
  base: string;
};

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const [quantity, setQuantity] = useState<number>(quantityStep);
  const [updateTime, setUpdateTime] = useState<string>("");
  const [currencies, setCurrencies] = useState<CurrenciesListItem[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  // console.log("exchangeRates", exchangeRates);
  // console.log("currencies", currencies);

  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrencies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/currencies.json?app_id=${API_KEY}`,
      );
      const currenciesData = response.data
        ? Object.entries(response.data).map(([code, name]) => ({
            code,
            name,
          }))
        : [];
      setLoading(false);
      // console.log("setCurrencies", currenciesData);
      setCurrencies(currenciesData as CurrenciesListItem[]);
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
        `${API_BASE_URL}/latest.json?app_id=${API_KEY}&base=${baseCurrency}`,
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
      setExchangeRates(exchangeRatesData as ExchangeRate[]);
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  const handleCurrencySelect = async (code: string) => {
    // Add or remove currency from selectedCurrencies

    const newSelectedCurrencies = selectedCurrencies.includes(code)
      ? selectedCurrencies.filter((currency) => currency !== code)
      : [...selectedCurrencies, code];

    setSelectedCurrencies(newSelectedCurrencies);

    // If new Currencies has a different base currency, fetch exchange rates
    // if (selectedCurrencies[0] !== newSelectedCurrencies[0]) {
    //   await getExchangeRates(newSelectedCurrencies[0]);
    // }
  };

  const handleSelectedCurrenciesUpdate = (newSelectedCurrencies: string[]) => {
    setSelectedCurrencies(newSelectedCurrencies);

    // If new Currencies has a different base currency, fetch exchange rates
    if (selectedCurrencies[0] !== newSelectedCurrencies[0]) {
      getExchangeRates(newSelectedCurrencies[0]);
    }
  };

  useEffect(() => {
    getCurrencies();
    getExchangeRates();
  }, [API_KEY]);

  return (
    <CurrenciesContext.Provider
      value={{
        quantity,
        setQuantity,
        updateTime,
        currencies,
        exchangeRates,
        selectedCurrencies,
        setSelectedCurrencies,
        handleCurrencySelect,
        handleSelectedCurrenciesUpdate,
        loading,
        error,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
};

export const useCurrencies = () => {
  const context = useContext(CurrenciesContext);
  if (context === undefined) {
    throw new Error("useCurrencies must be used within a CurrenciesProvider");
  }
  return context;
};
