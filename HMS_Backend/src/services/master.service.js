const {
    STATUS,
    APMNT_STATUS,
    APMNT_TYPE,
    HEALTH_RECORD_STATUS,
    APPROVAL_STATUS
} = require("../constants/basic.constant");

const ROLES = require("../constants/role.constant");

const {
    bookingDepartments
} = require("../constants/department.constant");


/**
 * Convert Object.freeze constant to dropdown options
 * Example:
 * {
 *    ACTIVE:"ACTIVE",
 *    INACTIVE:"INACTIVE"
 * }
 *
 * becomes
 *
 * [
 *   {label:"ACTIVE",value:"ACTIVE"},
 *   {label:"INACTIVE",value:"INACTIVE"}
 * ]
 */
const enumToOptions = (obj) => {
    return Object.values(obj).map(value => ({
        label: value,
        value: value
    }));
};

/**
 * Convert Roles object into dropdown
 */
const roleOptions = () => {
    return Object.values(ROLES).map(role => ({
        label: role.roleName,
        value: role.roleId
    }));
};

/**
 * Convert Departments
 */
const departmentOptions = () => {
    return bookingDepartments.map(dept => ({
        label: dept.deptName,
        value: dept.deptId
    }));
};


/**
 * ==============================================
 * Department Page Filters
 * ==============================================
 */
const getDepartmentFilters = () => {

    return [

        {
            type: "select",
            key: "role",
            label: "Role",
            placeholder: "Select Role",
            options: roleOptions()
        },

        {
            type: "date",
            key: "date",
            label: "Date"
        },

        {
            type: "select",
            key: "status",
            label: "Status",
            placeholder: "Select Status",
            options: enumToOptions(STATUS)
        },

        {
            type: "search",
            key: "search",
            label: "Search",
            placeholder: "Search...",
            searchBy: {
                key: "searchBy",
                placeholder: "Search By",
                options: [
                    {
                        label: "Email",
                        value: "email"
                    },
                    {
                        label: "Name",
                        value: "name"
                    },
                    {
                        label: "Employee ID",
                        value: "employeeId"
                    }
                ]
            }
        }

    ];

};



/**
 * ==============================================
 * Appointment Page Filters
 * ==============================================
 */
const getAppointmentFilters = () => {

    return [

        {
            type: "select",
            key: "status",
            label: "Status",
            placeholder: "Select Status",
            options: enumToOptions(APMNT_STATUS)
        },

        {
            type: "select",
            key: "type",
            label: "Appointment Type",
            placeholder: "Select Type",
            options: enumToOptions(APMNT_TYPE)
        },

        {
            type: "select",
            key: "department",
            label: "Department",
            placeholder: "Select Department",
            options: departmentOptions()
        },

        {
            type: "date",
            key: "date",
            label: "Appointment Date"
        },

        {
            type: "time",
            key: "time",
            label: "Appointment Time"
        },

        {
            type: "search",
            key: "search",
            label: "Search",
            placeholder: "Search...",
            searchBy: {
                key: "searchBy",
                placeholder: "Search By",
                options: [
                    {
                        label: "Appointment ID",
                        value: "appointmentId"
                    },
                    {
                        label: "Patient ID",
                        value: "patientId"
                    }
                ]
            }
        }

    ];

};

/**
 * ==============================================
 * Approval Page Filters
 * ==============================================
 */
const getApprovalFilters = () => {

    return [

        {
            type: "select",
            key: "status",
            label: "Approval Status",
            placeholder: "Select Status",
            options: enumToOptions(APPROVAL_STATUS)
        },

        {
            type: "date",
            key: "date",
            label: "Approval Date"
        },

        {
            type: "search",
            key: "search",
            label: "Search",
            placeholder: "Search...",
            searchBy: {
                key: "searchBy",
                placeholder: "Search By",
                options: [
                    {
                        label: "Email",
                        value: "email"
                    },
                    {
                        label: "Name",
                        value: "name"
                    },
                    {
                        label: "ID",
                        value: "id"
                    }
                ]
            }
        }

    ];
};


/**
 * ==============================================
 * Health Record Page Filters
 * ==============================================
 */
const getHealthRecordFilters = () => {

    return [

        {
            type: "select",
            key: "status",
            label: "Health Record Status",
            placeholder: "Select Status",
            options: enumToOptions(HEALTH_RECORD_STATUS)
        },

        {
            type: "search",
            key: "search",
            label: "Search",
            placeholder: "Search Health Records...",
            searchBy: {
                key: "searchBy",
                placeholder: "Search By",
                options: [
                    {
                        label: "Health Record ID",
                        value: "healthRecordId"
                    },
                    {
                        label: "Appointment ID",
                        value: "appointmentId"
                    },
                    {
                        label: "Email",
                        value: "email"
                    }
                ]
            }
        }

    ];
};


/**
 * ==============================================
 * MASTER FILTER DISPATCHER
 * ==============================================
 * This function decides which filter set to return
 * based on page name + optional role
 */
const getFiltersByPage = (page, role = null) => {

    switch (page) {

        case "department":
            return getDepartmentFilters();

        case "appointment":
            return getAppointmentFilters();

        case "approval":
            return getApprovalFilters();

        case "health-record":
            return getHealthRecordFilters();

        default:
            return [];
    }
};


/**
 * ==============================================
 * VALIDATION LAYER
 * ==============================================
 */

/**
 * Validate if requested page is allowed
 */
const isValidPage = (page) => {
    const allowedPages = [
        "department",
        "appointment",
        "approval",
        "health-record"
    ];

    return allowedPages.includes(page);
};


/**
 * Safe wrapper for filter fetching
 * Prevents invalid page injection
 */
const getSafeFiltersByPage = (page, role = null) => {

    if (!page) {
        throw new Error("Page is required to fetch filters");
    }

    if (!isValidPage(page)) {
        throw new Error(`Invalid filter page: ${page}`);
    }

    return getFiltersByPage(page, role);
};


/**
 * ==============================================
 * OPTIONAL: FUTURE EXTENSION HOOK
 * ==============================================
 * You can later extend this for:
 * - role-based filtering
 * - department-based filtering
 * - permission-based UI
 */
const applyRoleBasedFilterRules = (filters, role) => {

    if (!role) return filters;

    // Example future rule (you can enable later)
    // if (role === "DOCTOR") {
    //     return filters.filter(f => f.key !== "department");
    // }

    return filters;
};


/**
 * FINAL EXPORT WRAPPER
 * This is what controller will call
 */
const getMasterFilters = (page, role = null) => {

    let filters = getSafeFiltersByPage(page, role);

    filters = applyRoleBasedFilterRules(filters, role);

    return {
        success: true,
        page,
        role,
        filters
    };
};


/**
 * ==============================================
 * EXPORTS
 * ==============================================
 */
module.exports = {
    getMasterFilters,
    getFiltersByPage,
    getDepartmentFilters,
    getAppointmentFilters,
    getApprovalFilters,
    getHealthRecordFilters
};
