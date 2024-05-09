import type { Meta, StoryObj } from '@storybook/react';
import TvDetails from "../components/TvDetails";
import SampleTv from "./sampleDataTv";
import { MemoryRouter } from "react-router";
import TvsContextProvider from "../contexts/tvsContext";

const meta = {
    title: "Tv Details Page/Tv Details",
    component: TvDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <TvsContextProvider>{Story()}</TvsContextProvider>,
      ],
} satisfies Meta<typeof TvDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleTv
};
Basic.storyName = "Default";