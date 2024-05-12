import type { Meta, StoryObj } from '@storybook/react';
import TvHeader from "../components/headerTv";
import SampleTv from "./sampleDataTv";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "Tv Details Page/Tv Header",
    component: TvHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof TvHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        ...SampleTv
    }
};
Basic.storyName = "Default";