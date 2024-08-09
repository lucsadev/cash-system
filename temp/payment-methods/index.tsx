import { itemsPaymentMethods } from "@/constants";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function StackSales() {
  return (
    <View style={ styles.container}>
      <Text >Sales</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 'auto',
    height: 75,
  },
});

{/* {itemsPaymentMethods.map((item) => (
<Pressable onPress={() => console.log(item.name)}>
<Image
  style={styles.logo}
  source={{
    uri: item.icon,
  }}
/>
</Pressable>
))} */}