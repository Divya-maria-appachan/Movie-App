// import React from "react";
// import PageTemplate from "../components/templateMovieListPage";

// const FavouriteMoviesPage: React.FC= () => {
//     const toDo = () => true;
//     // Get movies from local storage.
//     const movies = JSON.parse(localStorage.getItem("favourites") || '[]');
  
//     return (
//       <PageTemplate
//         title="Favourite Movies"
//         movies={movies}
//         selectFavourite={toDo}
//       />
//     );
// }

// export default FavouriteMoviesPage


import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
    yearFilter,
    ratingFilter,
  } from "../components/movieFilterUI";

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

const FavouriteMoviesPage: React.FC= () => {
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering,
        genreFiltering,
        ratingFiltering,
        yearFiltering,]
  );

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

  const favouriteMovies = JSON.parse(localStorage.getItem("favourites") || '[]');

  const displayedMovies = filterFunction(favouriteMovies);

  const toDo = () => true;

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        selectFavourite={toDo}
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