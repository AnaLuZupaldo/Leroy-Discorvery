import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/Catalogo/CatalogPage";
import ScanPage from "./pages/ScanPage/ScanPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import StoreAvailabilityPage from "./pages/StoreAvaliable/StoreAvailabilityPage";
import StoreMapPage from "./pages/StoreMap/StoreMapPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import BoasVindas from "./pages/BoasVindas/BoasVindas";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoasVindas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/availability" element={<StoreAvailabilityPage />} />
        <Route path="/store-map" element={<StoreMapPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
    </Router>
  );
}
