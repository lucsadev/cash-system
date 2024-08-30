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
import { useState } from "react";
import { FAB } from "react-native-paper";
import { KEYS_Shopping } from "../../constants";
import { usePaymentsToSuppliers } from "../../hooks";
import { useCashSystemStore } from "../../store";
import { ModalQuickDescription } from "../ModalQuickDescription/ModalQuickDescription";
import { styles } from "./styles";

const {
  button,
  buttonContainer,
  buttonQuickDescription,
  container,
  deleteButton,
  displayContainer,
  displayText,
  fab,
  image,
  input,
  inputContainer,
  label,
  pageContainer,
  quickDescriptionContainer,
  textButton,
  textButtonDescription
} = styles;

const baseURL =
  "https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/descriptionsQuick/";

export function PaymentsToSuppliersPage() {
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
      <View>
        <View style={container}>
          <View style={inputContainer}>
            {/* <View style={{width: "100%"}}> */}
            <Text style={label}>Descripción</Text>
            <TextInput
              autoCapitalize="words"
              inputMode="text"
              value={description}
              onChangeText={setDescription}
              style={input}
            />
            {/* </View> */}
          </View>
          <View style={[displayContainer, { marginVertical: 10 }]}>
            <Text style={displayText}>{amount}</Text>
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
        <View style={{ gap: 5, marginTop: 10,marginLeft: 10 }}>
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
                    X
                  </Text>
                  <Text style={textButtonDescription}>
                    {el.description}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      </View>
      <FAB icon="plus" style={fab} onPress={() => setModalVisible(true)} />
      <ModalQuickDescription
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
