import { useQuery } from "@tanstack/react-query";
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
        console.log(error);
        setData(null);
      }
    })();
  }, [url]);

  return data;
};

export const useQueryApi = (url: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["pokeScroll"],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
  if (isPending) return null;
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};
