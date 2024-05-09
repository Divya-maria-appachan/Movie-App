import React from "react";
import Tv from "../tvCard/";
import Grid from "@mui/material/Grid";
import { ListedTv } from "../../types/interfaces";

interface TvListProps {
  tvs: ListedTv[],
  action: (m: ListedTv) => React.ReactNode;
}

const TvList: React.FC<TvListProps> = (props) => {
  const tvs=props.tvs;
  let tvCards = tvs.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Tv key={m.id} tv={m}  action={props.action}/>
    </Grid>
  ));
  return tvCards;
}

  export default TvList;