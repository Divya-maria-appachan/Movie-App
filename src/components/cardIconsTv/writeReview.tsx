import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {ListedTv} from "../../types/interfaces";
import { Link } from "react-router-dom";

const WriteReviewIcon:React.FC<ListedTv> = (tv) => {
  return (
    <Link
    to={'/tvs/reviews/form'}
    state={{
        tvId: tv.id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteReviewIcon;