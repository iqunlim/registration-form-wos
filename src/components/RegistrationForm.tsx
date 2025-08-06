import { useState } from "react";

type RegistrationFormFields = {
  username: string;
  email: string;
};

export default function RegistrationForm() {
  const [formState, setFormState] = useState<RegistrationFormFields>({
    username: "",
    email: "",
  });

  const handleSumbit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert(
      `Submitted Username: ${formState.username}\nSubmitted Email: ${formState.email}`
    );
  };

  const handleTextInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
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
            onChange={handleTextInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleTextInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Current Username: {formState.username}</p>
        <p>Current Email: {formState.email}</p>
      </div>
    </div>
  );
}
