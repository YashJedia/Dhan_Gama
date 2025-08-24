import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";

const { width, height } = Dimensions.get("window");

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    toggleCalendar();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={toggleCalendar}
        className="p-3 border-[#469fe7] border-2 rounded-full bg-[#fff]"
        activeOpacity={0.7}
      >
        <Text className="text-[16px]">{selectedDate}</Text>
      </TouchableOpacity>
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center bg-[#00000076]">
          <View
            className={`bg-white p-6 rounded-3xl items-center w-[${width}]`}
          >
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
            <TouchableOpacity
              onPress={toggleCalendar}
              activeOpacity={0.7}
              className="py-3 px-5 bg-[#f00] rounded-lg mt-3"
            >
              <Text className="text-[17px] text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomCalendar;
