import joi from 'joi';

const signupSchema = joi.object({
  name: joi.string().alphanum().max(15).min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().required()
});

export default signupSchema;