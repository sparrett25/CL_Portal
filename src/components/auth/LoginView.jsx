import { useUserSync } from "@/context/UserSyncContext";  // Correct import
import { useNavigate } from "react-router-dom";

export default function LoginView() {
  const { user } = useUserSync();  // Get user from context
  const navigate = useNavigate();

  if (user) {
    navigate("/home");  // Redirect to home page if already logged in
  }

  const handleLogin = async (email, password) => {
    // Login logic using Supabase
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
      } else {
        navigate("/home");  // Redirect to home page after successful login
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {/* Your login form */}
    </div>
  );
}
