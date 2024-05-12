import type { Meta } from '@storybook/react';
import TvList from "../components/tvList";
import SampleTv from "./sampleDataTv";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIconsTv/addToFavourites";
import Grid from "@mui/material/Grid";
import TvsContextProvider from "../contexts/tvsContext";


const meta = {
  title: "TV Page/TvList",
  component: TvList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <TvsContextProvider><Story /></TvsContextProvider>,
    ],
    
} satisfies Meta<typeof TvList>;
export default meta;


export const Basic = () => {
  const tvs = [
    { ...SampleTv , id: 1 },
    { ...SampleTv , id: 2 },
    { ...SampleTv , id: 3 },
    { ...SampleTv , id: 4 },
    { ...SampleTv , id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TvList
        tvs={tvs}
        action={(tv) => <AddToFavouritesIcon {...tv} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


