"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import allProducts from "@/data/products";
import { Product } from "@/types";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Cupcake");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("currentUser");
    if (storedUsername) {
      setUsername(storedUsername);
  
      // Tải giỏ hàng từ localStorage theo tài khoản
      const savedCart = localStorage.getItem(`cart_${storedUsername}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setUsername(null);
      setCart([]); // Giỏ hàng trống nếu không có người dùng
    }
  }, []);
  

  useEffect(() => {
    if (username) {
      if (cart.length > 0) {
        localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
      } else {
        localStorage.removeItem(`cart_${username}`);
      }
    }
  }, [cart, username]);
  

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== product.id));
  };

  const handleIncreaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const filteredProducts = allProducts[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header username={username} />
      
      <div className="pt-16 px-4"> {/* Thêm padding-top tránh header */}
        <CategoryMenu
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart} // Truyền đúng tên prop
        />
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