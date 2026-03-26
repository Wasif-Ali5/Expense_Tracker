import { useState } from "react";
import API from "../../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPasswordRules, setShowPasswordRules] = useState(false);
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
      await API.post("/users/register", formData);

      alert(res.data.message ||  "Signup Successfully");
      setErrors([]);

      } catch (error) {
    console.log(error.response);

    if (error.response) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);

      } else if (error.response.data.message) {
        setErrors([{ msg: error.response.data.message }]);

      } else {
        setErrors([{ msg: "Something went wrong" }]);
      }
    } else {
      setErrors([{ msg: "Server not reachable" }]);
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
          Create Account 🚀
        </h2>

       {errors.length > 0 && (
          <div className="mb-4 text-red-400 text-sm">
          <p>{errors[0].msg}</p>
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
          onFocus={() => setShowPasswordRules(true)}
          onBlur={() => setShowPasswordRules(false)}
          className="w-full mb-5 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />
        {showPasswordRules && (
             <div className="text-gray-400 text-xs mb-4">
              <p>Password must contain at least :</p>
            <ul className="list-disc ml-4">
               <li>5 letters</li>
               <li>2 numbers</li>
               <li>1 special character</li>
            </ul>
            </div>
       )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded text-white font-semibold"
        >
          SignUp
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? 
          <span 
          onClick={() => navigate("/login")}
          className="text-green-500">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;