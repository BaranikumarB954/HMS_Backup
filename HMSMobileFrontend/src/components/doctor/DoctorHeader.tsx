import React from "react";
import { View, Text } from "react-native";
import { bookAppointmentStyles as styles } from "@/src/styles/bookAppointment.styles";

interface DoctorHeaderProps {
  doctor: {
    doctorName: string;
    specialization: string;
    fee: string | number;
  };
}

export default function DoctorHeader({
  doctor,
}: DoctorHeaderProps) {
  const initials =
    doctor.doctorName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "DR";

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 18,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },

        elevation: 5,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Avatar */}

        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,

            backgroundColor: "#4DA6FF",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {initials}
          </Text>
        </View>

        {/* Doctor Details */}

        <View
          style={{
            flex: 1,
            marginLeft: 16,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1E293B",
            }}
          >
            {doctor.doctorName}
          </Text>

          <Text
            style={{
              marginTop: 5,
              color: "#64748B",
              fontSize: 15,
            }}
          >
            {doctor.specialization}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <View
              style={{
                backgroundColor: "#ECFDF5",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#059669",
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                ⭐ 4.9
              </Text>
            </View>

            <View
              style={{
                marginLeft: 12,
                backgroundColor: "#EFF6FF",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#2563EB",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                ₹ {doctor.fee}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Divider */}

      <View
        style={{
          height: 1,
          backgroundColor: "#EEF2F7",
          marginVertical: 18,
        }}
      />

      {/* Bottom Info */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#94A3B8",
            }}
          >
            Experience
          </Text>

          <Text
            style={{
              marginTop: 5,
              fontWeight: "700",
              color: "#1E293B",
              fontSize: 16,
            }}
          >
            10+ Years
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#94A3B8",
            }}
          >
            Patients
          </Text>

          <Text
            style={{
              marginTop: 5,
              fontWeight: "700",
              color: "#1E293B",
              fontSize: 16,
            }}
          >
            500+
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#94A3B8",
            }}
          >
            Status
          </Text>

          <Text
            style={{
              marginTop: 5,
              fontWeight: "700",
              color: "#22C55E",
              fontSize: 16,
            }}
          >
            Available
          </Text>
        </View>
      </View>
    </View>
  );
}