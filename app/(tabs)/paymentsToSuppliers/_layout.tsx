import { router, Stack, usePathname } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { HeaderTitle } from "../../../components";

export default function _layout() {
const pathname = usePathname();

  const iconRight = () => (
    <Icon
      name={pathname === "/paymentsToSuppliers" ? "format-list-bulleted" : ("" as any)}
      size={32}
      style={{ marginRight: 10 }}
      onPress={onPressRightIcon}
    />
  );

  const onPressRightIcon = () => {
    router.push("/paymentsToSuppliers/listPaymentsToSuppliers");
  };

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <HeaderTitle title={"Pago a proveedores"} />,
          headerRight: iconRight,
        }}
      />
      <Stack.Screen
        name="listPaymentsToSuppliers"
        options={{
          headerTitle: () => <HeaderTitle title={"Listado de Pagos"} />,          
        }}
      />     
    </Stack>
  );
}
