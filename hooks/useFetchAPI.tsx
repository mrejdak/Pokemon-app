import { useEffect, useState } from "react";

export const useFetchApi = (url: string) => {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    })();
  }, [url]);

  return data;
};