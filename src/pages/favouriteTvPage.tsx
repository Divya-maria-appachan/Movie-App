import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateTvListPage";
import { TvsContext } from "../contexts/tvsContext";
import { useQueries } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TvFilterUI, {
  titleFilter,
  yearFilter,
  ratingFilter,
} from "../components/tvFilterUI";
import { TvT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIconsTv/removeFromFavourites";
import WriteReview from "../components/cardIconsTv/writeReview";
import Pagination from "../components/Pagination"; // Import the Pagination component

const ITEMS_PER_PAGE = 10; // Number of movies to display per page

const titleFiltering = {
  name: "name",
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
  condition: function (tv: TvT, value: string) {
    // Is user selected genre in this movies's genre list?
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = tv.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteTvsPage: React.FC = () => {
  const { favourites: tvIds } = useContext(TvsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([], [
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    yearFiltering,
  ]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page number

  // Create an array of queries and run them in parallel.
  const favouriteTvQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", tvId],
        queryFn: () => getTv(tvId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvQueries.map((q) => q.data);

  // Calculate pagination values
  const totalItems = allFavourites.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayTvs = allFavourites.slice(startIndex, endIndex);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
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
        name="Favourite Tv Shows"
        tvs={displayTvs}
        action={(tv) => {
          return (
            <>
              <RemoveFromFavourites {...tv} />
              <WriteReview {...tv} />
            </>
          );
        }}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <TvFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        ratingFilter={filterValues[2].value}
        yearFilter={filterValues[3].value}
      />
    </>
  );
};

export default FavouriteTvsPage;
