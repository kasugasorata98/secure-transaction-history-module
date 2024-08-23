import Text from "@/components/Text";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import useBiometricAuthentication from "@/hooks/useBiometricAuthentication";
import {
  AUTHENTICATED_USER,
  REGISTERED_USER_CREDS,
} from "@/constants/AsyncStorageKeys";
import { verifyPassword } from "@/utils/bcryptUtils";

export default function LoginScreen() {
  const params = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useBiometricAuthentication();

  const handleAuthentication = async () => {
    const result = await authenticate();
    if (result && result.success) {
      Toast.show("Authentication successful!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      router.replace("/transaction-history");
    } else {
      Toast.show("Authentication failed or canceled.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      router.replace("/");
      router.push("/login");
    }
  };

  useEffect(() => {
    if (params.isAuthenticated === "TRUE") {
      handleAuthentication();
    }
  }, []);

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
        <Button
          onPress={async () => {
            if (!(email && password)) {
              Toast.show("Make sure that email and password is enterered", {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
              });
              return;
            }
            AsyncStorage.getItem(REGISTERED_USER_CREDS)
              .then((stringJson) => {
                if (stringJson) {
                  return JSON.parse(stringJson);
                }
              })
              .then(
                async (
                  credentials: Array<{ email: string; password: string }>
                ) => {
                  if (!credentials) {
                    Toast.show("Please register first", {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.CENTER,
                    });
                  } else {
                    const credential = credentials.find(
                      (credential) => credential.email === email
                    );
                    if (
                      credential &&
                      verifyPassword(password, credential.password)
                    ) {
                      await AsyncStorage.setItem(AUTHENTICATED_USER, email);
                      router.push("/transaction-history");
                    } else {
                      Toast.show("Invalid email or password", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                      });
                    }
                  }
                }
              );
          }}
          title="Confirm"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
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
