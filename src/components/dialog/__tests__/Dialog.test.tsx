import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Dialog from "../Dialog";

describe("Dialog Component", () => {
  const mockOnClose = jest.fn();
  const title = "Test Dialog Title";
  const bodyContent = "This is the dialog body content";

  it("should render dialog with title and content when open", () => {
    render(
      <Dialog
        title={title}
        onClose={mockOnClose}
        isOpen={true}
        disableFocusTrap
      >
        {bodyContent}
      </Dialog>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(bodyContent)).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    render(
      <Dialog
        title={title}
        onClose={mockOnClose}
        isOpen={false}
        disableFocusTrap
      >
        {bodyContent}
      </Dialog>
    );

    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Dialog
        title={title}
        onClose={mockOnClose}
        isOpen={true}
        disableFocusTrap
      >
        {bodyContent}
      </Dialog>
    );

    const closeButton = screen.getByTestId("dialog-close-button");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicking inside dialog content", async () => {
    const user = userEvent.setup();

    render(
      <Dialog
        title={title}
        onClose={mockOnClose}
        isOpen={true}
        disableFocusTrap
      >
        {bodyContent}
      </Dialog>
    );

    const dialogContent = screen.getByTestId("dialog-content");
    await user.click(dialogContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should render title correctly", () => {
    const customTitle = <span className="text-primary">Custom Title</span>;

    render(
      <Dialog
        title={customTitle}
        onClose={mockOnClose}
        isOpen={true}
        disableFocusTrap
      >
        {bodyContent}
      </Dialog>
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toHaveClass("text-primary");
  });

  it("should render complex complex children correctly", () => {
    const complexChildren = (
      <div>
        <p>Paragraph content</p>
        <button type="button">Action Button</button>
      </div>
    );

    render(
      <Dialog
        title={title}
        onClose={mockOnClose}
        isOpen={true}
        disableFocusTrap
      >
        {complexChildren}
      </Dialog>
    );

    expect(screen.getByText("Paragraph content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Action Button" })
    ).toBeInTheDocument();
  });
});
