import { useState } from "react";
import {
  validateAgreedToTerms,
  validateEmail,
  validateFavoriteLanguage,
  validateFunFact,
  validateUserName,
} from "../validators";

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
  username?: string;
  email?: string;
  funFact?: string;
  favoriteLanguage?: string;
  agreedToTerms?: string;
};

// Has Touched type: For Blur effects
type HasTouchedField = {
  username: boolean;
  email: boolean;
  funFact: boolean;
  favoriteLanguage: boolean;
  agreedToTerms: boolean;
};

// Type for every different element in the form. Just for readability and modification
type InputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function RegistrationForm() {
  // Form State, with defaults
  const [formState, setFormState] = useState<RegistrationFormFields>({
    username: "",
    email: "",
    funFact: "",
    favoriteLanguage: "None",
    agreedToTerms: false,
  });

  // Error state, with an empty default as all fields are optional
  const [errors, setErrors] = useState<RegistrationErrors>({});

  // Has the user touched this field? For the onBlur effects
  const [hasTouchedField, setHasTouchedField] = useState<HasTouchedField>({
    username: false,
    email: false,
    funFact: false,
    favoriteLanguage: false,
    agreedToTerms: false,
  });

  // Handle form submit
  const handleSumbit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors({});
    // We want to say weve touched them all now, so that theres no weird activity
    setHasTouchedField({
      username: true,
      email: true,
      funFact: true,
      favoriteLanguage: true,
      agreedToTerms: true,
    });

    // If there are errors, leave early, do not submit
    const [valid, errors] = validateFields();
    if (!valid) {
      setErrors(errors);
      return;
    }
    // In the real world, this would be some sort of POST request or otherwise
    alert(
      `Submitted Username: ${formState.username}\nSubmitted Email: ${
        formState.email
      }\nSubmittedFunFact: ${formState.funFact}\nSubmitted Favorite Language: ${
        formState.favoriteLanguage
      }\nAgreed to terms? ${formState.agreedToTerms ? "Yes" : "No"}`
    );
  };

  const validateFields = (): [boolean, RegistrationErrors] => {
    // Checking if we ran in to any errors
    let isValid = true;
    // Run validators
    const usernameError = validateUserName(formState.username);
    const emailError = validateEmail(formState.email);
    const funFactError = validateFunFact(formState.funFact);
    const favoriteLanguageError = validateFavoriteLanguage(
      formState.favoriteLanguage
    );
    const agreedToTermsError = validateAgreedToTerms(formState.agreedToTerms);
    // Are any of these more than just ""?
    if (
      usernameError ||
      emailError ||
      funFactError ||
      favoriteLanguageError ||
      agreedToTermsError
    ) {
      // If so, this isnt valid, return false
      isValid = false;
    }
    // Return that error object, and then if we ran in to an error or not
    return [
      isValid,
      {
        username: usernameError,
        email: emailError,
        funFact: funFactError,
        favoriteLanguage: favoriteLanguageError,
        agreedToTerms: agreedToTermsError,
      },
    ];
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

  const handleBlur = (
    e: React.FocusEvent<InputElements>,
    validationCallback: (value: string) => string
  ) => {
    if (hasTouchedField[e.target.name as keyof HasTouchedField]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: validationCallback(e.target.value),
      }));
    }
  };

  const handleCheckedBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    validationCallback: (value: boolean) => string
  ) => {
    if (hasTouchedField[e.target.name as keyof HasTouchedField]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: validationCallback(e.target.checked),
      }));
    }
  };

  // TODO: Break input elements in to their own component
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
            onFocus={(e) =>
              setHasTouchedField((prev) => ({ ...prev, [e.target.name]: true }))
            }
            onBlur={(e) => handleBlur(e, validateUserName)}
          />
        </label>
        {errors.username && <p className="alert">{errors.username}</p>}
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            onFocus={(e) =>
              setHasTouchedField((prev) => ({ ...prev, [e.target.name]: true }))
            }
            onBlur={(e) => handleBlur(e, validateEmail)}
          />
        </label>
        {errors.email && <p className="alert">{errors.email}</p>}
        <label>
          <span>Fun Fact About You: ({100 - formState.funFact.length})</span>
          <textarea
            name="funFact"
            value={formState.funFact}
            onChange={handleInputChange}
            onFocus={(e) =>
              setHasTouchedField((prev) => ({ ...prev, [e.target.name]: true }))
            }
            onBlur={(e) => handleBlur(e, validateFunFact)}
          ></textarea>
        </label>
        {errors.funFact && <p className="alert">{errors.funFact}</p>}
        <label>
          Language:
          <select
            name="favoriteLanguage"
            value={formState.favoriteLanguage}
            onFocus={(e) =>
              setHasTouchedField((prev) => ({ ...prev, [e.target.name]: true }))
            }
            onChange={handleInputChange}
            onBlur={(e) => handleBlur(e, validateFavoriteLanguage)}
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
        {errors.favoriteLanguage && (
          <p className="alert">{errors.favoriteLanguage}</p>
        )}
        <label>
          <p></p>
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formState.agreedToTerms}
            onChange={handleInputChange}
            onFocus={(e) =>
              setHasTouchedField((prev) => ({ ...prev, [e.target.name]: true }))
            }
            onBlur={(e) => handleCheckedBlur(e, validateAgreedToTerms)}
          />
          I Agree to the Terms and Conditions
        </label>
        {errors.agreedToTerms && (
          <p className="alert">{errors.agreedToTerms}</p>
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
