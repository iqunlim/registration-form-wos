// username Validation
export const validateUserName = (value: string) => {
  let error = "";
  if (!value) {
    error = "Username is Required";
  } else if (value.length < 3) {
    error = "Username must be at least 3 characters.";
  }
  return error;
};

// Email validation
export const validateEmail = (value: string) => {
  let error = "";
  if (!value) {
    error = "Email is required";
  } else if (!value.includes("@")) {
    error = "Please enter a valid email address.";
  }
  return error;
};

// have they agreed to the terms?
export const validateAgreedToTerms = (checked: boolean) => {
  let error = "";
  if (checked === false) {
    error = "You must agreed to the terms and conditions.";
  }
  return error;
};

// TextArea validation
export const validateFunFact = (value: string) => {
  let error = "";
  if (value.length < 5 || value.length > 100) {
    error = "Please enter a fun fact between 5 and 100 characters";
  }
  return error;
};

// Favorite Language validation
export const validateFavoriteLanguage = (value: string) => {
  let error = "";
  if (value === "None") {
    error = "Please select a language.";
  }
  return error;
};
