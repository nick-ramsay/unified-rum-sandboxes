import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useNavigationContainerRef } from "@react-navigation/native";
import { DatadogProvider, DatadogProviderConfiguration, SdkVerbosity } from "@datadog/mobile-react-native";
import { DdRumReactNavigationTracking } from "@datadog/mobile-react-navigation";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";


// Prevent splash screen from hiding before assets are loaded
SplashScreen.preventAutoHideAsync();

const rumAppId: string = process.env.EXPO_PUBLIC_DATADOG_RUM_APPLICATION_ID || "";
const rumClientToken: string = process.env.EXPO_PUBLIC_DATADOG_RUM_CLIENT_TOKEN || "";

// Datadog configuration
const datadogConfiguration = new DatadogProviderConfiguration(
  rumClientToken,
  "production",
  rumAppId,
  true, // Track user interactions
  true, // Track XHR resources
  true  // Track errors
);
datadogConfiguration.site = "US1";
datadogConfiguration.version = '1.0.0'
datadogConfiguration.nativeCrashReportEnabled = true;
datadogConfiguration.sessionSamplingRate = 100;
datadogConfiguration.resourceTracingSamplingRate = 100;
datadogConfiguration.firstPartyHosts = ['localhost', '10.0.2.2'];
datadogConfiguration.serviceName = "com.example.reactnativemongotemplate";
datadogConfiguration.verbosity = SdkVerbosity.WARN;
datadogConfiguration.nativeInteractionTracking = true;
datadogConfiguration.nativeCrashReportEnabled = true

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (navigationRef.current) {
      DdRumReactNavigationTracking.startTrackingViews(navigationRef);
    }
  }, [navigationRef]);

  if (!loaded) {
    return null;
  }

  return (
    <DatadogProvider configuration={datadogConfiguration}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="webview" />
      </Stack>
      <StatusBar style="auto" />
    </DatadogProvider>

  );
}
