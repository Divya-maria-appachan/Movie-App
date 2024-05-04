// import React, { useState, useEffect, FC } from "react";  
// import PageTemplate from '../components/templateMovieListPage';
// import { ListedMovie } from "../types/interfaces";
// import { getMovies } from "../api/tmdb-api";


 
// const styles = {
//   root: {
//     padding: "20px",
//   }, fab: {
//     marginTop: 8,
//     position: "fixed",
//     top: 2,
//     right: 2,
//   },
// };

//   const HomePage: FC= () => {
//     const [movies, setMovies] = useState<ListedMovie[]>([]);
//     const favourites = movies.filter(m => m.favourite)
//     localStorage.setItem('favourites', JSON.stringify(favourites))
//     // New function
//   const addToFavourites = (movieId: number) => {
//     const updatedMovies = movies.map((m: ListedMovie) =>
//       m.id === movieId ? { ...m, favourite: true } : m
//     );
//     setMovies(updatedMovies);
//   };

//   useEffect(() => {
//     getMovies().then(movies => {
//       setMovies(movies);
//     });
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
    
//     return (
//       <PageTemplate
//       title='Discover Movies'
//       movies={movies}
//       selectFavourite={addToFavourites}
//     />
//   );
// };
// export default HomePage;

import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  yearFilter,
  ratingFilter,
} from "../components/movieFilterUI";
import { ListedMovie } from "../types/interfaces";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const ratingFiltering = {
  name: "rating",
  value: "0",
  condition: ratingFilter,
};
const yearFiltering = {
  name: "year",
  value: "1900",
  condition: yearFilter,
};

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<ListedMovie[]>([]);
  const favourites = movies.filter((m) => m.favourite);
  const {
    filterValues,
    setFilterValues,
    filterFunction,
  } = useFiltering([], [
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    yearFiltering,
  ]);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  // New function to add movie to favourites
  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: ListedMovie) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  // Function to handle changes in filter values
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1], filterValues[2], filterValues[3]]
        : type === "genre"
        ? [filterValues[0], changedFilter, filterValues[2], filterValues[3]]
        : type === "rating"
        ? [filterValues[0], filterValues[1], changedFilter, filterValues[3]]
        : [filterValues[0], filterValues[1], filterValues[2], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  useEffect(() => {
    getMovies().then((movies) => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        selectFavourite={addToFavourites}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        ratingFilter={filterValues[2].value}
        yearFilter={filterValues[3].value}
      />
    </>
  );
};

export default HomePage;
