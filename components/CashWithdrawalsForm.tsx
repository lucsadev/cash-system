import { useRef, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useAuthStore, useCashSystemStore } from "../store";
import { Button, TextInput, useTheme } from "react-native-paper";
import { supabase } from '../supabase';

export function CashWithdrawalsForm() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("Retiro");
    const userId = useAuthStore.use.profile()?.id;
    const day = useCashSystemStore.use.dayId();
    const cashAvailable = useCashSystemStore.use.cashAvailable();
    const theme = useTheme();
    const inputRef = useRef(null);
    const toast = useToast();

    const save = async () => {
        try {
          if (!amount || !description)
            return toast.show("La descripción y el importe son requeridos", {
              type: "warning",
            });
    
          if (+amount > cashAvailable)
            return Alert.alert(
              "",
              "El monto ingresado es mayor que el dinero disponible en caja",
              [{ text: "Aceptar" }]
            );
    
          const { error } = await supabase
            .from("cashWithdrawals")
            .insert([{ amount, description, userId, day }]);
    
          if (error) throw error;
    
          setAmount("");
    
          toast.show("Operación Realizada con éxito", { type: "success" });
        } catch (error: any) {
          Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
        }
      };
         
  return (
    <View>
      <View>
          <Text>Descripción</Text>
          <TextInput
            mode="outlined"
            enterKeyHint="next"
            enablesReturnKeyAutomatically={true}
            autoCapitalize="words"
            inputMode="text"
            value={description}
            onChangeText={setDescription}
            //@ts-ignore
            onSubmitEditing={() => inputRef.current?.focus()}
            style={styles.input}
          />
        </View>
        <View>
          <Text>Importe</Text>
          <TextInput
            ref={inputRef}
            autoFocus={true}
            mode="outlined"
            enterKeyHint="done"
            enablesReturnKeyAutomatically={true}
            inputMode="numeric"
            value={amount}
            onChangeText={setAmount}
            onSubmitEditing={save}
            keyboardType="numeric"
            style={[styles.input, { textAlign: "right" }]}
          />
        </View>
        <Button
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          mode="elevated"
          onPress={save}
          style={{ borderRadius: 5 }}
          labelStyle={{ fontSize: 18 }}
          contentStyle={{ height: 45 }}
        >
          Enviar
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
      marginBottom: 10,
      fontSize: 20,
      height: 45,
      fontWeight: "bold",
    },
  });
  