import { router, Slot, Tabs, usePathname } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { itemsTab, PaymentMethods } from "../../constants";
import { useCashSystemStore } from "../../store";
import { supabase } from "../../supabase";
import { Alert, BackHandler } from "react-native";
import { useEffect } from "react";
import { getMovementsOfTheDay } from "../../supabase/db";
import { HeaderTitle } from "../../components";

export default function TabRootLayout() {
  const pathname = usePathname();
  const today = useCashSystemStore.use.today();
  const sales = useCashSystemStore.use.sales();
  const setMovementsOfTheDay = useCashSystemStore.use.setMovementsOfTheDay();
  const setCurrentPaymentMethods =
    useCashSystemStore.use.setCurrentPaymentMethods();

  useEffect(() => {
    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sales",
        },
        () =>
          getMovementsOfTheDay(today)
            .then(setMovementsOfTheDay)
            .catch((error) =>
              Alert.alert("Error", error?.message || error, [
                { text: "Aceptar" },
              ])
            )
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "movementsOfTheDay",
        },
        () =>
          getMovementsOfTheDay(today)
            .then(setMovementsOfTheDay)
            .catch((error) =>
              Alert.alert("Error", error?.message || error, [
                { text: "Aceptar" },
              ])
            )
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "purchases",
        },
        () =>
          getMovementsOfTheDay(today)
            .then(setMovementsOfTheDay)
            .catch((error) =>
              Alert.alert("Error", error?.message || error, [
                { text: "Aceptar" },
              ])
            )
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cashWithdrawals",
        },
        () =>
          getMovementsOfTheDay(today)
            .then(setMovementsOfTheDay)
            .catch((error) =>
              Alert.alert("Error", error?.message || error, [
                { text: "Aceptar" },
              ])
            )
      )
      .subscribe();
  }, [today]);

  const onPressLeftIcon = () => {
    setCurrentPaymentMethods(PaymentMethods.CHANGE_IN_BOX);
    router.navigate("/salesAmountScreen");
  };

  const onPressRightIcon = () => {
    if (pathname === "/") {
      supabase.auth.signOut();
      BackHandler.exitApp();
    }
  };

  const iconLeft = () => (
    <Icon
      name={pathname === "/" ? "cash-register" : ("" as any)}
      size={32}
      color="black"
      style={{ marginLeft: 10 }}
      onPress={onPressLeftIcon}
    />
  );

  const iconRight = () => (
    <Icon
      name={pathname === "/" ? "exit-run" : ("" as any)}
      size={32}
      color="#b30000ce"
      style={{ marginRight: 10 }}
      onPress={onPressRightIcon}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "teal",
        headerStyle: {
          elevation: 10,
          shadowColor: "black",
        },
      }}
    >
      {itemsTab.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            headerShown: item.headerShown,
            headerTitle: () => <HeaderTitle title={item.title} />,
            headerTitleAlign: "center",
            tabBarLabel: item.title,
            tabBarIcon: ({ color }) => (
              <Icon name={item.icon as any} size={24} color={color} />
            ),
            tabBarBadge:
              item.name === "listSales" && sales?.length
                ? sales?.length
                : undefined,
            tabBarBadgeStyle: { backgroundColor: "#ef4444cc" },
            headerLeft: iconLeft,
            headerRight: iconRight,
          }}
        />
      ))}
    </Tabs>
  );
}
