import Button from "@/components/Button";
import Text from "@/components/Text";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

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
          <Button style={styles.buttons} onPress={createAnAccount}>
            <Text>Create an account</Text>
          </Button>
          <Button style={styles.buttons} onPress={login}>
            <Text>Login</Text>
          </Button>
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
    gap: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  buttons: {
    width: 200,
  },
});
