type Author = { name: string }
const LiteralApi = 'https://literal.club/graphql/'

export default async function BookIsReading() {
  const { data: { booksByReadingStateAndProfile } } = await getBookIsReading();
  const book = booksByReadingStateAndProfile[0]
  return (
    <>
      {book &&
        <>
          <p className="text-sm lg:text-xs bg-background">{book.title}</p >
          <p className="mb-3 text-sm lg:text-xs bg-background">{book.authors.map((e: Author) => e.name).join(', ')}</p>
        </>
      }
    </>
  )
}

async function getBookIsReading() {
  const { data: { login: {
    token, profile: { id }
  } } } = await getLiteralToken()
  const readingStatus = 'IS_READING'
  const options = {
    next: { revalidate: 86400 }, // revalidate books every day
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
        }
      }`,
      variables: { limit: 1, offset: 0, readingStatus, profileId: id }
    })
  }
  const res = await fetch(LiteralApi, options)
  if (!res.ok) { throw new Error('Failed to fetch data') }
  return res.json()
}

async function getLiteralToken() {
  const options = {
    next: { revalidate: 604800 }, // revalidate token every week
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          profile { id }
        }
      }`,
      variables: { email: process.env.LITERAL_EMAIL, password: process.env.LITERAL_PASSWORD }
    })
  }
  const res = await fetch(LiteralApi, options)
  if (!res.ok) { throw new Error('Failed to fetch data') }
  return res.json()
}
