import { View, Text, StyleSheet } from 'react-native'
import { formatLongDate } from '../lib'
import { useCashSystemStore } from '../store';
import { isTablet } from '../constants';

type Props = {
    title: string
    subtitle?: string
}

export function HeaderTitle({ title, subtitle }: Props) {
    const today = useCashSystemStore.use.today();

  return (
    <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>
                  {subtitle ? subtitle : formatLongDate(today)}
                </Text>
              </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: isTablet ? 44 : 24,
      fontWeight: "bold",
      color: "teal",
    },
    subtitle: {
      fontSize: isTablet ? 24 : 16,
      fontWeight: "normal",
      marginBottom: 5,
    }
  })