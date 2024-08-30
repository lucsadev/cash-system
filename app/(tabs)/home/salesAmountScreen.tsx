import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { HeaderTitle } from "../../../components";
import { PaymentMethods, KEYS } from "../../../constants";
import { useCashSystemStore } from "../../../store";
import { SalesAmountPage } from "../../../components/Sales";


export default function SalesAmountScreen() {
  const CurrentPaymentMethods = useCashSystemStore.use.CurrentPaymentMethods();
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle
          title={
            CurrentPaymentMethods !== PaymentMethods.CHANGE_IN_BOX
              ? "Forma de pago:"
              : CurrentPaymentMethods
          }
          subtitle={
            CurrentPaymentMethods !== PaymentMethods.CHANGE_IN_BOX
              ? CurrentPaymentMethods
              : ""
          }
        />
      ),
    });
  }, [CurrentPaymentMethods]);

  return <SalesAmountPage/>
}
