import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    button: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#d4d4d8",
      backgroundColor: "#fff",
      margin: 1,
      width: '23%',
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    displayContainer: {
        width: "96%",
        marginHorizontal: "auto",
        height: 70,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#d4d4d8",
        borderRadius: 10,    
        shadowColor: "#000",
        elevation: 2,
        overflow: "hidden",
        marginVertical: 20,
    },
    displayText: {
        textAlign: "right",
        padding: 10,
        fontSize: 40,
        fontWeight: "400",
        color: "#000",
    },
    pageContainer: {
        flex: 1,
      width: "94%",
      marginHorizontal: "auto",
      marginTop: 10,
    },
    text: {
      fontSize: 40,
      color: "black",
      fontWeight: "500",
      letterSpacing: 0.3,
      textAlign: "center",
    },
    divider : {
        width: "100%",
        height: 1,
        backgroundColor: "#ccc",        
    }
  });