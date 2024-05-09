import type { Meta, StoryObj } from '@storybook/react';
import TvCard from "../components/tvCard";
import SampleTv from "./sampleDataTv";
import { MemoryRouter } from "react-router";
import TvsContextProvider from "../contexts/tvsContext";
import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIconsTv/addToFavourites";
import React from 'react';

const meta = {
  title: 'Tvs/TvCard',
  component: TvCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvsContextProvider>{Story()}</TvsContextProvider>,
  ],
} satisfies Meta<typeof TvCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (tv ) => <AddToFavouritesIcon {...tv} />,
    tv: SampleTv,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleTv, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    tv: sampleNoPoster,
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
  }
};
Exceptional.storyName = "Exception";