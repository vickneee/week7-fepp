import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import useLogin from '../hooks/useLogin.jsx';

const Signup = () => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({
      email: email.value,
      password: password.value,
    });
    if (!error) {
      console.log("Login successful");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Log In</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Signup;
