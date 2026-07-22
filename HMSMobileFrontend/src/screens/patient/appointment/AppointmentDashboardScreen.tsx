import DoctorCard from "@/src/components/doctor/DoctorCard";
import BottomNav from "@/src/components/common/BottomNav";
import {
  getBookingDepts,
  getDoctorsInfoByDept,
  getTopDoctorsByDept
} from "@/src/services/doctor.service";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function AppointmentDashboardScreen() {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [topDoctorsByDept, setTopDoctorsByDept] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState("DEFAULT");
  const [activeTab, setActiveTab] = useState("BOOK");

  const router = useRouter();

  // ✅ LOAD DEPARTMENTS
  const loadDepartments = async () => {
    try {
      const res = await getBookingDepts();
      setDepartments(res);
    } catch (err) {
      console.log("Dept load error", err);
    }
  };

  // ✅ LOAD DOCTORS BY DEPT
  const loadDoctors = async (deptName: string) => {
    try {
      const res = await getDoctorsInfoByDept(deptName);
      setDoctors(res);
    } catch (err) {
      console.log("Doctor load error", err);
    }
  };

  // ✅ LOAD TOP DOCTORS (DEFAULT)
  const loadTopDoctors = async () => {
    try {
      const res = await getTopDoctorsByDept();
      setTopDoctorsByDept(res);
    } catch (err) {
      console.log("Top doctors error", err);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadTopDoctors();
  }, []);

  // ✅ DEFAULT DOCTORS (FLATTEN)
  const defaultDoctors = topDoctorsByDept.flatMap(
    (dept) => dept.doctors
  );

  // ✅ BASE LIST (IMPORTANT)
  const baseDoctors =
    selectedDept === "DEFAULT"
      ? defaultDoctors
      : doctors;

  // ✅ SEARCH FILTER (WORKS FOR BOTH)
  const filteredDoctors = baseDoctors.filter((d) =>
    `${d.firstName} ${d.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ DEPT CLICK
  const handleDeptClick = async (dept: any) => {
    setSelectedDept(dept.deptName);
    setDoctors([]); // clear old data (UX fix)
    await loadDoctors(dept.deptName);
  };

  // ✅ BACK TO DEFAULT
  const handleDefaultClick = () => {
    setSelectedDept("DEFAULT");
    setDoctors([]);
  };

  // ✅ IMAGE MAP
  const deptImages: any = {
    CAR: require("@/src/images/car.png"),
    NEU: require("@/src/images/neu.png"),
    ENT: require("@/src/images/ent.png"),
    ORT: require("@/src/images/ort.png"),
    DER: require("@/src/images/der.png"),
    PED: require("@/src/images/ped.png"),
    GEN: require("@/src/images/gen.png"),
    RAD: require("@/src/images/rad.png"),
    LAB: require("@/src/images/lab.png"),
  };

  return (
  <View style={{ flex: 1 }}>

    {/* 🔥 MAIN LIST */}
    <FlatList
      data={filteredDoctors}
      keyExtractor={(item) => item.employeeId}
      renderItem={({ item }) => <DoctorCard doctor={item} />}

      // 🚀 PERFORMANCE
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}

      // ✅ ADD SPACE FOR BOTTOM NAV
      contentContainerStyle={{ paddingBottom: 50 }}

      ListHeaderComponent={
        <View style={{ paddingTop: 50, paddingHorizontal: 15 }}>

          {/* 🔍 SEARCH */}
          <TextInput
            placeholder="Search doctor..."
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: "#eee",
              padding: 10,
              borderRadius: 10,
              marginBottom: 10
            }}
          />

          {/* 🔥 TABS */}
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => setActiveTab("BOOK")}
              style={{
                flex: 1,
                padding: 10,
                backgroundColor:
                  activeTab === "BOOK" ? "#4DA6FF" : "#ccc"
              }}
            >
              <Text style={{ textAlign: "center" }}>
                Book Appointment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push("/patient/appointment/myAppointment")
              }
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: "#ccc"
              }}
            >
              <Text style={{ textAlign: "center" }}>
                My Appointments
              </Text>
            </TouchableOpacity>
          </View>

          {/* 🔥 DEPARTMENTS GRID */}
          <FlatList
            data={departments}
            numColumns={3}
            keyExtractor={(item) => item.deptId}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleDeptClick(item)}
                style={{
                  flex: 1,
                  margin: 5,
                  padding: 10,
                  backgroundColor:
                    selectedDept === item.deptName
                      ? "#4DA6FF"
                      : "#fff",
                  borderRadius: 10,
                  alignItems: "center",
                  elevation: 2
                }}
              >
                <Image
                  source={deptImages[item.deptId]}
                  style={{
                    width: 40,
                    height: 40,
                    marginBottom: 5
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color:
                      selectedDept === item.deptName
                        ? "#fff"
                        : "#000"
                  }}
                >
                  {item.deptName}
                </Text>
              </TouchableOpacity>
            )}
          />

        </View>
      }
    />

    {/* 🔥 FIXED BOTTOM NAV */}
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        elevation: 10
      }}
    >
      <BottomNav />
    </View>

  </View>
);
}