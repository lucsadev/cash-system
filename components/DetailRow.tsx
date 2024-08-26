import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export const DetailRow = ({ label, value }: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textTransform: "capitalize",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textTransform: "capitalize",
  },
});
