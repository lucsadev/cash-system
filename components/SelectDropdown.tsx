import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type dataType = { label: string; value: string };

type Props = {
  label?: string;
  data: dataType[];
  selected: string;
  rightIcon?: string;
  leftIcon?: string;
  setSelected: (value: string) => void;
  style?: {};
};

const renderItem = (item: dataType) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );
};

export function SelectDropdown({
  label,
  data,
  selected,
  leftIcon,
  rightIcon,
  setSelected,
  style,
}: Props) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        style={[styles.dropdown, { ...style }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        activeColor="#0f766e60"
        data={data}
        placeholder=""
        maxHeight={350}
        labelField="label"
        valueField="value"
        value={selected}
        autoScroll={false}
        onChange={(item) => setSelected(item.value)}
        renderItem={renderItem}
        renderLeftIcon={() => (
          <Icon name={leftIcon as any} size={24} color="#0f766e80" />
        )}
        renderRightIcon={() => (
          <Icon name={rightIcon as any} size={24} color="#0f766e80" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
  },
  dropdown: {
    height: 30,
    width: 130,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 3,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 4,
    alignItems: "center",
  },
  textItem: {
    fontSize: 14,
  },
});
