import * as Yup from "yup";

export const companySchema = Yup.object({
  name: Yup.string()

    .min(4, "Name must be at least 4 characters long.")
    .required("Name is required."),
  slogan: Yup.string()
    .required("Slogan is required")
    .min(10, "Slogan must be at least 6 characters long"),

  phone_no: Yup.string()
    .matches(/^(98|97)/, "Invalid phone number.")
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(10, "Phone number cant be longer than 10 digits."),

  external_phoneno: Yup.string()
    .matches(/^(98|97)/, "Invalid phone number.")
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(10, "Phone number cant be longer than 10 digits."),

  email: Yup.string()
    .email("*Must be in email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must have '@' followed by '.com.'",
    )
    .required("Email is required."),

  privacypolicy: Yup.string().required("Privacy Policy is required."),

  local_pra_registration_no: Yup.string()
    .matches(/^[0-9-]+$/, "This field  can only contain numbers and '-'.")
    .required("This field  is required."),

  press_council_registration_no: Yup.string()
    .matches(/^[0-9-]+$/, "This field  can only contain numbers and '-'.")
    .required("This field  is required."),
  media_biva_registration_cretificate_no: Yup.string()
    .matches(/^[0-9-]+$/, "This field  can only contain numbers and '-'.")
    .required("This field  is required."),

  ji_pra_ka_ru_d_no: Yup.string()
    .matches(/^[0-9-]+$/, "Reg no. can only contain numbers and '-'.")
    .required("Reg no number is required."),
  salahakar: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabetical characters.")
    .min(4, "This field must be at least 4 characters long.")
    .max(30, "This field cannot be longer than 30 characters.")
    .required("This field is required."),
  reporter: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabetical characters.")
    .min(4, "This field must be at least 4 characters long.")
    .max(30, "This field cannot be longer than 30 characters.")
    .required("This field is required."),
  pradhan_sanchalak: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabetical characters.")
    .min(4, "This field must be at least 4 characters long.")
    .max(30, "This field cannot be longer than 30 characters.")
    .required("This field is required."),
  sanchalak: Yup.string()
    // .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabetical characters.")
    .min(4, "This field must be at least 4 characters long.")
    .max(30, "This field cannot be longer than 30 characters.")
    .required("This field is required."),
});

export const categorySchema = Yup.object({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters long")
    .required("Category name is required"),
});

export const loginSchmea = Yup.object({
  username: Yup.string()
    .required("*Username is required.")
    .min(5, "*Username must be at least 4 characters long."),
  password: Yup.string()
    .min(6, "*Password must be at least 6 characters long.")

    .required("*Password is required."),
});

export const postSchema = Yup.object().shape({
  title: Yup.string().required("Post title is required."),
  author: Yup.string().required("Author name is required."),
  category_id: Yup.string().required("Category selection is required."),
  is_mukhya_samachar: Yup.number().required("Mukhya samachar is required."),
  body: Yup.string().required("Post description is required."),
});

export const addUserSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required."),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters long.")
    .required("Username is required."),
  address: Yup.string().required("Address is required."),
  gender: Yup.string().required("Gender is required."),
  phone_no: Yup.string()
    .matches(/^(98|97)/, "Invalid phone number.")
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(10, "Phone number cant be longer than 10 digits."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
});

export const editUserSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required."),

  address: Yup.string().required("Address is required."),
  gender: Yup.string().required("Gender is required."),
  phone_no: Yup.string()
    .matches(/^(98|97)/, "Invalid phone number.")
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(10, "Phone number cant be longer than 10 digits."),
});

export const clientSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  address: Yup.string().required("Address is required."),
  phone_no: Yup.string()
    .matches(/^(98|97)/, "Invalid phone number.")
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(10, "Phone number cant be longer than 10 digits."),
});

export const editClientSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phone_no: Yup.string()
    .matches(/^(98|97)/, "Invalid phone number.")
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits long.")
    .max(10, "Phone number cant be longer than 10 digits."),
});

export const advertisesSchema = Yup.object({
  name: Yup.string()

    .required("Name is required."),
  advertisement: Yup.string().required("Advertisement is required."),
  start_date: Yup.string().required("Date is required."),
  month: Yup.string().required("Month is required."),
  client: Yup.string().required("Client is required."),
  description: Yup.string().required("Description is required."),

  discount: Yup.number()
    .min(0, "Discount amount must be 0 or greater.")

    .typeError("Discount amount must be a number."),

  paid_amount: Yup.number()
    .min(0, "Pay amount must be 0 or greater.")

    .typeError("Pay amount must be a number."),
});

export const advertisesEditSchema = Yup.object({
  name: Yup.string()

    .required("Name is required."),

  description: Yup.string().required("Description is required."),
});
export const transactionSchema = Yup.object().shape({
  client: Yup.string().required("Please select a client"),
  paid: Yup.number()
    .typeError("Please enter a valid number")
    .required("Paid amount is required")
    .min(1, "Paid amount must be at least 1"),
});
