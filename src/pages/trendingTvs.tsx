import React, { useState } from "react";
import PageTemplate from "../components/templateTvListPage";
import { getTrendingTvs } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvsFilterUI, {
  titleFilter,
  genreFilter,
  yearFilter,
  ratingFilter,
} from "../components/tvFilterUI";
import { DiscoverTvs, ListedTv } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIconsTv/addToFavourites'
import Pagination from "../components/Pagination";

const titleFiltering = {
  name: "name",
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

const TrendingTvs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverTvs, Error>(
    ["Trending Tv", currentPage],
    () => getTrendingTvs(currentPage),
    {
      keepPreviousData: true, // Keep previous data while loading new data
    }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, ratingFiltering, yearFiltering]
  );

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
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

  const tvs = data ? data.results : [];
  const displayedTvs = filterFunction(tvs);

  return (
    <>
      <PageTemplate
       name="Trending TV shows"
        tvs={displayedTvs}
        action={(tv: ListedTv) => {
          return (
            <>
              <AddToFavouritesIcon {...tv} />
            </>
          );
        }}
      />
      <TvsFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        ratingFilter={filterValues[2].value}
        yearFilter={filterValues[3].value}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default TrendingTvs;