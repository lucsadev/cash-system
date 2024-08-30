import { View } from "react-native";
import { CashWithdrawalsForm, CashWithdrawalsList } from "../../../components";
import { isTablet } from "../../../constants";

export default function CashWithdrawalsScreen() {
  return (
    <View
      style={{
        flex: 1,
        width: isTablet ? "70%" : "94%",
        marginHorizontal: "auto",
        marginTop: 10,
      }}
    >
      <CashWithdrawalsForm />
      <CashWithdrawalsList />
    </View>
  );
}
