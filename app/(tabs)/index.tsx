import { itemsPaymentMethods } from "../../constants";
import { useAuthStore, useCashSystemStore } from "../../store";
import { Redirect, router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabSales() {
  const setCurrentPaymentMethods = useCashSystemStore.use.setCurrentPaymentMethods();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  if (!isAuthenticated) return <Redirect href="/authScreen" />;
 
  return (
    <View style={styles.container}>
      {itemsPaymentMethods.map((item) => (
        <Pressable
          key={item.name}
          onPress={() => {
            setCurrentPaymentMethods(item.name)
            router.navigate('/salesAmountScreen')
          }}
          style={({pressed}) => [
            styles.card,
            {
              elevation: pressed ? 1 : 4,
            },
          ]}
        >
          <Image
            source={{ uri: item.icon }}
            resizeMode='contain'
            style={styles.image}
          />
          <Text style={styles.text}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:'auto',
    gap:10
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 300,    
    shadowColor: '#000',
    elevation: 3
  },
  image: {
    width: 50,
    height: 60
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0.3
  }
})