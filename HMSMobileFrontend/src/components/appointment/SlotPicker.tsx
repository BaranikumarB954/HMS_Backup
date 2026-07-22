import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { formatTo12Hour } from "@/src/utils/commonFunctions";

interface Slot {
  start: string;
  end: string;
  isBooked: boolean;
}

interface Props {
  slots: Slot[];
  selected: Slot | null;
  onSelect: (slot: Slot) => void;
}

export default function SlotPicker({
  slots,
  selected,
  onSelect,
}: Props) {
  return (
    <FlatList
      data={slots}
      scrollEnabled={false}
      numColumns={3}
      keyExtractor={(item) => item.start}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 15,
      }}
      ListEmptyComponent={
        <View
          style={{
            paddingVertical: 40,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#94A3B8",
            }}
          >
            No available slots
          </Text>
        </View>
      }
      renderItem={({ item }) => {
        const isSelected =
          selected?.start === item.start;

        const backgroundColor = item.isBooked
          ? "#F3F4F6"
          : isSelected
          ? "#4DA6FF"
          : "#FFFFFF";

        const borderColor = item.isBooked
          ? "#E5E7EB"
          : isSelected
          ? "#4DA6FF"
          : "#E2E8F0";

        const textColor = item.isBooked
          ? "#9CA3AF"
          : isSelected
          ? "#FFFFFF"
          : "#1E293B";

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={item.isBooked}
            onPress={() => onSelect(item)}
            style={{
              width: "31%",

              minHeight: 82,

              borderRadius: 18,

              borderWidth: 1,
              borderColor,

              backgroundColor,

              justifyContent: "center",
              alignItems: "center",

              shadowColor: "#000",
              shadowOpacity: isSelected ? 0.15 : 0.04,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 3,
              },

              elevation: isSelected ? 5 : 2,
            }}
          >
            {/* Time */}

            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: textColor,
              }}
            >
              {formatTo12Hour(item.start)}
            </Text>

            {/* End Time */}

            <Text
              style={{
                marginTop: 3,
                fontSize: 15,
                color: isSelected
                  ? "#EAF4FF"
                  : item.isBooked
                  ? "#B0B8C4"
                  : "#64748B",
              }}
            >
              {formatTo12Hour(item.end)}
            </Text>

            {/* Status */}

            {item.isBooked ? (
              <View
                style={{
                  marginTop: 8,
                  backgroundColor: "#FEE2E2",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#DC2626",
                    fontSize: 11,
                    fontWeight: "600",
                  }}
                >
                  Booked
                </Text>
              </View>
            ) : isSelected ? (
              <View
                style={{
                  marginTop: 8,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#4DA6FF",
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  ✓
                </Text>
              </View>
            ) : (
              <View
                style={{
                  marginTop: 8,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  borderWidth: 1.5,
                  borderColor: "#CBD5E1",
                }}
              />
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
}