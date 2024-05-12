import React from 'react';
import { Meta, Story } from '@storybook/react';
import MovieForm, { MovieFormProps } from '../components/MovieForm';

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
} as Meta;

const Template: Story<MovieFormProps> = (args) => <MovieForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  formData: {
    title: '',
    overview: '',
    genres: '',
    releaseDate: '',
    runtime: '',
    productionCompanies: '',
    cast: [],
    poster: null,
  },
  handleChange: () => {},
  handleCastChange: () => {},
  handleAddCastMember: () => {},
  handleRemoveCastMember: () => {},
  handleSubmit: () => {},
  handlePosterChange: () => {},
};
