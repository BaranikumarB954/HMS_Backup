const {
    getMasterFilters
} = require("../services/master.service");


/**
 * ==============================================
 * MASTER FILTER CONTROLLER
 * ==============================================
 * GET /api/master/filter?page=appointment&role=DOCTOR
 */
const getFilters = async (req, res) => {

    try {

        const { page, role } = req.query;

        if (!page) {
            return res.status(400).json({
                success: false,
                message: "Page query parameter is required"
            });
        }

        // Call service layer
        const result = getMasterFilters(page, role);

        return res.status(200).json(result);

    } catch (error) {

        console.error("Master Filter Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    getFilters
};