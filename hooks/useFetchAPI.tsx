import { useEffect, useState } from "react";

export const useFetchApi = (url: string) => {
  const [data, setData] = useState<unknown | null>(null);
  // TODO: add error handling
  useEffect(() => {
    (async () => {
      try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      } catch (error) {
        console.log(error)
        setData(null)
      }
    })();
  }, [url]);

  return data;
};