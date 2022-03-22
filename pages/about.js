import clientPromise from "../lib/mongodb";

export default function about({ movies }) {
  // console.log(movies);
  return (
    <div>
      <h3>hello</h3>
      <div>
        <ul>
          {movies &&
            movies.map((movie) => <li key={movie._id}>{movie.title}</li>)}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const data = await db
    .collection("movies")
    .find({ year: 2014, "imdb.rating": { $gt: 8 } })
    .limit(15)
    .toArray();
  const movies = JSON.parse(JSON.stringify(data));
  return {
    props: { movies },
  };
}
