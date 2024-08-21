import { Text, View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  SegmentedButtons,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useRef, useState } from "react";
import { useAuthStore, useCashSystemStore } from "../store";
import { router } from "expo-router";
import { getMovementsOfTheDay, register } from "../supabase/db";
import { login } from "../supabase/db";
import { useToast } from "react-native-toast-notifications";
import { msgErrors } from "../constants";

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
  const theme = useTheme();
  const toast = useToast();

  const passwordRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "admin",
      password: "123456",
    },
  });

  const userRegister = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { error } = await register({ username, password, role });

    error    
      ? toast.show(`Error: ${msgErrors[error.message as keyof typeof msgErrors]}`, { type: "danger" })
      : toast.show("Usuario registrado", { type: "success" });
  };

  const userLogin = async (data: { username: string; password: string }) => {
    try {
      const { session, profile, error } = await login(data);

      if (error) throw new Error(error.message);

      setSession(session);
      setProfile(profile);
      getMovementsOfTheDay(today).then(setMovementsOfTheDay);
      router.push("/(tabs)");
    } catch (error: any) {
      toast.show(`Usuario o contraseña incorrectos`, { type: "danger" });
    }
  };

  const onSubmit = (data: { username: string; password: string }) =>
    isLogin ? userLogin(data) : userRegister(data);

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

      <Controller
        control={control}
        rules={{
          minLength: 6,
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

      {!isLogin && (
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
      )}

      <Button
        loading={isSubmitting}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
        mode="elevated"
        onPress={handleSubmit(onSubmit)}
        style={{ borderRadius: 5 }}
        labelStyle={{ fontSize: 18 }}
        contentStyle={{ height: 45 }}
      >
        {isLogin ? "Ingresar" : "Crear nuevo usuario"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textError: {
    color: "red",
    marginBottom: 20,
  },
});
