import { ReactNode } from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";

export default function Text(props: {
  children: ReactNode;
  style?: TextStyle;
}) {
  return <RNText style={[styles.text, props.style]}>{props.children}</RNText>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SpaceMono",
  },
});
