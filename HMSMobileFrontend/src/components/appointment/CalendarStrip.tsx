import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

interface DateItem {
  fullDate: string;
  day: string;
  date: number;
  month: string;
}

export default function CalendarStrip({
  selectedDate,
  onSelectDate,
}: Props) {
  const flatListRef = useRef<FlatList>(null);

  const [dates, setDates] = useState<DateItem[]>([]);
  const [monthTitle, setMonthTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const arr: DateItem[] = [];

    const today = new Date();

    // Only Today -> Next 30 Days
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      arr.push({
        fullDate: d.toISOString().split("T")[0],
        day: d.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: d.getDate(),
        month: d.toLocaleDateString("en-US", {
          month: "long",
        }),
      });
    }

    setDates(arr);

    setMonthTitle(
      today.toLocaleDateString("en-US", {
        month: "long",
      })
    );

    if (arr.length > 0) {
      setCurrentIndex(0);
      onSelectDate(arr[0].fullDate);
    }
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const index = dates.findIndex(
      (d) => d.fullDate === selectedDate
    );

    if (index >= 0) {
      setCurrentIndex(index);

      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [selectedDate]);

  const previousDate = () => {
    if (currentIndex === 0) return;

    const index = currentIndex - 1;

    setCurrentIndex(index);

    onSelectDate(dates[index].fullDate);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const nextDate = () => {
    if (currentIndex === dates.length - 1) return;

    const index = currentIndex + 1;

    setCurrentIndex(index);

    onSelectDate(dates[index].fullDate);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  return (
    <View>

      {/* Header */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#1E293B",
          }}
        >
          {monthTitle}
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={previousDate}
            disabled={currentIndex === 0}
            style={{
              padding: 8,
            }}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={
                currentIndex === 0
                  ? "#CBD5E1"
                  : "#64748B"
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextDate}
            disabled={currentIndex === dates.length - 1}
            style={{
              padding: 8,
            }}
          >
            <Ionicons
              name="chevron-forward"
              size={22}
              color={
                currentIndex === dates.length - 1
                  ? "#CBD5E1"
                  : "#64748B"
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Strip */}

      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        keyExtractor={(item) => item.fullDate}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: 65,
          offset: 65 * index,
          index,
        })}
        contentContainerStyle={{
          paddingRight: 20,
        }}
        renderItem={({ item }) => {
          const active =
            item.fullDate === selectedDate;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                const index = dates.findIndex(
                  (d) =>
                    d.fullDate === item.fullDate
                );

                setCurrentIndex(index);

                onSelectDate(item.fullDate);
              }}
              style={{
                width: 60,
                alignItems: "center",
                marginRight: 12,
                paddingBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#94A3B8",
                }}
              >
                {item.day}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  fontSize: 24,
                  fontWeight: active ? "700" : "600",
                  color: active
                    ? "#1E293B"
                    : "#64748B",
                }}
              >
                {item.date}
              </Text>

              {active && (
                <View
                  style={{
                    marginTop: 10,
                    width: 34,
                    height: 4,
                    borderRadius: 4,
                    backgroundColor: "#3B82F6",
                  }}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}