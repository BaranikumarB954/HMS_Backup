const departments = [
    { deptId: "CAR", deptName: "CARDIOLOGY" },
    { deptId: "NEU", deptName: "NEUROLOGY" },
    { deptId: "ENT", deptName: "ENT" },
    { deptId: "ORT", deptName: "ORTHOPEDICS" },
    { deptId: "DER", deptName: "DERMATOLOGY" },
    { deptId: "PED", deptName: "PEDIATRICS" },
    { deptId: "EMR", deptName: "EMERGENCY" },
    { deptId: "ICU", deptName: "INTENSIVE CARE UNIT" },
    { deptId: "RAD", deptName: "RADIOLOGY" },
    { deptId: "LAB", deptName: "LABORATORY" },
    { deptId: "PHA", deptName: "PHARMACY" },
    { deptId: "FRD", deptName: "FRONT DESK" },
    { deptId: "GEN", deptName: "GENERAL"}
];

// 1. Define the IDs of the departments allowed for doctor appointments
const doctorAppointmentDeptIds = ["CAR", "NEU", "ENT", "ORT", "DER", "PED", "GEN", "RAD", "LAB"];

// 2. Filter the master list
const bookingDepartments = departments.filter(dept => 
    doctorAppointmentDeptIds.includes(dept.deptId)
);

module.exports = {departments,bookingDepartments};

// CARDIOLOGY (CAR)
// NEUROLOGY (NEU)
// ENT (ENT)
// ORTHOPEDICS (ORT)
// DERMATOLOGY (DER)
// PEDIATRICS (PED)
// GENERAL (GEN)    for appointment booking for the doctors

// RADIOLOGY & LABORATORY for tests(X-rays, blood tests)