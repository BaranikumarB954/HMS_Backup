const {createRouter,auth,errorValidate} = require('./routesServices/routes.header');
const router = createRouter();

const masterController = require("../controllers/master.controller");

router.get('/filter',masterController.getFilters);

module.exports = router;