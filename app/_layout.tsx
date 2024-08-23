import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import { TransactionProvider } from "@/context/TransactionContext";
import { AUTHENTICATED_USER } from "@/constants/AsyncStorageKeys";

import { LogBox } from "react-native";

// Ignore specific warnings
LogBox.ignoreLogs([
  "Using Math.random is not cryptographically secure! Use bcrypt.setRandomFallback to set a PRNG.",
]);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { getItem } = useAsyncStorage(AUTHENTICATED_USER);

  useEffect(() => {
    if (loaded) {
      getItem()
        .then((authenticatedUser) => {
          if (authenticatedUser) {
            router.replace({
              pathname: "/login",
              params: {
                isAuthenticated: "TRUE",
              },
            });
          }
        })
        .finally(() => SplashScreen.hideAsync());
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  async function logout() {
    await AsyncStorage.removeItem(AUTHENTICATED_USER);
    router.replace("/");
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <RootSiblingParent>
        <TransactionProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerShown: false, title: "Welcome" }}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: true, title: "Login" }}
            />
            <Stack.Screen
              name="register"
              options={{ headerShown: true, title: "Register" }}
            />
            <Stack.Screen
              name="transaction-history"
              options={{
                headerShown: true,
                headerBackVisible: false,
                title: "Transaction History",
                headerRight: () => {
                  return <Button title="Logout" onPress={logout} />;
                },
              }}
            />
            <Stack.Screen
              name="transaction-details"
              options={{ headerShown: true, title: "Transaction Details" }}
            />
          </Stack>
        </TransactionProvider>
      </RootSiblingParent>
    </ThemeProvider>
  );
}
