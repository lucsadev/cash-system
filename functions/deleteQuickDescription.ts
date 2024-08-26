import { supabase } from "../supabase";
import { QuickDescriptionType } from "../types/db";
import { useCashSystemStore } from './../store/cashSystemStore';

export const deleteQuickDescription = async (
    quickDescription: QuickDescriptionType
  ) => {
    const { deleteQuickDescription } = useCashSystemStore.getState()
  
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
  
  };