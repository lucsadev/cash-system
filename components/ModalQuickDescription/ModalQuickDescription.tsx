import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Image, View, StyleSheet, Modal, Pressable, Text } from "react-native";
import { useQuickDescription } from "../../hooks";
import { isTablet } from "../../constants";

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
        style={styles.dialog}
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
          <Pressable style={styles.imageContainer} onPress={pickImage}>
            {image?.uri ? (
              <Image source={{ uri: image.uri }} style={styles.image} />
            ) : (
              <Text style={styles.label}>Seleccionar imagen</Text>
            )}
          </Pressable>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            onPress={reset}
            textColor="red"
            style={{ borderColor: "red", borderRadius: 10 }}
          >
            Cancelar
          </Button>
          <Button
            mode="contained-tonal"
            onPress={handleSaveQuickDescription}
            textColor="#0e7490"
            style={{ borderColor: "#0e7490", borderRadius: 10 }}
            loading={loading}
            disabled={loading}
          >
            Guardar descripción
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({  
  dialog: { 
    width: '94%',
    maxWidth: 600,
    borderRadius: 10,
    marginHorizontal: 'auto'    
  },
  title: {
    fontWeight: "bold",
    fontSize: isTablet ? 30 : 20,
    color: "#0e7490",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  imageContainer: {
    width: isTablet ? 180 : 100,
    height: isTablet ? 180 : 100,
    padding: 2,
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 20,
    justifyContent: "center",
  },
  label: { fontSize: isTablet ? 20 : 12, textAlign: "center" },
});
