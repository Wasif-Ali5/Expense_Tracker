import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log("Current API URL:", import.meta.env.VITE_API_URL);
  return (
    <AuthProvider>
     <AppRoutes />
    </AuthProvider>
  );
}

export default App;