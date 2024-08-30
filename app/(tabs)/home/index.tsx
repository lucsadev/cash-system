import { Redirect } from "expo-router";
import { useAuthStore } from "../../../store";
import { Home } from "../../../components/Sales";

export default function TabSales() {
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  if (!isAuthenticated) return <Redirect href="/authScreen" />;

  return <Home />;
}
