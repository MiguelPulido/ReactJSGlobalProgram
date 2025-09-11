import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../Counter";

import "@testing-library/jest-dom";

describe("Counter Component", () => {
  test("renders initial value provided in props", () => {
    const initialValue = 7;
    render(<Counter initialValue={initialValue} />);
    expect(
      screen.getByText(initialValue.toString(), { selector: "span" })
    ).toBeInTheDocument();
  });

  test("click event on decrement button decrements the displayed value", async () => {
    const user = userEvent.setup();
    const initialValue = 10;
    render(<Counter initialValue={initialValue} />);

    const decrementButton = screen.getByRole("button", { name: "-" });

    await user.click(decrementButton);

    expect(screen.getByText((initialValue - 1).toString())).toBeInTheDocument();
    expect(screen.queryByText(initialValue.toString())).not.toBeInTheDocument();
  });

  test("click event on increment button increments the displayed value", async () => {
    const user = userEvent.setup();
    const initialValue = 3;
    render(<Counter initialValue={initialValue} />);

    const incrementButton = screen.getByRole("button", { name: "+" });

    await user.click(incrementButton);

    expect(screen.getByText((initialValue + 1).toString())).toBeInTheDocument();
    expect(screen.queryByText(initialValue.toString())).not.toBeInTheDocument();
  });

  test("multiple clicks work correctly", async () => {
    const user = userEvent.setup();
    const initialValue = 3;
    let currentValue = initialValue;
    render(<Counter initialValue={initialValue} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    const decrementButton = screen.getByRole("button", { name: "-" });

    expect(screen.getByText(initialValue.toString())).toBeInTheDocument();

    await user.click(incrementButton);
    expect(screen.queryByText(currentValue.toString())).not.toBeInTheDocument();
    currentValue += 1;
    expect(screen.getByText(currentValue.toString())).toBeInTheDocument();

    await user.click(incrementButton);
    expect(screen.queryByText(currentValue.toString())).not.toBeInTheDocument();
    currentValue += 1;
    expect(screen.getByText(currentValue.toString())).toBeInTheDocument();

    await user.click(decrementButton);
    expect(screen.queryByText(currentValue.toString())).not.toBeInTheDocument();
    currentValue -= 1;
    expect(screen.getByText(currentValue.toString())).toBeInTheDocument();

    await user.click(incrementButton);
    expect(screen.queryByText(currentValue.toString())).not.toBeInTheDocument();
    currentValue += 1;
    expect(screen.getByText(currentValue.toString())).toBeInTheDocument();
  });

  test("can handle negative values", async () => {
    const user = userEvent.setup();
    const initialValue = -1;
    render(<Counter initialValue={initialValue} />);

    const decrementButton = screen.getByRole("button", { name: "-" });

    await user.click(decrementButton);
    await user.click(decrementButton);
    const currentValue = initialValue - 2;

    expect(screen.getByText(currentValue.toString())).toBeInTheDocument();
  });
});
