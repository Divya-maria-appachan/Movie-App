

// import React, { useState, useEffect } from "react";
// import PageTemplate from "../components/templateMovieListPage";
// import { getMovies } from "../api/tmdb-api";
// import useFiltering from "../hooks/useFiltering";
// import MovieFilterUI, {
//   titleFilter,
//   genreFilter,
//   yearFilter,
//   ratingFilter,
// } from "../components/movieFilterUI";
// import { ListedMovie } from "../types/interfaces";

// const titleFiltering = {
//   name: "title",
//   value: "",
//   condition: titleFilter,
// };
// const genreFiltering = {
//   name: "genre",
//   value: "0",
//   condition: genreFilter,
// };
// const ratingFiltering = {
//   name: "rating",
//   value: "0",
//   condition: ratingFilter,
// };
// const yearFiltering = {
//   name: "year",
//   value: "1900",
//   condition: yearFilter,
// };

// const HomePage: React.FC = () => {
//   const [movies, setMovies] = useState<ListedMovie[]>([]);
//   const favourites = movies.filter((m) => m.favourite);
//   const {
//     filterValues,
//     setFilterValues,
//     filterFunction,
//   } = useFiltering([], [
//     titleFiltering,
//     genreFiltering,
//     ratingFiltering,
//     yearFiltering,
//   ]);
//   localStorage.setItem("favourites", JSON.stringify(favourites));

//   // New function to add movie to favourites
//   const addToFavourites = (movieId: number) => {
//     const updatedMovies = movies.map((m: ListedMovie) =>
//       m.id === movieId ? { ...m, favourite: true } : m
//     );
//     setMovies(updatedMovies);
//   };

//   // Function to handle changes in filter values
//   const changeFilterValues = (type: string, value: string) => {
//     const changedFilter = { name: type, value: value };
//     const updatedFilterSet =
//       type === "title"
//         ? [changedFilter, filterValues[1], filterValues[2], filterValues[3]]
//         : type === "genre"
//         ? [filterValues[0], changedFilter, filterValues[2], filterValues[3]]
//         : type === "rating"
//         ? [filterValues[0], filterValues[1], changedFilter, filterValues[3]]
//         : [filterValues[0], filterValues[1], filterValues[2], changedFilter];
//     setFilterValues(updatedFilterSet);
//   };

//   useEffect(() => {
//     getMovies().then((movies) => {
//       setMovies(movies);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const displayedMovies = filterFunction(movies);

//   return (
//     <>
//       <PageTemplate
//         title="Discover Movies"
//         movies={displayedMovies}
//         selectFavourite={addToFavourites}
//       />
//       <MovieFilterUI
//         onFilterValuesChange={changeFilterValues}
//         titleFilter={filterValues[0].value}
//         genreFilter={filterValues[1].value}
//         ratingFilter={filterValues[2].value}
//         yearFilter={filterValues[3].value}
//       />
//     </>
//   );
// };

// export default HomePage;
// import React from "react";
// import PageTemplate from "../components/templateMovieListPage";
// import { getMovies } from "../api/tmdb-api";
// import useFiltering from "../hooks/useFiltering";
// import MovieFilterUI, {
//   titleFilter,
//     genreFilter,
//     yearFilter,
//     ratingFilter,
// } from "../components/movieFilterUI";
// import { DiscoverMovies,ListedMovie } from "../types/interfaces";
// import { useQuery } from "react-query";
// import Spinner from "../components/spinner";
// import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'




//  const titleFiltering = {
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
  

// const HomePage: React.FC = () => {
//   const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
//   const { filterValues, setFilterValues, filterFunction } = useFiltering(
//     [],
//     [
//           titleFiltering,
//           genreFiltering,
//           ratingFiltering,
//           yearFiltering,
//         ]);
  

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (isError) {
//     return <h1>{error.message}</h1>;
//   }


//   const changeFilterValues = (type: string, value: string) => {
//     const changedFilter = { name: type, value: value };
//     const updatedFilterSet =
//       type === "title"
//         ? [changedFilter, filterValues[1], filterValues[2], filterValues[3]]
//         : type === "genre"
//         ? [filterValues[0], changedFilter, filterValues[2], filterValues[3]]
//         : type === "rating"
//         ? [filterValues[0], filterValues[1], changedFilter, filterValues[3]]
//         : [filterValues[0], filterValues[1], filterValues[2], changedFilter];
//     setFilterValues(updatedFilterSet);
//   };

//   const movies = data ? data.results : [];
//   const displayedMovies = filterFunction(movies);

//   // Redundant, but necessary to avoid app crashing.
//   // const favourites = movies.filter(m => m.favourite)
//   // localStorage.setItem("favourites", JSON.stringify(favourites));
//   // const addToFavourites = (movieId: number) => true;

//   return (
//     <>
//     <PageTemplate
//      title="Discover Movies"
//      movies={displayedMovies}
//      action={(movie: ListedMovie) => {
//        return (
//         <>
//        <AddToFavouritesIcon {...movie}/>
//        </>
//        ); 
//      }}/>
//       <MovieFilterUI
//         onFilterValuesChange={changeFilterValues}
//         titleFilter={filterValues[0].value}
//         genreFilter={filterValues[1].value}
//         ratingFilter={filterValues[2].value}
//         yearFilter={filterValues[3].value}
//       />
//     </>
//   );
// };
// export default HomePage;


import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  yearFilter,
  ratingFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
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
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", currentPage],
    () => getMovies(currentPage),
    {
      keepPreviousData: true, // Keep previous data while loading new data
    }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
     [
          titleFiltering,
          genreFiltering,
          ratingFiltering,
          yearFiltering,
        ]);
  

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return (
            <>
              <AddToFavouritesIcon {...movie} />
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
      <div>
        <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>Previous Page</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>Next Page</button>
      </div>
    </>
  );
};

export default HomePage;
