import { router, Slot, Tabs } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { isTablet, itemsTab, PaymentMethods } from "../../constants";
import { useAuthStore, useCashSystemStore } from "../../store";
import { supabase } from "../../supabase";
import { Alert, BackHandler } from "react-native";
import { useEffect } from "react";
import { getMovementsOfTheDay } from "../../supabase/db";
import { HeaderTitle } from "../../components";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function TabRootLayout() {
  const today = useCashSystemStore.use.today();
  const sales = useCashSystemStore.use.sales();
  const setSession = useAuthStore.use.setSession();
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
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "teal",
        headerStyle: {
          elevation: 10,
          shadowColor: "black",
          height: isTablet ? 120 : 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      {itemsTab.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            headerShown: item.headerShown,
            headerTitle: () => <HeaderTitle title={item.title} />,
            headerTitleAlign: "center",
            tabBarLabel: item.title,
            tabBarHideOnKeyboard: true,
            tabBarStyle: { height: isTablet ? 80 : 50 },
            tabBarLabelPosition: "below-icon",
            tabBarLabelStyle: { fontSize: isTablet ? 20 : 10 },
            tabBarIcon: ({ color }) => (
              <Icon
                name={item.icon as any}
                size={isTablet ? 32 : 24}
                color={color}
              />
            ),
            tabBarBadge:
              item.name === "listSales" && sales?.length
                ? sales?.length
                : undefined,
            tabBarBadgeStyle: {
              backgroundColor: "#ef4444cc",
            },
          }}
        />
      ))}
    </Tabs>
  );
}
