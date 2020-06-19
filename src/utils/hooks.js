import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [resStatus, setResStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUrl = useCallback(async () => {
    const cache = JSON.parse(sessionStorage.getItem(url));
    if (!cache) {
      const response = await fetch(url);
      setResStatus(response.status);
      const data = await response.json();
      sessionStorage.setItem(url, JSON.stringify(data));
      setData(data);
    } else {
      setResStatus(200);
      setData(cache);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);
  return [data, loading, resStatus];
}
export { useFetch };
