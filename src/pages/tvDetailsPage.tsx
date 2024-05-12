import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TvDetails from "../components/TvDetails";
import { TvT} from "../types/interfaces";
import PageTemplate from "../components/templateTvPage";

import { getTv } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const TvDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: tv, error, isLoading, isError } = useQuery<TvT, Error>(
    ["tv", id],
    ()=> getTv(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }


  return (
    <>
      {tv ? (
        <>
        <PageTemplate tv={tv as TvT}> 
          <TvDetails {...tv as TvT} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default TvDetailsPage;