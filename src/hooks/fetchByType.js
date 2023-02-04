import { useEffect, useState } from "react";
import axios from "axios";

const useFetchType = (url) => {
  const [type, setType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([false]);

  useEffect(() => {
    const fetchType = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setType(res.type.count);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchType();
  }, [url]);

  const reFetchType = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setType(res.type.count);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  return { type, isLoading, error, reFetchType };
};

export default useFetchType;
