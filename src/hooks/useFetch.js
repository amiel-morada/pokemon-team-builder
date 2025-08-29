// hooks/useFetch.js
import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading };
}
