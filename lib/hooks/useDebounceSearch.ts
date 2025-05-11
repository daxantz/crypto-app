import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { useGetAllCurrenciesQuery } from "../cryptoApi";

export function useDebouncedSearchParams(
  searchValue: string,
  delay: number = 500
) {
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetAllCurrenciesQuery(
    searchParams.get("search") || ""
  );
  const router = useRouter();

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const params = new URLSearchParams(searchParams); // clone current params

        if (query) {
          params.set("search", query);
        } else {
          params.delete("search");
        }

        router.replace(`?${params.toString()}`);
      }, delay),
    [router, searchParams, delay]
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel(); // clean up
  }, [searchValue, debouncedSearch]);

  return { data, isLoading };
}
