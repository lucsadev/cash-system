import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KEYS_Shopping } from "../../../constants";
import { globalStyles } from "../../../theme/globalStyles";
import { FAB } from "react-native-paper";
import { ModalQuickDescription } from "../../../components";
import { useCashSystemStore } from "../../../store";
import { useState } from "react";
import { usePaymentsToSuppliers } from "../../../hooks";
import { styles } from "./styles";

const { pageContainer, displayText, displayContainer } = globalStyles;
const {
  container,
  inputContainer,
  label,
  input,
  fab,
  image,
  buttonContainer,
  button,
  textButton,
  quickDescriptionContainer,
  buttonQuickDescription,
  deleteButton,
} = styles;

const baseURL =
  "https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/descriptionsQuick/";

export default function PaymentsToSuppliersScreen() {
  const quickDescriptions = useCashSystemStore.use.quickDescriptions();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    description,
    amount,
    handleDeleteQuickDescription,
    handlePress,
    handleSave,
    isKeyboardVisible,
    setDescription,
  } = usePaymentsToSuppliers();

  return (
    <View style={pageContainer}>
      <View style={container}>
        <View>
          <View style={inputContainer}>
            <Text style={label}>Descripción</Text>
            <TextInput
              autoCapitalize="words"
              inputMode="text"
              value={description}
              onChangeText={setDescription}
              style={input}
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
            buttonContainer,
            {
              display: isKeyboardVisible ? "none" : "flex",
            },
          ]}
        >
          {KEYS_Shopping?.map((el) => (
            <Pressable
              key={el}
              style={({ pressed }) => [
                button,
                {
                  elevation: pressed ? 0 : 5,
                },
              ]}
              onPress={() =>
                ["💵", "🪙"].includes(el) ? handleSave(el) : handlePress(el)
              }
            >
              <Text style={textButton}>{el}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={{ gap: 5 }}>
        {!!quickDescriptions.length && (
          <Text style={label}>Descripciones rápidas</Text>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={quickDescriptionContainer}
        >
          {!!quickDescriptions.length &&
            quickDescriptions.map((el) => (
              <Pressable
                key={el.id}
                style={({ pressed }) => [
                  buttonQuickDescription,
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
                  style={image}
                />
                <Text
                  style={deleteButton}
                  onPress={() => handleDeleteQuickDescription(el)}
                >
                  x
                </Text>
                <Text style={{ fontSize: 12, textTransform: "capitalize" }}>
                  {el.description}
                </Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
      <FAB icon="plus" style={fab} onPress={() => setModalVisible(true)} />
      <ModalQuickDescription
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
