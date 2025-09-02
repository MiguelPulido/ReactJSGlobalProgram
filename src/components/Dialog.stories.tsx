import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./Dialog";

const meta = {
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClose = () => {
  console.log("Dialog closed");
};

export const Default: Story = {
  args: {
    title: "Sample Dialog",
    isOpen: true,
    onClose: handleClose,
    children: (
      <div className="p-3">
        <p>This is a sample dialog content.</p>
        <p>It can contain any React components or HTML elements.</p>
      </div>
    ),
  },
};

export const WithComplexTitle: Story = {
  args: {
    title: (
      <div className="d-flex align-items-center">
        <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
        <span>Warning Dialog</span>
      </div>
    ),
    isOpen: true,
    onClose: handleClose,
    children: (
      <div className="p-3">
        <p className="mb-3">This dialog has a complex title with an icon.</p>
        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="button" className="btn btn-warning">
            Confirm
          </button>
        </div>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    title: "Closed Dialog",
    isOpen: false,
    onClose: handleClose,
    children: <div>This content will not be visible</div>,
  },
};
