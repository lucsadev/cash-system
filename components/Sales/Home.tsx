
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from "react-native";
import { itemsPaymentMethods } from '../../constants';
import { useCashSystemStore } from '../../store';
import { styles } from './styles';


export function Home() {
  const setCurrentPaymentMethods = useCashSystemStore.use.setCurrentPaymentMethods();

 
  return (
    <View style={styles.pageContainer}>
      {itemsPaymentMethods.map((item) => (
        <Pressable
          key={item.name}
          onPress={() => {
            setCurrentPaymentMethods(item.name)
            router.navigate('/home/salesAmountScreen')
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