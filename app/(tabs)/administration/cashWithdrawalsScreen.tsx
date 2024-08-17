import { View } from "react-native";
import { globalStyles } from "../../../theme/globalStyles";
import { CashWithdrawalsForm, CashWithdrawalsList } from "../../../components";

export default function CashWithdrawalsScreen() {
  return (
    <View style={globalStyles.pageContainer}>
      <CashWithdrawalsForm />
      <CashWithdrawalsList />
    </View>
  );
}
