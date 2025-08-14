import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto py-10 text-center">
    <img className="w-full h-72 object-cover rounded-md mb-5" src="https://file.hstatic.net/200000103143/file/banner_mb_copy_3_4461db0f887f4d12aa43cd87ffbb3129.jpg" alt="" />
      <h1 className="text-4xl font-bold text-pink-600 mb-4">Welcome to Adamo Jewelry Store</h1>
      <p className="text-lg text-gray-700 mb-6">
        Discover our beautiful collection of jewelry and accessories.
      </p>
      <Link
        to="/products"
        className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Shop Now
      </Link>
    </div>
  );
}
