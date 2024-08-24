import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./Button";
import Text from "./Text";

describe("Button Component", () => {
  it("renders correctly with default style and children", () => {
    const { getByText } = render(
      <Button>
        <Text>Click Me</Text>
      </Button>
    );

    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress function when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress}>
        <Text>Press Me</Text>
      </Button>
    );

    fireEvent.press(getByText("Press Me"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
