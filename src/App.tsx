import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./route/AppRoutes";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen p-4">
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}
