import React from "react";
import { TvCredit } from "../../types/interfaces";

const TvCreditComponent: React.FC<TvCredit> = (props) => {
  return (
    <>
      <p>Actor: {props.name}</p>
      <p>Character: {props.character}</p>
    </>
  );
};

export default TvCreditComponent;