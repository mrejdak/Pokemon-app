import { useQuery } from "@tanstack/react-query";

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
