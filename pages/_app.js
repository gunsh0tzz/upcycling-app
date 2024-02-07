import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";

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

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  if (isLoading || showLoader) {
    return <LoadingAnimation fullScreen={true} showLogo={true} />;
  }

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
