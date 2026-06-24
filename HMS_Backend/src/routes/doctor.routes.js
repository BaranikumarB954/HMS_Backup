const PERMISSIONS = require('../constants/permissions');
const authorize = require('../middleware/authorize.middleware');
const {createRouter,auth,errorValidate} = require('./routesServices/routes.header');
const {getDoctorsByDept,checkDoctor, getDoctorsInfoByDept,updateDoctor, getDashboard,getDoctorFullInfo,getDoctorsApmntDept, getTopDoctorsByDept} = require('../controllers/doctor.controller');
const { doctorValidator } = require('../validations/doctorValidation');
const authorizeEmployeeCreation = require('../middleware/authorizeEmpCreat.middleware');
const { addEmployeeByAdmin } = require('../controllers/employee.controller');

const router = createRouter();

router.get('/topDoctorsByDept', auth, authorize(PERMISSIONS.READ_DOCTOR),getTopDoctorsByDept);
router.get('/getDocByDept',auth,authorize(PERMISSIONS.READ_DOCTOR),getDoctorsByDept);
router.get('/doctorDepartments',auth,authorize(PERMISSIONS.READ_DEPARTMENT),getDoctorsApmntDept)
router.get('/getDocInfoByDept',auth,authorize(PERMISSIONS.READ_DOCTOR),getDoctorsInfoByDept);
router.post('/addDoctorByAdmin',auth,authorize(PERMISSIONS.CREATE_DOCTOR),authorizeEmployeeCreation,doctorValidator,errorValidate,addEmployeeByAdmin)
router.get('/checkDoctor/:empId',auth,checkDoctor)
router.put('/updateDoctor/:empId', auth,authorize(PERMISSIONS.UPDATE_DOCTOR),doctorValidator,errorValidate, updateDoctor);
router.get('/dashboard',auth,getDashboard);
router.get('/getDoctorFullInfo',auth,authorize(PERMISSIONS.READ_DOCTOR),getDoctorFullInfo);
module.exports = router;