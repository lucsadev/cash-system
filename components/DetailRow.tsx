import { StyleSheet, Text, View } from "react-native";
import { isTablet } from "../constants";

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
    fontSize: isTablet ? 20 : 12,    
    color: "red",
    textTransform: "capitalize",
  },
  label: {
    fontSize: isTablet ? 20 : 12,    
    color: "black",
    textTransform: "capitalize",
  },
});
