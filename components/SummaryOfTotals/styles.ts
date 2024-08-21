import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#0e7490",
  },
  containerList: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#0e7490",
    textAlign: "center",
    marginBottom: 5,
    textDecorationLine: 'underline'
  },
  containerRowSubTitle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 5,
    elevation: 3,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  rowTotals: {
    fontSize: 16,
    textAlign: "center",
    color: "#0d9488",
    fontWeight: "bold",
  },
});
