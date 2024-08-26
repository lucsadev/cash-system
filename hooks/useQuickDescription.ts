import { useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { ImagePickerAssetType } from "../types/data";
import { useCashSystemStore } from "../store";
import { useToast } from "react-native-toast-notifications";
import { saveQuickDescription } from "../functions";

export const useQuickDescription = (
  setModalVisible: (value: boolean) => void
) => {
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
      await saveQuickDescription({ image, description, setQuickDescription });
      setLoading(false);
    } catch (error) {
      toast.show((error as any).message, { type: "danger" });
    } finally {
      reset();
    }
  };

  const reset = () => {
    setImage(null);
    setDescription("");
    setModalVisible(false);
  };

  return {
    description,
    setDescription,
    image,
    pickImage,
    reset,
    handleSaveQuickDescription,
    loading,
  };
};
