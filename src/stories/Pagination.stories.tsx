import React from 'react';
import { Meta } from '@storybook/react';
import Pagination from '../components/Pagination';
import{ PaginationProps} from '../components/Pagination'; // Adjust import if necessary

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta;

const Template: React.FC<PaginationProps> = (args) => <Pagination {...args} />;

export const Default: React.FC<PaginationProps> = Template.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: (pageNumber: number) => {
    console.log(`Page changed to: ${pageNumber}`);
  },
};
