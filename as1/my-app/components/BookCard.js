import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";

import Image from "next/image";

// https://getbootstrap.com/docs/5.3/components/card/#example this is used
export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  console.log("data", data, error);

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="card shadow-sm">
      <Image
        src={
          data?.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
            : "https://placehold.co/300x400?text=No+Image"
        }
        className="card-img-top"
        alt="Book cover loadingg....."
        width={288}
        height={400}
        style={{ objectFit: "cover" }}
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = "https://placehold.co/300x400?text=No+Image";
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{data?.title || ""}</h5>

        <p className="card-text text-muted" style={{ fontSize: "0.875rem" }}>
          {data?.first_publish_date || "N/A"}
        </p>

        {/* using <a> and href is refreshing page so need to use Link and for next js this is preffered as we know */}
        <Link href={`/works/${workId}`} className="btn btn-primary mt-auto">
          View Book
        </Link>
      </div>
    </div>
  );
}
