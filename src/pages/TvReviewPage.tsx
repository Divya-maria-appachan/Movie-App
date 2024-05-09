import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";

const TvReviewPage: React.FC = () => {
  const { state : {tv, review } } = useLocation()
  return (
    <PageTemplate tv={tv}>
      <TvReview {...review} />
    </PageTemplate>
  );
};

export default TvReviewPage;