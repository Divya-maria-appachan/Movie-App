
import React, { useContext, useState } from "react";
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
import Pagination from "../components/Pagination"; // Import the Pagination component

const ITEMS_PER_PAGE = 10; // Number of movies to display per page

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
  const { filterValues, setFilterValues } = useFiltering([], [
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    yearFiltering,
  ]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page number

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
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

  // Calculate pagination values
  const totalItems = allFavourites.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayMovies = allFavourites.slice(startIndex, endIndex);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [
            changedFilter,
            filterValues[1],
            filterValues[2],
            filterValues[3],
          ]
        : type === "genre"
        ? [
            filterValues[0],
            changedFilter,
            filterValues[2],
            filterValues[3],
          ]
        : type === "rating"
        ? [
            filterValues[0],
            filterValues[1],
            changedFilter,
            filterValues[3],
          ]
        : [
            filterValues[0],
            filterValues[1],
            filterValues[2],
            changedFilter,
          ];

    setFilterValues(updatedFilterSet);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
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
