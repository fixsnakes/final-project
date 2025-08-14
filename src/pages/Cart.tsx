import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const cart = useSelector((state: RootState) => state.cart.items);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!isAuthenticated) {
        navigate("/login");
        } else {
    
        navigate("/checkout");
        }
    };

    if (cart.length === 0) {
        return <p className="text-center mt-10">Your cart is empty.</p>;
    }

    return (
        <div className="container mx-auto py-8">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>
        <div className="space-y-4">
            {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p>{item.price.toLocaleString()}₫</p>
                <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                    dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                    }
                    className="border px-2 py-1 w-16 mt-1"
                />
                </div>
                <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:underline"
                >
                Remove
                </button>
            </div>
            ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
            <p className="font-bold">Total: {total.toLocaleString()}₫</p>
            <div className="flex gap-4">
            <button
                onClick={() => dispatch(clearCart())}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
                Clear Cart
            </button>
            <button
                onClick={handleCheckout}
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
                >
                {isAuthenticated ? "Checkout" : "Sign in to Checkout"}
            </button>

        </div>
      </div>
    </div>
  );
}
