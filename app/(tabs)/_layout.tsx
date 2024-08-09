import { Slot, Tabs } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { itemsTab } from "@/constants";

export default function TabRootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "teal",
        headerTitleStyle: { fontWeight: "bold" },
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
            title: item.title,
            headerShown: item.headerShown,
            tabBarIcon: ({ color }) => (
              <Icon name={item.icon as any} size={24} color={color} />
            ),
          }}
        />
      ))}      
    </Tabs>
  );
}
