import React, {MouseEvent, useContext} from "react";
import { TvsContext } from "../../contexts/tvsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {ListedTv} from "../../types/interfaces"

const AddToFavouritesIcon: React.FC<ListedTv> = (tv) => {
  const context = useContext(TvsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(tv);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;