import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { NightsStaySharp } from '@material-ui/icons';

const Home = ({ movies }) => {
  return (
    <div>
      <h1>Movies</h1>
      <div>
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  width={185}
                  height={245}
                  alt={movie.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const movies = await fetch(
    `${process.env.API_URL}/movie/now_playing?api_key=${process.env.API_KEY}`
  );
  const data = await movies.json();
  return { props: { movies: data.results } };
};
