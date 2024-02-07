import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  const {
    data: ideas,
    isLoading,
    error,
  } = useSWR("/api/ideas", fetcher, {
    fallbackData: [],
  });

  if (!ideas) {
    return <p>ideas not found!</p>;
  }

  function handleToggleFavourites(id, event) {
    event.preventDefault();
    if (favourites.includes(id)) {
      setFavourites(favourites?.filter((favourite) => favourite !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  return (
    <>
      <SessionProvider session={session}>
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
      </SessionProvider>
    </>
  );
}
