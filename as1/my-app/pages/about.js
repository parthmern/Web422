import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export function getStaticProps() {
  const workId = "OL453657W";

  return new Promise((resolve, reject) => {
    fetch(`https://openlibrary.org/works/${workId}.json`)
      .then((res) => res.json())
      .then((data) => {
        resolve({ props: { book: data } });
      })
      .catch((err) => reject(err));
  });
}

export default function About({ book }) {
  return (
    <div>
      <PageHeader text="About the Developer: Parth Patel" />

      <p>
        Hello! I&apos;m Parth Ranjitbhai Patel, a passionate web developer from
        Toronto, Canada. I enjoy building scalable full-stack applications using
        modern technologies like mainly MERN stack. Visit my portfolio: 💚
        <a
          href="https://parthmern.cloud/"
          target="_blank"
          rel="noopener noreferrer"
        >
          parthmern.cloud
        </a>
      </p>
      <p>
        Here&apos;s one of my favorite books that we fetched from the Open
        Library API:
      </p>

      <BookDetails book={book} />
    </div>
  );
}
