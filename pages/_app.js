import GlobalStyle from "../styles";
import Layout from "@/components/layout";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const {
    data: ideas,
    isLoading,
    error,
  } = useSWR("/api/ideas", fetcher, {
    fallbackData: [],
  });

  if (!ideas) {
    return <p>ideas not found</p>;
  }
  const router = useRouter();

  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: "",
  });

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
