


// import React from "react";
// import PageTemplate from "../components/templateMovieListPage";
// import useFiltering from "../hooks/useFiltering";
// import MovieFilterUI, {
//     titleFilter,
//     genreFilter,
//     yearFilter,
//     ratingFilter,
//   } from "../components/movieFilterUI";

//   const titleFiltering = {
//     name: "title",
//     value: "",
//     condition: titleFilter,
//   };
//   const genreFiltering = {
//     name: "genre",
//     value: "0",
//     condition: genreFilter,
//   };
//   const ratingFiltering = {
//     name: "rating",
//     value: "0",
//     condition: ratingFilter,
//   };
//   const yearFiltering = {
//     name: "year",
//     value: "1900",
//     condition: yearFilter,
//   };

// const FavouriteMoviesPage: React.FC= () => {
//   const { filterValues, setFilterValues, filterFunction } = useFiltering(
//     [],
//     [titleFiltering,
//         genreFiltering,
//         ratingFiltering,
//         yearFiltering,]
//   );

//   const changeFilterValues = (type: string, value: string) => {
//     const changedFilter = { name: type, value: value };
//     const updatedFilterSet =
//     type === "title"
//     ? [changedFilter, filterValues[1], filterValues[2], filterValues[3]]
//     : type === "genre"
//     ? [filterValues[0], changedFilter, filterValues[2], filterValues[3]]
//     : type === "rating"
//     ? [filterValues[0], filterValues[1], changedFilter, filterValues[3]]
//     : [filterValues[0], filterValues[1], filterValues[2], changedFilter];
//     setFilterValues(updatedFilterSet);
//   };

//   const favouriteMovies = JSON.parse(localStorage.getItem("favourites") || '[]');

//   const displayedMovies = filterFunction(favouriteMovies);

//   const toDo = () => true;

//   return (
//     <>
//       <PageTemplate
//         title="Favourite Movies"
//         movies={displayedMovies}
//         selectFavourite={toDo}
//       />
//       <MovieFilterUI
//          onFilterValuesChange={changeFilterValues}
//          titleFilter={filterValues[0].value}
//          genreFilter={filterValues[1].value}
//          ratingFilter={filterValues[2].value}
//          yearFilter={filterValues[3].value}
//       />
//     </>
//   );
// };

// export default FavouriteMoviesPage;
import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
        titleFilter,
       
        yearFilter,
        ratingFilter,
      } from "../components/movieFilterUI";
import { MovieT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

  const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
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

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
        [titleFiltering,
        genreFiltering,
        ratingFiltering,
        yearFiltering,]
  );

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId ],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );
   // Check if any of the parallel queries is still loading.
   const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

   if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayMovies = allFavourites
  ? filterFunction(allFavourites)
  : [];
//   const toDo = () => true;

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

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
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

export default FavouriteMoviesPage;