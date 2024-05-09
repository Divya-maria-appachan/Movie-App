

import React, { useState } from "react";
import { ListedMovie,MovieT,  Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToFavourites: ((movie: ListedMovie) => void);
    removeFromFavourites: ((movie: ListedMovie) => void);
    addReview: ((movie: MovieT, review: Review) => void);  // NEW
    addToPlayList: ((movie: ListedMovie) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: (movie) => {movie.id },
    removeFromFavourites: (movie) => { movie.id},
    addReview: (movie, review) => { movie.id, review},  // NEW
    addToPlayList: (movie: ListedMovie) => {movie.id },
};




export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);;

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] );
    const [favourites, setFavourites] = useState<number[]>([]);
    const [playlists, setPlaylists] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]); 


    const addToFavourites = (movie: ListedMovie) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(movie.id)) {
            updatedFavourites.push(movie.id);
        }
        setFavourites(updatedFavourites);
    };
  //   const addToPlayList =  (movie: ListedMovie) => {
  //     let updatedPlaylists = [...playlists];
  //     if (!playlists.includes(movie.id)) {
  //         updatedPlaylists.push(movie.id);
  //     }
  //     setPlaylists(updatedPlaylists);  console.log(updatedPlaylists);
  // };

  const addToPlayList = (movie: ListedMovie) => {
    setMustWatch((prevMustWatch) => [...prevMustWatch, movie.id]);
    console.log("Movies tagged as 'must watch':", mustWatch);
  };

    // We will use this function in a later section
    const removeFromFavourites = (movie: ListedMovie) => {
        setFavourites(favourites.filter((mId) => mId !== movie.id));
    };
    const addReview = (movie: MovieT, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };


 return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,    // NEW
        addToPlayList,
        mustWatch, //
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;