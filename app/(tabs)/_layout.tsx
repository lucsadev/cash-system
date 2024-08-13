import { router, Slot, Tabs, usePathname } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { itemsTab, PaymentMethods } from "../../constants";
import { useCashSystemStore } from "../../store";
import { supabase } from "../../supabase";
import { BackHandler } from "react-native";

const today = new Date();

export default function TabRootLayout() {
  const pathname = usePathname();
  const setCurrentPaymentMethods =
    useCashSystemStore.use.setCurrentPaymentMethods();


  const iconLeft = pathname === "/" ? "cash-register" : "";
  const iconRight = pathname === "/" ? "exit-run" : "";
  return (
    <Tabs
      screenOptions={{
        title: today.toLocaleDateString("es-AR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon
            name={iconLeft as any}
            size={32}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => {
              setCurrentPaymentMethods(PaymentMethods.CHANGE_IN_BOX);
              router.navigate("/sales-amount-screen");
            }}
          />
        ),
        headerRight: () => (
          <Icon
            name={iconRight as any}
            size={32}
            color="#b30000ce"
            style={{ marginRight: 10 }}
            onPress={() => {
              supabase.auth.signOut();
              // BackHandler.exitApp();
            }}
          />
        ),
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
            tabBarLabel: item.title,
            tabBarIcon: ({ color }) => (
              <Icon name={item.icon as any} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
