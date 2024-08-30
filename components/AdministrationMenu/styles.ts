import { StyleSheet } from "react-native";
import { isTablet } from "../../constants";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      gap: isTablet ? 20 : 10,
    },
    card: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
      width: isTablet ? 310 : 190,
      height: isTablet ? 310 : 190,
      shadowColor: "#000",
      gap: 10,
    },
    image: {
      width: isTablet ? 200 : 130,
      height: isTablet ? 200 : 130,
    },
    text: {
      fontSize: isTablet ? 22 : 14,
    },
  });