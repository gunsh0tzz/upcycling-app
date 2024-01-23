import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, mutate, error } = useSWR("/api/ideas", fetcher, {
    fallbackData: [],
  });
  const router = useRouter();
  const [ideas, setIdeas] = useState(data);

  useEffect(() => {
    if (data) {
      setIdeas(data);
    }
  }, [data]);
  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  function handleToggleFavourites(id) {
    return () => {
      const idx = favourites.indexOf(id);
      if (idx === -1) {
        setFavourites([...favourites, id]);
      } else {
        setFavourites([
          ...favourites.slice(0, idx),
          ...favourites.slice(idx + 1),
        ]);
      }
    };
  }

  return (
    <>
      <Layout>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            favouriteIdeas={favourites}
            ideas={ideas}
            onToggleFavourites={handleToggleFavourites}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
