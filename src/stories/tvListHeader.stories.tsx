import type { Meta, StoryObj } from '@storybook/react';
import TvListHeader from "../components/headerTvList";
import { MemoryRouter } from "react-router";
import TvsContextProvider from "../contexts/tvsContext";


const meta = {
    title: 'Tv Page/Header',
    component: TvListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <TvsContextProvider>{Story()}</TvsContextProvider>,
    ],
  } satisfies Meta<typeof TvListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ name:'Discover Movies'}

};
Basic.storyName = "Default";