

import React, { useState, useEffect, FC } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import AddToPlayListIcon from '../components/cardIcons/AddToPlayListIcon' // Import the new icon component
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 12; // Number of movies to display per page

const UpcomingMoviesPage: FC = () => {
  const [movies, setMovies] = useState<ListedMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number

  useEffect(() => {
    fetchMovies(currentPage); // Fetch movies for the initial page
  }, [currentPage]); // Trigger fetchMovies whenever currentPage changes

  const fetchMovies = async (page: number) => {
    try {
      const upcomingMovies = await getUpcomingMovies(page); // Fetch upcoming movies for the specified page
      setMovies(upcomingMovies);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  // Calculate pagination values
  const totalItems = movies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayMovies = movies.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayMovies}
        action={(movie: ListedMovie) => {
          return (
           <>
            <AddToPlayListIcon {...movie}/> {/* Render the new icon component */}
           </>
          ); 
        }}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default UpcomingMoviesPage;
