import { router, Stack } from "expo-router";
import { HeaderTitle } from "../../../components";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore, useCashSystemStore } from "../../../store";
import { PaymentMethods } from "../../../constants";
import { supabase } from "../../../supabase";
import { BackHandler } from "react-native";

export default function _layout() {
  const setCurrentPaymentMethods =
    useCashSystemStore.use.setCurrentPaymentMethods();
  const setSession = useAuthStore.use.setSession();

  const onPressLeftIcon = () => {
    setCurrentPaymentMethods(PaymentMethods.CHANGE_IN_BOX);
    router.navigate("/home/salesAmountScreen");
  };

  const onPressRightIcon = () => {
    supabase.auth.signOut();
    setSession(null);
    BackHandler.exitApp();
  };

  const iconLeft = () => (
    <Icon
      name="cash-register"
      size={32}
      color="black"
      style={{ marginLeft: 10 }}
      onPress={onPressLeftIcon}
    />
  );

  const iconRight = () => (
    <Icon
      name="exit-run"
      size={32}
      color="#b30000ce"
      style={{ marginRight: 10 }}
      onPress={onPressRightIcon}
    />
  );

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <HeaderTitle title={"Ventas"} />,
          headerLeft: iconLeft,
          headerRight: iconRight,
        }}
      />
      <Stack.Screen
        name="salesAmountScreen"
        options={{
          headerTitle: () => <HeaderTitle title={"Forma de Pago"} />,
        }}
      />
    </Stack>
  );
}
