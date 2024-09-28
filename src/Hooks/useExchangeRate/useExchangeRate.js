import { useState, useEffect } from "react";
import axios from "axios";

const useExchangeRate = () => {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        // Replace with your own API key
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/pair/USD/INR`
        );
        setRate(response.data.conversion_rate);
      } catch (error) {
        setError("Error fetching exchange rate");
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  return { rate, loading, error };
};

export default useExchangeRate;
