import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

// import tileData from './tileData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      textAlign: 'center',
    },
    gridList: {
      width: 500,
      height: 450,
    },
  })
);

const Home = ({ movies }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.title}>Now Playing Movie</div>
        </Grid>
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`}>
            <Grid item xs={4} sm={3} key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                width={185}
                height={247}
                alt={movie.title}
              />
            </Grid>
          </Link>
        ))}
      </Grid>
    </div>
  );
};
// const Home = ({ movies }) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <GridList cellHeight={120} className={classes.gridList}>
//         <GridListTile cols={2} style={{ height: 'auto' }}>
//           <ListSubheader component="div" className={classes.title}>
//             Now Playing Movie
//           </ListSubheader>
//         </GridListTile>
//         {movies.map((movie) => (
//           <Link href={`/movies/${movie.id}`}>
//             <GridListTile key={movie.id}>
//               <Image
//                 src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
//                 width={185}
//                 height={247}
//                 alt={movie.title}
//               />
//               <GridListTileBar
//                 title={movie.title}
//                 subtitle={movie.release_date}
//                 actionIcon={<IconButton aria-label=""></IconButton>}
//               />
//             </GridListTile>
//           </Link>
//         ))}
//       </GridList>
//     </div>
//   );
// };

export default Home;

export const getServerSideProps = async () => {
  const movies = await fetch(
    `${process.env.API_URL}/movie/now_playing?api_key=${process.env.API_KEY}`
  );
  const data = await movies.json();
  return { props: { movies: data.results } };
};
