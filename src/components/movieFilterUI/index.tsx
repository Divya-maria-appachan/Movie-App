import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedMovie } from "../../types/interfaces";

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

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  yearFilter: string;
  ratingFilter: string;
  
}

// Title filter function
export const titleFilter = function (movie: ListedMovie, value: string) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

// Genre filter function
export const genreFilter = function (movie: ListedMovie, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};

// Year filter function
export const yearFilter = function (movie: ListedMovie, value: string) {
  const releaseYear = parseInt(value);
  return releaseYear ? new Date(movie.release_date).getFullYear() >= releaseYear : true;
};

// Rating filter function
export const ratingFilter = function (movie: ListedMovie, value: string) {
  const minRating = parseFloat(value);
  return minRating ? movie.vote_average >= minRating : true;
};

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
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

export default MovieFilterUI;
