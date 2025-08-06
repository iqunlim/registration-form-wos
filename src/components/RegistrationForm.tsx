import { useState } from "react";

// Form type
type RegistrationFormFields = {
  username: string;
  email: string;
  funFact: string;
  favoriteLanguage: string;
  agreedToTerms: boolean;
};

// Errors type
type RegistrationErrors = {
  usernameError?: string;
  emailError?: string;
  funFactError?: string;
  favoriteLanguageError?: string;
  agreedToTermsError?: string;
};

// Type for every different element in the form. Just for readability and modification
type InputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function RegistrationForm() {
  const [formState, setFormState] = useState<RegistrationFormFields>({
    username: "",
    email: "",
    funFact: "",
    favoriteLanguage: "None",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});

  const handleSumbit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors({});

    // If there are errors, leave early, do not submit
    const [valid, errors] = validateFields();
    if (!valid) {
      setErrors(errors);
      return;
    }
    // In the real world, this would be some sort of POST request or otherwise
    // There is a small bug, where the last error still shows up. Lets fix that
    alert(
      `Submitted Username: ${formState.username}\nSubmitted Email: ${
        formState.email
      }\nSubmittedFunFact: ${formState.funFact}\nSubmitted Favorite Language: ${
        formState.favoriteLanguage
      }\nAgreed to terms? ${formState.agreedToTerms ? "Yes" : "No"}`
    );
  };

  const validateFields = (): [boolean, RegistrationErrors] => {
    // Username validation
    let isValid = true;
    const errors: RegistrationErrors = {};
    if (!formState.username) {
      errors.usernameError = "Username is Required";
      isValid = false;
    } else if (formState.username.length < 3) {
      errors.usernameError = "Username must be at least 3 characters.";
      isValid = false;
    }
    // Email validation
    if (!formState.email) {
      errors.emailError = "Email is required";
      isValid = false;
    } else if (!formState.email.includes("@")) {
      errors.emailError = "Please enter a valid email address.";
      isValid = false;
    }
    // Have they agreed to the terms?
    if (!formState.agreedToTerms) {
      errors.agreedToTermsError =
        "You must agreed to the terms and conditions.";
      isValid = false;
    }

    // TextArea validation
    if (formState.funFact.length < 5 || formState.funFact.length > 100) {
      errors.funFactError =
        "Please enter a fun fact between 5 and 100 characters";
      isValid = false;
    }

    // Favorite Language validation
    if (formState.favoriteLanguage === "None") {
      errors.favoriteLanguageError = "Please select a language.";
      isValid = false;
    }
    return [isValid, errors];
  };

  const handleInputChange: React.ChangeEventHandler<InputElements> = (e) => {
    const { name, type } = e.target;
    // Using a switch case for future-proofing
    // I could have also checked here for something like e.target.type === "checkbox" ? checked : value
    // But radio buttons and other form elements also use something besides value (like file handlers)
    switch (type) {
      // All of these use the value attribute
      case "text":
      case "email":
      case "textarea":
      case "select-one": {
        const { value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        break;
      }
      // This however uses the "checked" attribute
      case "checkbox":
        {
          const { checked } = e.target as HTMLInputElement; // Typescript......
          setFormState((prev) => ({ ...prev, [name]: checked }));
        }
        break;
      // Fall-through to throw a TypeError for the developer
      default:
        throw new TypeError("Invalid HTML Form Element");
    }
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
          />
        </label>
        {errors.usernameError && (
          <p className="alert">{errors.usernameError}</p>
        )}
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </label>
        {errors.emailError && <p className="alert">{errors.emailError}</p>}
        <label>
          Fun Fact About You:
          <textarea
            name="funFact"
            value={formState.funFact}
            onChange={handleInputChange}
          ></textarea>
        </label>
        {errors.funFactError && <p className="alert">{errors.funFactError}</p>}
        <label>
          Language:
          <select
            name="favoriteLanguage"
            value={formState.favoriteLanguage}
            onChange={handleInputChange}
          >
            <option value="None">-- Please select a language --</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="SQL">SQL</option>
            <option value="Javascript">Javascript</option>
            <option value="C#">C#</option>
            <option value="Python">Python</option>
          </select>
        </label>
        {errors.favoriteLanguageError && (
          <p className="alert">{errors.favoriteLanguageError}</p>
        )}
        <label>
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formState.agreedToTerms}
            onChange={handleInputChange}
          />
          I Agree to the Terms and Conditions
        </label>
        {errors.agreedToTermsError && (
          <p className="alert">{errors.agreedToTermsError}</p>
        )}
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Current Username: {formState.username}</p>
        <p>Current Email: {formState.email}</p>
        <p>Fun Fact: {formState.funFact}</p>
        <p>Favorite Language: {formState.favoriteLanguage}</p>
        <p>Agreed to Terms: {`${formState.agreedToTerms}`}</p>
      </div>
    </div>
  );
}
