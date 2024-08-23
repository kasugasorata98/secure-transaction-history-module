import React from "react";
import { render } from "@testing-library/react-native";
import Text from "./Text";

describe("Text Component", () => {
  it("should render the text with the SpaceMono font", () => {
    const { getByText } = render(<Text>Hello World</Text>);
    const textElement = getByText("Hello World");

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontFamily: "SpaceMono" }),
      ])
    );
  });

  it("should apply additional styles passed through the style prop", () => {
    const { getByText } = render(
      <Text style={{ color: "red", fontSize: 20 }}>Styled Text</Text>
    );
    const textElement = getByText("Styled Text");

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontFamily: "SpaceMono" }),
        expect.objectContaining({ color: "red" }),
        expect.objectContaining({ fontSize: 20 }),
      ])
    );
  });

  it("should render the children correctly", () => {
    const { getByText } = render(<Text>Test Children</Text>);
    expect(getByText("Test Children")).toBeTruthy();
  });
});
