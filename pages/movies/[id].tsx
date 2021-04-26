import Image from 'next/image';

const movie = ({ movie, genres, credits }) => {
  return (
    <>
      <h2>{movie.title}</h2>
      <>{movie.tagline && <h3>~{movie.tagline}~</h3>}</>
      <p>{movie.overview}</p>
      <p>
        {new Date(movie.release_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        (Released)
      </p>
      <b>Genres</b>
      <>
        {genres.map((genre) => {
          return <p key={genre}>{genre}</p>;
        })}
      </>
      <b>Cast</b>
      <p>{credits[0]}</p>
      <p>{credits[1]}</p>
      <p>{credits[2]}</p>
      {/* <>
        {credits.map((credit) => {
          return <p key={credit}>{credit}</p>;
        })}
      </> */}
      <Image
        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
        width={185}
        height={245}
        alt={movie.title}
      ></Image>
    </>
  );
};

export default movie;

export const getServerSideProps = async ({ params }) => {
  const movieId = params.id;
  const movie = await fetch(
    `${process.env.API_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  const credits = await fetch(
    `${process.env.API_URL}/movie/${movieId}/credits?api_key=${process.env.API_KEY}`
  );
  const movieData = await movie.json();
  const creditsData = await credits.json();
  return {
    props: {
      movie: movieData,
      genres: movieData.genres.map((obj) => obj.name),
      credits: creditsData.cast.map((obj) => obj.name),
    },
  };
};
