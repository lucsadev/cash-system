import { supabase } from "..";
import { ProfileType } from "../../types/db";

export const getUsers = async () => {
  try {
    const { data: users } = await supabase.from("profiles").select("*");
    if(!users) throw new Error("No hay usuarios");

    return users as ProfileType[]    
    
  } catch (error : any) {
    return error
  }
};
