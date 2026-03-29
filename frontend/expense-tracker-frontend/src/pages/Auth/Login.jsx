import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { loginUser } from "../../services/authService.js";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const res = await loginUser(formData);
      login(res);
      // Brief delay for UX so they see the success state
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid email or password";
      setErrors([{ msg: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/5"
      >
        <h2 className="text-4xl font-black mb-2 text-center text-white tracking-tight">
          Welcome Back <span className="text-blue-500">👋</span>
        </h2>
        <p className="text-gray-400 text-center mb-8">Login to manage your finances.</p>

        {errors.length > 0 && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm text-center">
            {errors[0].msg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              onChange={handleChange}
              required
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-blue-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-4 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Login"}
          </button>

          <p className="text-gray-500 text-sm text-center mt-6">
            New here?{" "}
            <span onClick={() => navigate("/signup")} className="text-blue-400 font-bold cursor-pointer hover:underline">
              Create Account
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;