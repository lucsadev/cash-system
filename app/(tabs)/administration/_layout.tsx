import { Stack } from "expo-router";
import { itemsMenuAdmin } from "../../../constants";
import { HeaderTitle } from "../../../components";

export default function _layout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ headerTitle: () => <HeaderTitle title={'Administración'} />, }}/>
      {itemsMenuAdmin.map((item) => (
        <Stack.Screen
          key={item.name}
          name={item.page}
          options={{ headerTitle: () => <HeaderTitle title={item.name} />, }}
        />
      ))}
      
    </Stack>
  );
}
