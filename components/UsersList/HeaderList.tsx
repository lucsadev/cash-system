import { View, Text, StyleSheet } from 'react-native'

export default function HeaderList() {
  return (
    <View  style={styles.headerList}>
      <Text style={[{width: "60%"}, styles.text]}>
        Nombre de usuario
      </Text>
      <Text style={[{width: "20%"}, styles.text]}>
        Rol
      </Text>
      <Text style={{width: "20%"}}/>
  </View>
  )
}

const styles = StyleSheet.create({
    headerList: {
      flexDirection: "row",      
      height: 30,
      width: "100%",
      backgroundColor: "white",
      alignItems: "center",
      elevation: 5,
      shadowColor: "#000",     
      shadowOpacity: 1,
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'black',
      textAlign: 'center',
    }
  });