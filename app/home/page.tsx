"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import { Product, Donhang } from "@/types";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Cupcake");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [allProducts, setProduct] = useState<Product[]>([]);

  const isFirstRun = useRef(true);
  const isCartInitialized = useRef(false);

  // Cập nhật giỏ hàng lên backend
  const updateCartToBackend = async (cartData: { product: Product; quantity: number }[]) => {
    const storedUsername = localStorage.getItem("currentUser");
    if (!storedUsername) return;

    try {
      // Lấy userId theo username
      const res = await fetch(`http://localhost:3001/cart/username/${storedUsername}`);
      if (!res.ok) throw new Error("Lỗi lấy userId");
      const userId = await res.json();

      // Chuẩn bị dữ liệu gửi lên backend
      const donHangPayload: Donhang = {
        userId,
        items: cartData.map(item => ({
          ma_mon_an: item.product.ma_mon_an,
          soLuong: item.quantity,
          donGia: item.product.gia,
        })),
      };

      // Gửi PUT cập nhật giỏ hàng
      const resUpdate = await fetch(`http://localhost:3001/cart/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donHangPayload),
      });
      if (!resUpdate.ok) throw new Error("Lỗi cập nhật giỏ hàng");
    } catch (error) {
      console.error("updateCartToBackend error:", error);
    }
  };

  // Khi cart thay đổi, trừ lần render đầu tiên
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (isCartInitialized.current) {
      updateCartToBackend(cart);
    }
  }, [cart]);

  // Khởi tạo user và load giỏ hàng từ backend
  useEffect(() => {
    const storedUsername = localStorage.getItem("currentUser");
    if (!storedUsername) {
      setUsername(null);
      setCart([]);
      return;
    }

    setUsername(storedUsername);

    const fetchCartData = async () => {
      try {
        // Lấy userId
        const resUser = await fetch(`http://localhost:3001/cart/username/${storedUsername}`);
        if (!resUser.ok) throw new Error("Lỗi lấy userId");
        const userId = await resUser.json();

        // Kiểm tra trạng thái cart
        const resCheck = await fetch(`http://localhost:3001/cart/fid/${userId}`);
        if (!resCheck.ok) throw new Error("Lỗi kiểm tra cart");
        const checkData = await resCheck.json();

        let cartData: { product: Product; quantity: number }[] = [];
        if (checkData.text) {
          // Nếu có cart, lấy chi tiết
          const resCart = await fetch(`http://localhost:3001/cart/id/${userId}`);
          if (!resCart.ok) throw new Error("Lỗi lấy cart chi tiết");
          const cartFromBackend = await resCart.json();
          cartData = Array.isArray(cartFromBackend) ? cartFromBackend : [];
        }

        setCart(cartData);
        isCartInitialized.current = true;
      } catch (error) {
        console.error("fetchCartData error:", error);
        setCart([]);
        isCartInitialized.current = true;
      }
    };

    fetchCartData();
  }, []);

  // Đồng bộ cart lên localStorage theo user
  useEffect(() => {
    if (!username) return;
    if (cart.length > 0) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
    } else {
      localStorage.removeItem(`cart_${username}`);
    }
  }, [cart, username]);

  // Xử lý thêm sản phẩm vào giỏ
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.ma_mon_an === product.ma_mon_an);
      if (exist) {
        return prev.map(item =>
          item.product.ma_mon_an === product.ma_mon_an
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const handleRemoveFromCart = (product: Product) => {
    setCart(prev => prev.filter(item => item.product.ma_mon_an !== product.ma_mon_an));
  };

  // Tăng số lượng sản phẩm trong giỏ
  const handleIncreaseQuantity = (product: Product) => {
    setCart(prev =>
      prev.map(item =>
        item.product.ma_mon_an === product.ma_mon_an
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Giảm số lượng sản phẩm trong giỏ (nếu số lượng = 0 thì xóa khỏi giỏ)
  const handleDecreaseQuantity = (product: Product) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.ma_mon_an === product.ma_mon_an
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Load toàn bộ sản phẩm
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/thuc-don");
        if (!res.ok) throw new Error("Lỗi tải danh sách sản phẩm");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("loadProducts error:", error);
      }
    };
    loadProducts();
  }, []);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = allProducts.filter(
    (product) => product.danh_muc === selectedCategory
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0f0f0f, #1a1a2e, #3b3b58)" }}
    >
      <Header username={username} />

      <div className="pt-16 px-4">
        <CategoryMenu selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>

      <Cart
        items={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
    </div>
  );
}
