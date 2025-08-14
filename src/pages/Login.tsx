import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const user = await res.json();

        dispatch(
          loginSuccess({
            id: user.sub,
            name: user.name,
            email: user.email,
            avatar: user.picture,
          })
        );

        localStorage.setItem("token", tokenResponse.access_token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/products");
      } catch (err) {
        console.error(err);
      }
    },
    onError: (err) => console.error("Login Failed:", err),
  });

  return (
    <div className="flex mt-10 items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-semibold mb-6">Welcome to Adamo Shop</h1>
        <p className="text-gray-500 mb-6">Login,Sign Up with your Google account</p>
        <button
          onClick={() => login()}
          className="flex items-center justify-center gap-3 border border-gray-300 hover:shadow-lg hover:bg-gray-50 transition-all w-full py-3 rounded-lg"
        >
          <img
            src="https://img.icons8.com/?size=480&id=17949&format=png"
            alt="Google Logo"
            className="w-6 h-6"
          />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
