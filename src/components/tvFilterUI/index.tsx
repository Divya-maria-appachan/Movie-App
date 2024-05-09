import React, { useState } from "react";
import FilterCard from "../filterTvsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedTv } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

interface TvFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  yearFilter: string;
  ratingFilter: string;
}

// Title filter function
export const titleFilter = function (tv: ListedTv, value: string) {
  return tv.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

// Genre filter function
export const genreFilter = function (tv: ListedTv, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? tv.genre_ids.includes(genreId) : true;
};

// Year filter function
export const yearFilter = function (tv: ListedTv, value: string) {
  const releaseYear = parseInt(value);
  return releaseYear ? new Date(tv.first_air_date).getFullYear() >= releaseYear : true;
};

// Rating filter function
export const ratingFilter = function (tv: ListedTv, value: string) {
  const minRating = parseFloat(value);
  return minRating ? tv.vote_average >= minRating : true;
};

const TvFilterUI: React.FC<TvFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  yearFilter,
  ratingFilter,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          yearFilter={yearFilter}
          ratingFilter={ratingFilter}
        />
      </Drawer>
    </>
  );
};

export default TvFilterUI;
