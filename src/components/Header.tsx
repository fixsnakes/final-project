import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-pink-500" : "hover:text-pink-500";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink to="/" className="text-xl font-bold text-pink-600">Adamo Jewelry Shop</NavLink>
        <nav className="flex gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
          <NavLink to="/cart" className={linkClass + " relative"}>
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
