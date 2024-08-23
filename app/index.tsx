import Text from "@/components/Text";
import { router } from "expo-router";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function WelcomeScreen() {
  function createAnAccount() {
    router.push("/register");
  }

  function login() {
    router.push("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.headerText}>
          {`Discover the bank\nthat lives in your pocket`}
        </Text>
        <View style={styles.linkContainer}>
          <Button title="Create an account" onPress={createAnAccount} />
          <Button title="Login" onPress={login} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
  },
  scrollViewContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 20,
  },
  linkContainer: {
    alignItems: "center",
  },
});
