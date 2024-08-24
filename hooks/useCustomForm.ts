import { useAuthStore, useCashSystemStore } from "../store";
import { router } from "expo-router";
import { getMovementsOfTheDay, register } from "../supabase/db";
import { login } from "../supabase/db";
import { useToast } from "react-native-toast-notifications";
import { msgErrors } from "../constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../supabase";
import { Keyboard } from "react-native";

export function useCustomForm(isLogin: boolean) {
  const [role, setRole] = useState("OPERATOR");
  const setSession = useAuthStore.use.setSession();
  const setProfile = useAuthStore.use.setProfile();
  const today = useCashSystemStore.use.today();
  const setMovementsOfTheDay = useCashSystemStore.use.setMovementsOfTheDay();
  const editUser = useCashSystemStore.use.editUser();
  const setEditUser = useCashSystemStore.use.setEditUser();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "admin",
      password: "123456",
    },
  });

  useEffect(() => {
    if (editUser) {
      setRole(editUser.role);
      setValue("username", editUser.username);
    }
  }, [editUser]);

  const userRegister = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { error } = await register({ username, password, role });

    error
      ? toast.show(
          `Error: ${msgErrors[error.message as keyof typeof msgErrors]}`,
          { type: "danger" }
        )
      : toast.show("Usuario registrado", { type: "success" });
  };

  const userLogin = async (data: { username: string; password: string }) => {
    try {
      const { session, profile, error } = await login(data);

      if (error) throw error;

      setSession(session);
      setProfile(profile);
      getMovementsOfTheDay(today).then(setMovementsOfTheDay);
      router.push("/(tabs)");
    } catch (error: any) {
      toast.show(msgErrors[error.message as keyof typeof msgErrors], {
        type: "danger",
      });
    }
  };

  const onCancelEdit = () => {
    setEditUser(null);
    setValue("username", "");
    setValue("password", "");
    setRole("OPERATOR");
  };

  const onSaveEdit = async (username: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ username, role })
      .eq("id", editUser?.id!);

    if (!error) {
      toast.show("Usuario actualizado", { type: "success" });
      onCancelEdit();
    } else toast.show(error.message, { type: "danger" });
  };

  const onSubmit = handleSubmit(
    (data: { username: string; password: string }) => {        
      isLogin
        ? userLogin(data)
        : editUser
        ? onSaveEdit(data.username)
        : userRegister(data);
        Keyboard.dismiss();
    }
  );

  return {
    role,
    setRole,
    editUser,
    control,
    errors,
    isSubmitting,
    onCancelEdit,
    onSubmit,
  };
}
