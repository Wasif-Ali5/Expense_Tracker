import { useState } from "react";
import API from "../../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);
      alert("Signup Successful");
      setErrors([]);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create Account 🚀
        </h2>

        {errors.length > 0 && (
          <div className="mb-4 text-red-400 text-sm">
            {errors.map((err, i) => (
              <p key={i}>{err.msg}</p>
            ))}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded text-white font-semibold"
        >
          Signup
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? <span className="text-green-500">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;