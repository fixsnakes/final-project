import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { clearCart } from "../store/cartSlice";
import { useNavigate, Navigate } from "react-router-dom";

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}

export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) return;
    console.log("Order data:", { formData, cart });
    dispatch(clearCart());

    alert("Order placed successfully!");
    navigate("/products");
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (cart.length === 0) {
    return <p className="text-center mt-10">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Giỏ hàng */}
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <p>{item.title} x {item.quantity}</p>
              <p>{(item.price * item.quantity).toLocaleString()}₫</p>
            </div>
          ))}
          <p className="font-bold mt-4">Total: {total.toLocaleString()}₫</p>
        </div>

        {/* Form thông tin cá nhân */}
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
