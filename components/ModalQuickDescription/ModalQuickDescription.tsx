import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Image, View, StyleSheet, Modal, Pressable, Text } from "react-native";
import { useQuickDescription } from "../../hooks";

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export function ModalQuickDescription({
  modalVisible,
  setModalVisible,
}: Props) {
  const {
    description,
    setDescription,
    image,
    pickImage,
    reset,
    handleSaveQuickDescription,
    loading,
  } = useQuickDescription(setModalVisible);

  return (
    <Portal>
      <Dialog
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        style={{ borderRadius: 10 }}
      >
        <Dialog.Title style={styles.title}>
          Nueva descripción rápida
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Descripción"
            mode="outlined"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.selectImageContainer}>
            <View style={styles.imageContainer}>
              {image?.uri && (
                <Image source={{ uri: image.uri }} style={styles.image} />
              )}
            </View>
            <Button onPress={pickImage}>Seleccionar imagen</Button>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="outlined"
            onPress={reset}
            textColor="red"
            style={{ borderColor: "red", borderRadius: 10 }}
          >
            Cancelar
          </Button>
          <Button
            mode="outlined"
            onPress={handleSaveQuickDescription}
            textColor="#0e7490"
            style={{ borderColor: "#0e7490", borderRadius: 10 }}
            loading={loading}
          >
            Guardar descripción
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#0e7490",
    textAlign: "center",
  },
  selectImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  imageContainer: {
    width: 55,
    height: 55,
    padding: 2,
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 5,
    overflow: "hidden",
  },
});
