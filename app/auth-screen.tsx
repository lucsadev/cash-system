import { StyleSheet, View } from "react-native";
import { UserInputForm } from "../components";
import { Text, TextInput } from "react-native-paper";
import { supabase } from "../supabase";
import { useAuthStore, useCashSystemStore } from "../store";
import type{ ProfileType } from "../types/db";
import { router } from "expo-router";
import { getMovementsOfTheDay } from "../supabase/db";



export default function SalesAmountPage() {
  const setSession = useAuthStore.use.setSession();
  const setProfile = useAuthStore.use.setProfile();
  const today = useCashSystemStore.use.today();
  const setMovementsOfTheDay = useCashSystemStore.use.setMovementsOfTheDay();

  
  const login = ( { userName, password }: { userName: string; password: string }) => 
    supabase.auth
        .signInWithPassword({ email:`${userName}@${userName}`, password })
        .then(({ data: { session, user } }) => {
          setSession(session);
          setProfile(user?.user_metadata as ProfileType);
          getMovementsOfTheDay(today).then(setMovementsOfTheDay)
          router.push("/(tabs)");
        });

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Iniciar sesión
      </Text>
      <UserInputForm login={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8cada053",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

