

// import { useState } from "react";
// import Header from "../headerMovieList";
// import FilterCard from "../filterMoviesCard";
// import Grid from "@mui/material/Grid";
// import Fab from "@mui/material/Fab";
// import Drawer from "@mui/material/Drawer";
// import MovieList from "../movieList";
// import { MovieListPageTemplateProps } from "../../types/interfaces";

// const styles = {
//   root: {
//     padding: "20px",
//   },
//   fab: {
//     marginTop: 8,
//     position: "fixed",
//     top: 2,
//     right: 2,
//   },
// };

// function MovieListPageTemplate({
//   movies,
//   title,
//   selectFavourite,
// }: MovieListPageTemplateProps) {
//   const [titleFilter, setTitleFilter] = useState("");
//   const [genreFilter, setGenreFilter] = useState("0");
//   const [ratingFilter, setRatingFilter] = useState("");
//   const [yearFilter, setYearFilter] = useState("1999");

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const genreId = Number(genreFilter);
//   const minRating = ratingFilter !== "" ? parseFloat(ratingFilter) : undefined;
//   const releaseYear= yearFilter !== "" ? parseInt(yearFilter) : undefined;

//   let displayedMovies = movies
//     .filter((m) => {
//       return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
//     })
//     .filter((m) => {
//       return genreId > 0 ? m.genre_ids.includes(genreId) : true;
//     })
//     .filter((m) => {
//       return minRating ? m.vote_average >= minRating : true;
//     })
//     .filter((m) => {
//         return releaseYear ? new Date(m.release_date).getFullYear() >= releaseYear : true;
//       });

//   const handleChange = (type: string, value: string) => {
//     if (type === "title") setTitleFilter(value);
//     else if (type === "genre") setGenreFilter(value);
//     else if (type === "rating") setRatingFilter(value);
//     else if (type === "year") setYearFilter(value);
//   };

//   return (
//     <>
//       <Grid container sx={styles.root}>
//         <Grid item xs={12}>
//           <Header title={title} />
//         </Grid>
//         <Grid item container spacing={5}>
//           <MovieList
//             movies={displayedMovies}
//             selectFavourite={selectFavourite}
//           />
//         </Grid>
//       </Grid>
//       <Fab
//         color="secondary"
//         variant="extended"
//         onClick={() => setDrawerOpen(true)}
//         sx={styles.fab}
//       >
//         Filter
//       </Fab>
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <FilterCard
//           onUserInput={handleChange}
//           titleFilter={titleFilter}
//           genreFilter={genreFilter}
//           ratingFilter={ratingFilter}
//           yearFilter={yearFilter}
//         />
//       </Drawer>
//     </>
//   );
// }
// export default MovieListPageTemplate;
import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5}>
      <MovieList action={props.action} movies={props.movies} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;