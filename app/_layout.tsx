import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { WAITER_THEME } from "../constants/theme";
import { WaiterProvider, useWaiter } from "../context/WaiterContext";

function AppHydrationGuard() {
  const { isReady } = useWaiter();

  // Show a loading screen until AsyncStorage is fully loaded
  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WAITER_THEME.backgroundDark,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={WAITER_THEME.primary} />
      </View>
    );
  }

  // Load the actual screens once ready
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

// Ensure the Provider is the absolute root wrapper
export default function RootLayout() {
  return (
    <WaiterProvider>
      <AppHydrationGuard />
    </WaiterProvider>
  );
}
