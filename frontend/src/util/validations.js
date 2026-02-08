export const name = (value) => {
  if (!value) return "name is required";

  if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
    return "Name is not valid ";

  return null;
};

export const lastName = (value) => {
  if (!value) return "Last name is required";

  if (!value.match(/^[A-Za-z/\s']/))
    return "Last Name can only contain characters ";

  return null;
};

export const gender = (value) => {
  if (!value) return "Gender is required";
};

export const state = (value) => {
  if (!value) return "State is required";
};

export const languages = (value) => {
  if (value === 0) return "Atleast one language is required";
};

export const email = (value) => {
  if (!value) return "Email is required";

  if (
    !value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return "Email is not valid";

  return null;
};

export const pharmacyemail = (value) => {
  if (!value) return "Pharmacy email is required";

  if (
    !value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return "Email is not valid";

  return null;
};
export const city = (value) => {
  if (!value) return "City is required";

  if (value.length < 3) return "Atleast 3 characters required";

  return null;
};

export const pharmacyName = (value) => {
  if (!value) return "Pharmacy name is required";

  if (value.length < 3) return "Atleast 3 characters required";

  return null;
};

export const speciality = (value) => {
  if (!value) return "Speciality is required";
};

export const relation = (value) => {
  if (!value) return "This field is required";
};

export const bloodGroup = (value) => {
  if (!value) return "BloodGroup select is required";
};

export const phoneNumber = (value) => {
  if (!value) return "Phone Number is required";

  if (!String(value).match(/^(\+\d{1,3}[- ]?)?\d{10}$/))
    return "Phone Number is not valid";

  return null;
};

export const pharmacyphoneNumber = (value) => {
  if (!value) return "Pharmacy phone number is required";

  if (!value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/))
    return "Pharmacy phone number is not valid";

  return null;
};

export const ZipCode = (value) => {
  if (!value) return "Zip code is required";

  if (!value.match(/^[0-9]{5}(?:-[0-9]{4})?$/))
    return 'Zipcode should be in format "12345" or "12345-1234"';

  return null;
};

export const qualification = (value) => {
  if (!value) return "Qualification is required";

  if (value.length < 3) return "Atleast 3 characters required";

  return null;
};

export const occupation = (value) => {
  if (!value) return "Occupation is required";

  if (value.length < 3) return "Atleast 3 characters required";

  return null;
};

export const height = (value) => {
  if (!value) return "Height is required";

  return null;
};

export const license = (value) => {
  if (!value) return "License upload is required";

  return null;
};
export const weight = (value) => {
  if (!value) return "Weight is required";

  return null;
};

export const password = (value) => {
  if (!value) return "Password is required";

  if (value.length < 6) return "Atleast 6 characters required";

  return null;
};

export const confirmPassword = (password, confirmPassword) => {
  if (!password) return "Confirm Password is required";

  if (password !== confirmPassword) return "Passwords do not match";

  return null;
};

export const prefferedDateTime = (value) => {
  if (!value) return "Appointment Date & Time is required";

  return null;
};

export const dateOfBirth = (value) => {
  if (!value) return "Date of birth is required";
  return null;
};

export const reasonToCancel = (value) => {
  if (!value) return "Please specify reason to cancel appointment";
};

export const Language = (value) => {
  if (!value) return "Language is required";

  if (value.length < 1) return "Please select atleast one language";

  return null;
};

export const treatmentArea = (value) => {
  if (!value) return "Treatment area is required";

  if (value.length < 1) return "Please select atleast one treatment area";

  return null;
};

export const Age = (value) => {
  if (!value) return "Age is required";

  if (value.length < 1) return "Please select atleast one age group";

  return null;
};

export const ustime_zone = (value) => {
  if (!value) return "Timezone is required";
};
