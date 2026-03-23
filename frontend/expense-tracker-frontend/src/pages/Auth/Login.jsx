import { useState } from "react";
import API from "../../services/api";

const Login = () => {
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
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      setErrors([]);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
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

        {/* Errors */}
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
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded text-white font-semibold">
          Login
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account? <span className="text-blue-500">Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;