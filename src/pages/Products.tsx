import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import type { Product } from "../types/product";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ImageSlider from "../components/ImageSlider";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const fetchNormalProducts = async (page: number) => {
    const url = `https://pandora.norbreeze.vn/collections/charms/products.json?limit=36&page=${page}&include=metafields[product]`;
    const res = await fetch(url);
    const data = await res.json();

    const totalProducts = data.total || 644;
    const pages = Math.ceil(totalProducts / 36);
    const mapped: Product[] = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      image: p.image?.src || "",
      price: Number(p.variants?.[0]?.price || 0),
    }));

    setProducts(mapped);
    setTotalPages(pages);
    setTotalProduct(totalProducts);
  };

  const fetchSortedProducts = async (page: number, sort: "asc" | "desc") => {
    const sortParam = sort === "asc" ? "asc" : "desc";
    const url = `https://pandora.norbreeze.vn/search.js?q=filter=(collectionid:product=1002229086)&sortby=(price:product=${sortParam})&include=metafields[product]&page=${page}&limit=36`;
    const res = await fetch(url);
    const data = await res.json();

    const totalItems = data.total || 1000;
    const pages = Math.ceil(totalItems / 36);
    const mapped: Product[] = (data.products || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      image: p.featured_image,
      price: Math.floor(Number(p.price || 0) / 100),
    }));

    setProducts(mapped);
    setTotalPages(pages);
    setTotalProduct(totalItems);
  };

  const fetchSearchedProducts = async (page: number, query: string) => {
    const url = `https://pandora.norbreeze.vn/search.js?q=filter=((title:product%20**%20${encodeURIComponent(
      query
    )})||(tag:product%20**%20${encodeURIComponent(
      query
    )})||(sku:product%20**%20${encodeURIComponent(
      query
    )})||(barcode:product%20**%20${encodeURIComponent(query)}))&include=metafields[product]&page=${page}&limit=36`;
    const res = await fetch(url);
    const data = await res.json();

    const totalItems = data.total || 0;
    const pages = Math.ceil(totalItems / 36);
    const mapped: Product[] = (data.products || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      image: p.featured_image,
      price: Math.floor(Number(p.price || 0) / 100),
    }));

    setProducts(mapped);
    setTotalPages(pages);
    setTotalProduct(totalItems);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (searchQuery) {
          await fetchSearchedProducts(currentPage, searchQuery);
        } else if (sortOrder) {
          await fetchSortedProducts(currentPage, sortOrder);
        } else {
          await fetchNormalProducts(currentPage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, sortOrder, searchQuery]);

  return (

    
    <div className="p-15">
        <ImageSlider
        images={[
            "https://file.hstatic.net/200000103143/file/main_banner__2__a417be5cd38d47ed9bb8dddc3a1f0bb8.jpg",
            "https://file.hstatic.net/200000103143/file/ldp_mob_cate_1.jpg",
            "https://file.hstatic.net/200000103143/file/ldp_mob_cate_5.jpg",
            "https://file.hstatic.net/200000103143/file/mobile_35636fc4a7d346e3b8307d74e7de4731.jpg",
        ]}
        />
        <h1 className="text-2xl font-bold mb-4">Product List</h1>

        <div className="flex items-center gap-4 mb-6 justify-between">
            <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-60"
            />
            {!searchQuery && (
            <div className="flex items-center gap-4">
                <select
                value={sortOrder}
                onChange={(e) =>
                    setSortOrder(e.target.value as "" | "asc" | "desc")
                }
                className="border p-2 rounded"
                >
                <option value="">-- Sort by Price --</option>
                <option value="asc">Increase</option>
                <option value="desc">Decrease</option>
                </select>

                {sortOrder && (
                <button
                    onClick={() => setSortOrder("")}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel Sort
                </button>
                )}

                <p>{totalProduct} products</p>
            </div>
            )}
        </div>

        {loading ? (
            <Loader />
        ) : (
            <div className="grid grid-cols-4 gap-4">
            {products.map((p) => (
                <div
                key={p.id}
                className="border border-gray-200 p-6 rounded-md flex flex-col"
                >
                <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                />
                <h2 className="mt-2 font-semibold h-16">{p.title}</h2>
                <p className="text-red-500 font-bold">
                    {p.price.toLocaleString("vi-VN")} ₫
                </p>
                <div className="flex justify-center mt-auto">
                    <button
                    onClick={() => dispatch(addToCart({ ...p, quantity: 1 }))}
                    className="bg-pink-500 mt-2 text-white px-4 py-2 rounded hover:bg-pink-600"
                    >
                    Add to Cart
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
        />
        </div>
  );
}
