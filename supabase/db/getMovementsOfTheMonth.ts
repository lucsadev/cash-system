import { Alert } from "react-native";
import { supabase } from "..";
import { PurchaseSaleType } from "../../types/data";

export const getMovementsOfTheMonth = async (date: string) => {
    try {
      const { data, error } = await supabase
        .from("movementsOfTheDay")
        .select(
          `    
      sales (
        amount,typeOfPayment,profiles(username)
      ),
      
      purchases (
        amount,typeOfPayment,profiles(username)
      )
    `
        )
        .like("date", `%-${date}`);
      if (error) throw new Error(error as any);
  
      return data as PurchaseSaleType[];
    } catch (error: any) {
      Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
    }
  };