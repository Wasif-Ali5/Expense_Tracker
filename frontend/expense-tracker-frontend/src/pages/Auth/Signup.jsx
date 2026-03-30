import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService.js";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      await registerUser(formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
   } catch (error) {
      console.log("Full Error Object:", error.response); // Debugging line
      
      // Check if it's a validation array (common in express-validator) or a single message
      const errorMsg = 
        error.response?.data?.errors?.[0]?.msg || 
        error.response?.data?.message || 
        "An unexpected error occurred";
        
      setErrors([{ msg: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/5"
      >
        <h2 className="text-4xl font-black mb-2 text-center text-white tracking-tight">
          Join Us <span className="text-emerald-500">🚀</span>
        </h2>
        <p className="text-gray-400 text-center mb-8">Start tracking your growth today.</p>

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">
            Account created! Redirecting to login...
          </div>
        )}

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm text-center">
            {errors[0].msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              onChange={handleChange}
              required
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
              required
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-emerald-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-4 text-gray-500"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          {showPasswordRules && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="bg-gray-900/50 p-3 rounded-lg text-[10px] text-gray-400 border border-gray-700">
              <p className="font-bold mb-1 uppercase text-gray-500">Security Checklist:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Min. 5 letters & 2 numbers</li>
                <li>At least 1 special character</li>
              </ul>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className={`w-full py-4 mt-2 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading ? "bg-gray-700 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20"
            }`}
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign Up"}
          </button>

          <p className="text-gray-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="text-emerald-400 font-bold cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;