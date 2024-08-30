import { Text, View } from "react-native";
import { AdministrationMenu } from "../../../components/AdministrationMenu";
import { useAuthStore } from "../../../store";

export default function TabAdministration() {
  const profile = useAuthStore.use.profile();

  if (profile?.role !== "ADMIN")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "bold",color: "red" }}>
          Sección restringida
        </Text>
      </View>
    );

  return <AdministrationMenu />;
}
