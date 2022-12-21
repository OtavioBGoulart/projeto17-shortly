import joi from 'joi';

const signupSchema = joi.object({
  name: joi.string().alphanum().max(10).min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmedPass: joi.string().required()
});

export default signupSchema;