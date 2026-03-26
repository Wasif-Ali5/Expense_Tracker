import { body, validationResult } from "express-validator";

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

export const validateTransaction = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("date")
    .isISO8601()
    .withMessage("Invalid date format"),

  handleErrors,
];

export const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")

    // At least 5 letters
    .matches(/(?:.*[A-Za-z]){5,}/)
    .withMessage("Password must contain at least 5 letters")

    // At least 2 numbers
    .matches(/(?:.*\d){2,}/)
    .withMessage("Password must contain at least 2 numbers")

    // At least 1 special character
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least 1 special character"),

  handleErrors,
];

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleErrors,
];