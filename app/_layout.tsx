import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useAuthStore } from "../store";
import type { ProfileType } from "../types/db";
import { theme } from "../theme";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname();
/*   const setSession = useAuthStore.use.setSession();
  const setProfile = useAuthStore.use.setProfile();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setProfile(session ? (session.user?.user_metadata as ProfileType) : null);
    });
  }, []); */


  return (
    <PaperProvider theme={theme}>
      <ToastProvider
        duration={1000}
        textStyle={{ fontSize: 20, color: "#000" }}
        successColor="#22c55eca"
        dangerColor="#ef4444ca"
        normalColor="#0369a177"
        offsetBottom={60}
        swipeEnabled={true}
      >
        <Stack
          screenOptions={{
            headerShown: pathname !== "/salesAmountScreen" ? false : true,
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="authScreen" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="salesAmountScreen" />
        </Stack>
      </ToastProvider>
    </PaperProvider>
  );
}
