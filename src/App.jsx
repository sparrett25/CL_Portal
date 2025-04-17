import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "@/routes/AppRouter"; // Adjust if your path differs
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors closeButton theme="dark" />
      <AppRouter />
    </Router>
  );
}
