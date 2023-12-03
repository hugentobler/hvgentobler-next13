import DecoratedLink from "./decorated-link";

type Author = { name: string };
type Book = {
  title: string;
  authors: Author[];
  slug: string;
};
const LiteralApi = "https://literal.club/graphql/";
const LiteralBookUrl = "https://literal.club/book/";

export default async function BookIsReading() {
  const {
    data: { booksByReadingStateAndProfile: books },
  } = (await getBookIsReading()) as {
    data: { booksByReadingStateAndProfile: Book[] };
  };
  return (
    <>
      {books && (
        <p className="whitespace-pre-wrap">
          I’m currently reading
          {books.map((book, i) => (
            <span key={i}>
              {" "}
              <DecoratedLink href={LiteralBookUrl + book.slug} target="blank">
                {book.title}
              </DecoratedLink>{" "}
              by {book.authors[0].name}
              {i + 1 == books.length ? "." : ","}
              {i + 1 < books.length && " and"}
            </span>
          ))}
        </p>
      )}
    </>
  );
}

async function getBookIsReading() {
  const {
    data: {
      login: {
        token,
        profile: { id },
      },
    },
  } = await getLiteralToken();
  const readingStatus = "IS_READING";
  const options = {
    next: { revalidate: 86400 }, // revalidate books every day
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `query booksByReadingStateAndProfile(
        $limit: Int!
        $offset: Int!
        $readingStatus: ReadingStatus!
        $profileId: String!
      ) {
        booksByReadingStateAndProfile(
          limit: $limit
          offset: $offset
          readingStatus: $readingStatus
          profileId: $profileId
        ) {
          title
          authors { name }
          slug
        }
      }`,
      variables: { limit: 100, offset: 0, readingStatus, profileId: id },
    }),
  };
  const res = await fetch(LiteralApi, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getLiteralToken() {
  const options = {
    next: { revalidate: 604800 }, // revalidate token every week
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          profile { id }
        }
      }`,
      variables: {
        email: process.env.LITERAL_EMAIL,
        password: process.env.LITERAL_PASSWORD,
      },
    }),
  };
  const res = await fetch(LiteralApi, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
