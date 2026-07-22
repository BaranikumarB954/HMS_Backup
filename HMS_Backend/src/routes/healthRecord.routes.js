const PERMISSIONS = require('../constants/permissions');
const authorize = require('../middleware/authorize.middleware');
const {createRouter,auth,errorValidate} = require('./routesServices/routes.header');
const router = createRouter();
const HrCtrl = require('../controllers/healthRecord.controller');


router.post("/", auth, HrCtrl.createHealthRecord);
router.get("/",auth,HrCtrl.getAllHealthRecords)
router.get(
  "/appointment/:appointmentId",
  auth,
  HrCtrl.getByAppointment
);

router.put("/:id", auth, HrCtrl.updateHealthRecord);

module.exports = router;
