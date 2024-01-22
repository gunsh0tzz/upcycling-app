import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data: ideas, error, isLoading } = useSWR("/api/ideas", fetcher);

  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  function handleToggleFavourites(id) {
    if (favourites.includes(id)) {
      setFavourites(favourites?.filter((favourite) => favourite !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  return (
    <>
      <Layout>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            favourites={favourites}
            onToggleFavourites={handleToggleFavourites}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
