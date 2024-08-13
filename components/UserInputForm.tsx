import { Text, View, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useRef, useState } from "react";

type Props = {
  login: (data: { userName: string; password: string }) => void;
};

export const UserInputForm = ({ login }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const passwordRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userName: "admin",
      password: "123456",
    },
  });

  const onSubmit = (data: { userName: string; password: string }) => login(data);   

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
            error={!!errors.userName}
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: !!errors.userName ? 0 : 15 }}
            //@ts-ignore
            onSubmitEditing={() => passwordRef.current?.focus()}
            returnKeyType="next"
            blurOnSubmit={false}
          />
        )}
        name="userName"
      />
      {errors.userName && (
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
            returnKeyType='done'
            onSubmitEditing={handleSubmit(onSubmit)}
            left={<TextInput.Icon icon="lock" />}
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
        Enviar
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
