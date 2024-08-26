import { Alert } from "react-native";
import type { ProfileType } from "../types/db";
import { supabase } from "../supabase";

export const deleteUser = (user: ProfileType, users: ProfileType[]) => {
  try {
    const usersAdmin = users?.filter((el) => el.role === "ADMIN");
    if (usersAdmin.length > 1 || user.role !== "ADMIN") {
      Alert.alert("Eliminar", "¿Seguro que desea eliminar el usuario?", [
        {
          text: "No",
        },
        {
          text: "Si",
          onPress: async () => {
            try {
              const { error } = await supabase.rpc("deleteUser", {
                userid: user.id,
              });
              if (error) throw error;
            } catch (error: any) {
              Alert.alert("Error", error?.message || error, [
                { text: "Aceptar" },
              ]);
            }
          },
        },
      ]);
    } else
      Alert.alert(
        "Error",
        "No se puede dejar la App sin usuarios Administradores",
        [{ text: "Aceptar" }]
      );
  } catch (error: any) {
    Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
  }
};
