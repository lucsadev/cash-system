import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { ImagePickerAssetType } from "../types/data";

type Props = {
    image: ImagePickerAssetType;
    description: string;
    setQuickDescription: any;
};

export const saveQuickDescription = async ({ image, description, setQuickDescription }: Props) => {   
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
  };