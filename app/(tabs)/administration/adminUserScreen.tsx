import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../../../theme/globalStyles'
import { UserInputForm, UsersList } from '../../../components'

export default function adminUserScreen() {
  return (
    <View style={globalStyles.pageContainer}>
      <Text style={styles.title}>Nuevo usuario</Text>
      <UserInputForm />
      <UsersList />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  }
})