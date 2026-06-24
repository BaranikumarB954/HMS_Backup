import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { deptImages } from "@/src/utils/deptImages";

export default function DeptGrid({ data }: any) {
  const router = useRouter();

  const handlePress = (dept: any) => {
    router.push({
      pathname: "/patient/appointment/doctors" as any,
      params: { dept: dept.deptName }
    });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        elevation: 2
      }}
    >
      <Image
        source={deptImages[item.deptId]}
        style={{ width: 50, height: 50, marginBottom: 8 }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 12, textAlign: "center" }}>
        {item.deptName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.deptId}
      numColumns={3} // ✅ 3x3 GRID
      renderItem={renderItem}
    />
  );
}