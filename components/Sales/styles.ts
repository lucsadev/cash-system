import { StyleSheet } from "react-native";
import { isTablet } from "../../constants";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#fff",
    margin: 1,
    width: "23.5%",
    height: "23.5%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
  buttonContainer: {
    width: "100%",
    height: "60%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  displayContainer: {
    width: "94%",
    height: isTablet ? 100 : 70,
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
    fontSize: isTablet ? 60 : 40,
    fontWeight: "400",
    color: "#000",
  },
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,    
  },
  buttonText: {
    fontSize: isTablet ? 70 : 40,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: "80%",    
    shadowColor: '#000',
    elevation: 3
  },
  image: {
    width: isTablet ? 110 : 70,
    height: isTablet ? 120 : 80
  },
  text: {
    fontSize: isTablet ? 40 : 20,
    fontWeight: '300',
    letterSpacing: 0.3
  }
});
