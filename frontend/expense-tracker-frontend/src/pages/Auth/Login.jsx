import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { loginUser } from "../../services/authService.js";  

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      login(res.token);

      setErrors([]);

      alert("Login Successfully");

      navigate("/dashboard");

    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([
          {
            msg:
              error.response?.data?.message ||
              "Invalid email or password",
          },
        ]);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Welcome Back 👋
        </h2>

        {errors.length > 0 && (
          <div className="mb-4 text-red-400 text-sm">
            {errors.map((err, i) => (
              <p key={i}>{err.msg}</p>
            ))}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-5 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full  bg-green-600 hover:bg-green-700 transition py-3 rounded text-white font-semibold"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-500 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;