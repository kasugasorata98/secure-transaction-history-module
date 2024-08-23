import * as LocalAuthentication from "expo-local-authentication";
import Toast from "react-native-root-toast";

const useBiometricAuthentication = () => {
  const authenticate = async (): Promise<
    LocalAuthentication.LocalAuthenticationResult | undefined
  > => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with biometrics",
        });
        return result;
      } else {
        Toast.show("Biometric authentication not available or not set up.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Toast.show("An error occurred during authentication.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
  };

  return { authenticate };
};

export default useBiometricAuthentication;
