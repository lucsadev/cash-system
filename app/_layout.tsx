import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useAuthStore } from "../store";
import type { ProfileType } from "../types/db";
import { theme } from "../theme";

export { ErrorBoundary } from "expo-router";


export default function RootLayout() {
  const pathname = usePathname();
  const setSession = useAuthStore.use.setSession();
  const setProfile = useAuthStore.use.setProfile();

    useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setProfile(session ? (session.user?.user_metadata as ProfileType) : null);
    });
  }, []);
  
  

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: pathname !== "/sales-amount-screen" ? false : true,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="auth-screen" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="sales-amount-screen" />
      </Stack>
    </PaperProvider>
  );
}
