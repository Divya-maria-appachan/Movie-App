import React from "react";
import PageTemplate from "../components/templateTvPage";
import ReviewForm from "../components/reviewFormTv";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { TvT } from "../types/interfaces";

const WriteTvReviewPage: React.FC = () => {
    const location = useLocation()
    const { tvId } = location.state;
    const { data: tv, error, isLoading, isError } = useQuery<TvT, Error>(
        ["tv", tvId],
        () => getTv(tvId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tv ? (
                    <PageTemplate tv={tv}>
                        <ReviewForm {...tv} />
                    </PageTemplate>
            ) : (
                <p>Waiting for Tv Show review details</p>
            )}
        </>
    );
};

export default WriteTvReviewPage;