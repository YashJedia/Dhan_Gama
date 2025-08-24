import { View, Text, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomDrawerItem = ({
  itemImage,
  itemName,
  onPress,
  itemStyle,
  currentRoute,
}) => {
  return (
    <DrawerItem
      focused={currentRoute === itemName}
      style={[
        {
          backgroundColor: currentRoute === itemName ? "#CCF6C8" : null,
        },
      ]}
      label={itemName}
      onPress={onPress}
      labelStyle={{
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center",
        color: "black",
      }}
      icon={() => <Image className="w-8 h-8 mr-[-20]" source={itemImage} />}
    />
  );
};

export default CustomDrawerItem;
