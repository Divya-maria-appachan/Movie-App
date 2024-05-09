import React, { useState } from "react";
import { ListedTv,TvT,  TvReview } from "../types/interfaces";

interface TvContextInterface {
    favourites: number[];
    addToFavourites: ((tv: ListedTv) => void);
    removeFromFavourites: ((tv: ListedTv) => void);
    addReview: ((tv: TvT, review: TvReview) => void);  // NEW
}
const initialContextState: TvContextInterface = {
    favourites: [],
    addToFavourites: (tv) => {tv.id },
    removeFromFavourites: (tv) => { tv.id},
    addReview: (tv, review) => { tv.id, review},  // NEW
};




export const TvsContext = React.createContext<TvContextInterface>(initialContextState);;

const TvsContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [myReviews, setMyReviews] = useState<TvReview[]>( [] );
    const [favourites, setFavourites] = useState<number[]>([]);

    const addToFavourites = (tv: ListedTv) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(tv.id)) {
            updatedFavourites.push(tv.id);
        }
        setFavourites(updatedFavourites);
    };

    // We will use this function in a later section
    const removeFromFavourites = (tv: ListedTv) => {
        setFavourites(favourites.filter((mId) => mId !== tv.id));
    };
    const addReview = (tv: TvT, review: TvReview) => {   // NEW
        setMyReviews( {...myReviews, [tv.id]: review } )
      };


 return (
    <TvsContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,    // NEW
      }}
    >
      {props.children}
    </TvsContext.Provider>
  );
};

export default TvsContextProvider;