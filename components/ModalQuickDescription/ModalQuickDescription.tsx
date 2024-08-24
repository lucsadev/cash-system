import { useState } from "react";
import { Image, View, StyleSheet, Modal, Pressable, Text } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { supabase } from "../../supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { ImagePickerAssetType } from "../../types/data";
import { useCashSystemStore } from "../../store";
import { useToast } from "react-native-toast-notifications";

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export function ModalQuickDescription({
  modalVisible,
  setModalVisible,
}: Props) {
  const [image, setImage] = useState<ImagePickerAssetType | null>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const setQuickDescription = useCashSystemStore.use.setQuickDescription();
  const toast = useToast();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSaveQuickDescription = async () => {
    if (!image?.uri || !description) return;

    try {
      setLoading(true);
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: "base64",
      });
      const filePath = `descriptionsQuick/${description}`;
      const contentType = image.type === "image" ? "image/png" : "video/mp4";
      const { error, data } = await supabase.storage
        .from("images")
        .upload(filePath, decode(base64), { contentType, upsert: true });

      if (!error) {
        const { error } = await supabase
          .from("quickDescription")
          .insert([{ id: data.id, description }]);
        if (!error) {
          setQuickDescription({ id: data.id, description });
        } else throw new Error(error as any);
      } else throw new Error(error as any);
    } catch (error) {
      toast.show((error as any).message, { type: "danger" });
    } finally {
      setLoading(false);
    }
    reset();
  };

  const reset = () => {
    setImage(null);
    setDescription("");
    setModalVisible(false);
  };

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
    borderColor: "#d4d4d8",
    borderRadius: 5,
    overflow: "hidden",
  },
});
