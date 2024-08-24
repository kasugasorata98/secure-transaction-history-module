import { Text as RNText, StyleSheet, TextProps } from "react-native";

export default function Text({ style, children, ...rest }: TextProps) {
  return (
    <RNText {...rest} style={[styles.text, style]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SpaceMono",
  },
});
