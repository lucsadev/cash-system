import { Text, View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  SegmentedButtons,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { useAuthStore, useCashSystemStore } from "../store";
import { router } from "expo-router";
import { getMovementsOfTheDay, register } from "../supabase/db";
import { login } from "../supabase/db";
import { useToast } from "react-native-toast-notifications";
import { msgErrors } from "../constants";
import { handleSaveEdit } from "./UsersList/events";

type Props = {
  isLogin?: boolean;
};

export const UserInputForm = ({ isLogin = false }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [role, setRole] = useState("OPERATOR");
  const setSession = useAuthStore.use.setSession();
  const setProfile = useAuthStore.use.setProfile();
  const today = useCashSystemStore.use.today();
  const setMovementsOfTheDay = useCashSystemStore.use.setMovementsOfTheDay();
  const editUser = useCashSystemStore.use.editUser();
  const setEditUser = useCashSystemStore.use.setEditUser();
  const theme = useTheme();
  const toast = useToast();

  const passwordRef = useRef(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
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
    setRole("OPERATOR");
  };

  const onSaveEdit = async (username: string) => {
    const { error } = await handleSaveEdit({ id: editUser?.id!, username, role });

    if (!error) {
      toast.show("Usuario actualizado", { type: "success" });
      onCancelEdit();
    } else toast.show(error.message, { type: "danger" });
  };

  const onSubmit = (data: { username: string; password: string }) =>
    isLogin ? userLogin(data) : editUser ? onSaveEdit(data.username) : userRegister(data);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Ingresar nombre de usuario"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            error={!!errors.username}
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: !!errors.username ? 0 : 15 }}
            //@ts-ignore
            onSubmitEditing={() => passwordRef.current?.focus()}
            returnKeyType="next"
            blurOnSubmit={false}
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.textError}>El usuario es requerido</Text>
      )}

      {!editUser ? (
        <>
          <Controller
            control={control}
            rules={{
              minLength: editUser ? 0 : 6,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={passwordRef}
                label="Ingresar contraseña"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                error={!!errors.password}
                style={{ marginBottom: !!errors.password ? 0 : 15 }}
                secureTextEntry={secureTextEntry}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                left={<TextInput.Icon icon="account-key" />}
                right={
                  <TextInput.Icon
                    icon={secureTextEntry ? "eye" : "eye-off"}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                }
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.textError}>
              La contraseña debe tener al menos 6 caracteres
            </Text>
          )}
        </>
      ) : null}
      {!isLogin && (
        <View>
          <Text style={styles.textRol}>Seleccione el rol del usuario</Text>
          <SegmentedButtons
            value={role}
            onValueChange={setRole}
            density="small"
            style={{ marginBottom: 20 }}
            buttons={[
              {
                value: "OPERATOR",
                label: "Operador",
                showSelectedCheck: true,
                style: { borderRadius: 5 },
              },
              {
                value: "ADMIN",
                label: "Administrador",
                showSelectedCheck: true,
                style: { borderRadius: 5 },
              },
            ]}
          />
        </View>
      )}

      <Button
        loading={isSubmitting}
        buttonColor={editUser ? "#164e63" : theme.colors.primary}
        textColor={theme.colors.onPrimary}
        mode="elevated"
        onPress={handleSubmit(onSubmit)}
        style={{ borderRadius: 5 }}
        labelStyle={{ fontSize: 18 }}
        contentStyle={{ height: 45 }}
      >
        {isLogin
          ? "Ingresar"
          : editUser
          ? "Modificar usuario"
          : "Crear nuevo usuario"}
      </Button>
      {editUser ? (
        <Button
          buttonColor="#d97706"
          textColor="white"
          mode="elevated"
          onPress={onCancelEdit}
          style={{ borderRadius: 5, marginTop: 10 }}
          labelStyle={{ fontSize: 18 }}
          contentStyle={{ height: 45 }}
        >
          Cancelar
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textError: {
    color: "red",
    marginBottom: 20,
  },
  textRol: {
    marginBottom: 3,
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
