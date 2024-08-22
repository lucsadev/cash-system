import { Text, View, StyleSheet } from "react-native";
import {
  Button,
  SegmentedButtons,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useCustomForm } from "../hooks";

type Props = {
  isLogin?: boolean;
};

export const UserInputForm = ({ isLogin = false }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const passwordRef = useRef(null);
  const theme = useTheme();

  const {
    control,
    editUser,
    errors,
    isSubmitting,
    onCancelEdit,
    onSubmit,
    role,
    setRole,
  } = useCustomForm(isLogin);

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
                onSubmitEditing={onSubmit}
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
        onPress={onSubmit}
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
