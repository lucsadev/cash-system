import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useAuthStore, useCashSystemStore } from "../../../store";
import { supabase } from "../../../supabase";
import { KEYS_Shopping, PaymentMethods } from "../../../constants";
import { globalStyles } from "../../../theme/globalStyles";
import { FAB } from "react-native-paper";
import { ModalQuickDescription } from "../../../components";
import { quickDescription, QuickDescriptionType } from "../../../types/db";

const { pageContainer, displayText, displayContainer } = globalStyles;
const baseURL =
  "https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/descriptionsQuick/";

export default function PaymentsToSuppliersScreen() {
  const [description, setDescription] = useState("Varios");
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const userId = useAuthStore.use.profile()?.id;
  const cashAvailable = useCashSystemStore.use.cashAvailable();
  const quickDescriptions = useCashSystemStore.use.quickDescriptions();
  const deleteQuickDescription =
    useCashSystemStore.use.deleteQuickDescription();
  const dayId = useCashSystemStore.use.dayId();
  const toast = useToast();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePress = (value: string) => {
    if (value === "🗑️") return setAmount("");
    if (value === "." && amount.includes(".")) return;
    if (amount.includes(".") && amount.slice(amount.indexOf(".")).length > 2)
      return;

    amount.length < 12 && setAmount((prev) => (prev += value));
  };

  const handleSave = async (val: string) => {
    try {
      if (!amount || !description)
        return toast.show("La descripción y el importe son requeridos", {
          type: "warning",
        });
      const typeOfPayment =
        val === "💵" ? PaymentMethods.CASH : PaymentMethods.OTHERS;

      if (+amount > cashAvailable && typeOfPayment === PaymentMethods.CASH)
        return Alert.alert(
          "",
          "No hay suficiente efectivo en caja para realizar el pago",
          [{ text: "Aceptar" }]
        );
      const { error } = await supabase
        .from("purchases")
        .insert([{ amount, description, userId, day: dayId, typeOfPayment }]);
      if (error) throw error;

      setAmount("");

      toast.show("Operación Realizada con éxito", { type: "success" });
    } catch (error) {
      toast.show(`Operación no realizada, Error: ${error}`, { type: "danger" });
    }
  };

  const handleDeleteQuickDescription = async (
    quickDescription: QuickDescriptionType
  ) => {
    try {
      const { error } = await supabase
        .from("quickDescription")
        .delete()
        .eq("id", quickDescription.id);

      if (error) throw error;

      const { error: errorStorage } = await supabase.storage
        .from("images")
        .remove(["descriptionsQuick/" + quickDescription.description]);

      if (errorStorage) throw errorStorage;

      deleteQuickDescription(quickDescription.id);
    } catch (error: any) {
      toast.show(`Operación no realizada, Error: ${error.message}`, {
        type: "danger",
      });
    }
  };

  return (
    <View style={pageContainer}>
      <View style={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              autoCapitalize="words"
              inputMode="text"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
          </View>
          <View
            style={[displayContainer, { width: "94%", marginVertical: 10 }]}
          >
            <Text style={displayText}>{amount}</Text>
          </View>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              display: isKeyboardVisible ? "none" : "flex",
            },
          ]}
        >
          {KEYS_Shopping?.map((el) => (
            <Pressable
              key={el}
              style={({ pressed }) => [
                styles.button,
                {
                  elevation: pressed ? 0 : 5,
                },
              ]}
              onPress={() =>
                ["💵", "🪙"].includes(el) ? handleSave(el) : handlePress(el)
              }
            >
              <Text style={styles.textButton}>{el}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={{ gap: 5 }}>
        {!!quickDescriptions.length && (
          <Text style={styles.label}>Descripciones rápidas</Text>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickDescriptionContainer}
        >
          {!!quickDescriptions.length &&
            quickDescriptions.map((el) => (
              <Pressable
                key={el.id}
                style={({ pressed }) => [
                  styles.buttonQuickDescription,
                  {
                    elevation: pressed ? 0 : 3,
                  },
                ]}
                onPress={() => setDescription(el.description)}
              >
                <Image
                  source={{
                    uri: `${baseURL}${el.description}`,
                  }}
                  style={styles.image}
                />
                <Text
                  style={styles.deleteButton}
                  onPress={() => handleDeleteQuickDescription(el)}
                >
                  x
                </Text>
                <Text style={{ fontSize: 12 }}>{el.description}</Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
      <ModalQuickDescription
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "94%",
    height: "75%",
    overflow: "hidden",
    marginHorizontal: "auto",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
  quickDescriptionContainer: {
    gap: 8,
    height: 100,
  },
  buttonQuickDescription: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "auto",
    height: 80,
  },
  deleteButton: {
    position: "absolute",
    top: -2,
    right: 5,
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#fff",
    margin: 1,
    width: "23%",
    height: "23%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  textButton: {
    fontSize: 34,
    fontWeight: "bold",
    color: "black",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    backgroundColor: "white",
    fontSize: 16,
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  fab: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    right: 0,
    bottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
