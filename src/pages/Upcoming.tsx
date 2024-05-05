// import React, { useState, useEffect, FC } from "react";  

// import { getUpcomingMovies } from "../api/tmdb-api";


// import PageTemplate from "../components/templateMovieListPage";


// import { ListedMovie } from "../types/interfaces";


// const styles = {
//   root: {
//     padding: "20px",
//   }, 
//   fab: {
//     marginTop: 8,
//     position: "fixed",
//     top: 2,
//     right: 2,
//   },
// };

    
// const UpcomingMoviesPage: FC = () => {
//   const [movies, setMovies] = useState<ListedMovie[]>([]);
//   const favourites = movies.filter(m => m.favourite)
//     localStorage.setItem('favourites', JSON.stringify(favourites))

//   // New function
//   const addToFavourites = (movieId: number) => {
//     const updatedMovies = movies.map((m: ListedMovie) =>
//       m.id === movieId ? { ...m, favourite: true } : m
//     );
//     setMovies(updatedMovies);
//   };

//   useEffect(() => {
//     getUpcomingMovies().then(movies => { // Call function to fetch upcoming movies
//       setMovies(movies);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  
//   return (
//     <PageTemplate
//       title='Upcoming Movies'
//       movies={movies}
//       selectFavourite={addToFavourites}
//     />
//   );
// };

// export default UpcomingMoviesPage;


import React, { useState, useEffect, FC } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
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

  // New function to handle adding to favorites
  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
    localStorage.setItem("favourites", JSON.stringify(updatedMovies));
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
            <AddToFavouritesIcon {...movie}/>
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


