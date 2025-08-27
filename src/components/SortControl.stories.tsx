import type { Meta, StoryObj } from '@storybook/react-vite';

import { SortControl } from './SortControl';

const meta = {
  component: SortControl,
} satisfies Meta<typeof SortControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentSort: "Release Date",
    onSortChange: () => {}
  }
};