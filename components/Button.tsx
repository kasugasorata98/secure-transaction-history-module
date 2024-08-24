import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export default function Button({ children, ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest} style={[styles.container, rest.style]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
  },
});
