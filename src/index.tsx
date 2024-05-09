import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import TvDetailPage from "./pages/tvDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import UpcomingMoviesPage from "./pages/Upcoming";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import MoviesContextProvider from "./contexts/moviesContext";
import TvsContextProvider from "./contexts/tvsContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TrendingMovies from "./pages/trendingMovies";
import TvPage from "./pages/tvPage";
import TrendingTvs from "./pages/trendingTvs";
import FavouriteTvsPage from "./pages/favouriteTvPage";
import TvReviewPage from "./pages/TvReviewPage";
import CreateMoviePage from "./pages/CreateMoviePage";
import AddTvReviewPage from "./pages/addTvReviewPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
        <MoviesContextProvider>
          <TvsContextProvider>
          <Routes>
          <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
          
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/trending" element={<TrendingMovies />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
         <Route path="/reviews/:id" element={<MovieReviewPage/>} />
         <Route path="/tvs/:id" element={<TvDetailPage />} />
         <Route path="/tvs" element={<TvPage />}/>
         <Route path="/tvs/trending" element={<TrendingTvs/>}/>
         <Route path="/tvs/favourites" element={<FavouriteTvsPage/>}/>
         <Route path="/tvs/reviews/:id" element={<TvReviewPage/>} />
         <Route path="/tvs/reviews/form" element={<AddTvReviewPage/>} />
         <Route path="/fantasy" element={<CreateMoviePage/>} />
         </Routes>
         </TvsContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
