const { body } = require('express-validator');

const doctorValidator = [
    body('firstName').isLength({ min: 3 }),
    body('lastName').isLength({ min: 1 }),
    body('email').matches(/@gmail\.com$/),
    body('phone').matches(/^[6-9]\d{9}$/),

    body('password').optional().matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/),

    body('specialization').matches(/^[A-Za-z\s]+$/),
    body('medRegNo')
      .matches(/^[A-Za-z0-9-]+$/)
      .withMessage('Medical Reg No must contain only letters, numbers and "-"')
      .isLength({ max: 16 })
      .withMessage('Medical Reg No max 16 characters'),

    body('qualification').optional().isLength({ min: 2 }),
    body('designation').optional().isLength({ min: 2 }),
    body('joiningDate').optional().isISO8601(),
    body('avlblStartTime').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    body('avlblEndTime').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

    body('consultationFee')
      .isInt({ min: 300 })
      .withMessage('Fee must be at least 300'),

    body('expYears')
      .isInt({ min: 0, max: 50 })
      .withMessage('Experience must be between 0 and 50')
];

module.exports = { doctorValidator };