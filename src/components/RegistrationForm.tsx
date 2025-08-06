import { useState } from "react";

// Form type
type RegistrationFormFields = {
  username: string;
  email: string;
  funFact: string;
  favoriteLanguage: string;
  agreedToTerms: boolean;
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

  const handleSumbit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert(
      `Submitted Username: ${formState.username}\nSubmitted Email: ${
        formState.email
      }\nSubmittedFunFact: ${formState.funFact}\nSubmitted Favorite Language: ${
        formState.favoriteLanguage
      }\nAgreed to terms? ${formState.agreedToTerms ? "Yes" : "No"}`
    );
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
        throw new TypeError("Invalid HTML Input Element");
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
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Fun Fact About You:
          <textarea
            name="funFact"
            value={formState.funFact}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
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
        <label>
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formState.agreedToTerms}
            onChange={handleInputChange}
          />
          I Agree to the Terms and Conditions
        </label>
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
