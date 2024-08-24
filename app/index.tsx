import Button from "@/components/Button";
import Text from "@/components/Text";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function WelcomeScreen() {
  function createAnAccount() {
    router.push("/register");
  }

  function login() {
    router.push("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{`Secure Transaction History`}</Text>
      <View style={styles.linkContainer}>
        <Button style={styles.buttons} onPress={createAnAccount}>
          <Text>Create an account</Text>
        </Button>
        <Button style={styles.buttons} onPress={login}>
          <Text>Login</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  linkContainer: {
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttons: {
    width: 200,
  },
});
