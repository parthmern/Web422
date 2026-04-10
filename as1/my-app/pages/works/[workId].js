import { useRouter } from "next/router";
import useSWR from "swr";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";
// import { useAtom } from "jotai";
// import { favouritesAtom } from "@/store";

export default function WorkId() {
  const router = useRouter();
  const { workId } = router.query;

  // const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const { data, error, isLoading } = useSWR(
    workId ? `/api/works/${workId}` : null
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
