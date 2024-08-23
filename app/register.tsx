import Text from "@/components/Text";
import {
  AUTHENTICATED_USER,
  REGISTERED_USER_CREDS,
} from "@/constants/AsyncStorageKeys";
import { Colors } from "@/constants/Colors";
import { isValidEmail } from "@/utils/validationUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isFieldDateValid() {
    if (!(email && password)) {
      Toast.show("Make sure that email and password is entered", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      return false;
    }
    if (!isValidEmail(email)) {
      Toast.show("Email is invalid", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      return false;
    }
    return true;
  }

  function onConfirm() {
    if (!isFieldDateValid()) return;

    AsyncStorage.getItem(REGISTERED_USER_CREDS)
      .then((stringJson) => {
        if (stringJson) {
          return JSON.parse(stringJson);
        }
      })
      .then(async (data: Array<{ email: string; password: string }>) => {
        if (!data) {
          await AsyncStorage.setItem(
            REGISTERED_USER_CREDS,
            JSON.stringify([{ email, password }])
          );
        } else {
          data.push({
            email,
            password,
          });
          await AsyncStorage.setItem(
            REGISTERED_USER_CREDS,
            JSON.stringify(data)
          );
        }
        await AsyncStorage.setItem(AUTHENTICATED_USER, email);

        setTimeout(async () => {
          router.replace("/transaction-history");
        }, 1000);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.emailContainer}>
          <Text>Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            style={styles.input}
            placeholder="example@gmail.com"
            inputMode="email"
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View>
        <Button onPress={onConfirm} title="Confirm" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  input: {
    fontFamily: "SpaceMono",
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    borderColor: Colors.DARK_GRAY,
    marginTop: 5,
  },
  emailContainer: {
    marginBottom: 10,
  },
});
