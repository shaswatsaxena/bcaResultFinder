import { useState, useEffect } from "react";
function useFetch(url) {
  const [data, setData] = useState([]);
  const [resStatus, setResStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    setResStatus(response.status);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading, resStatus];
}
export { useFetch };
