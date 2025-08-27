import type { Meta, StoryObj } from '@storybook/react-vite';

import MovieList from './MovieList';

const meta = {
  component: MovieList,
} satisfies Meta<typeof MovieList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movies: []
  }
};