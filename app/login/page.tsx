"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Email: ", email);
      console.log("Password: ", password);

      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (!response.ok) {
        throw new Error(data.message || "Email hoặc mật khẩu không đúng!");
      }

      localStorage.setItem("user", JSON.stringify({
        userId: data.userId,
        username: data.username,
        // avatar: data.avatar,
      }));
      localStorage.setItem("currentUser", data.username);

      const savedCart = localStorage.getItem(`cart_${data.username}`);
      if (savedCart) {
        localStorage.setItem("cart", savedCart);
      } else {
        localStorage.setItem("cart", "[]");
      }

      alert("Đăng nhập thành công!");
      router.push("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) return <RegisterForm />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="flex bg-[#1d1b35] rounded-2xl shadow-2xl w-[880px] p-4 gap-x-8">
        <div className="w-1/2 bg-white rounded-xl overflow-hidden">
          <img
            src="/images/POSTER.svg"
            alt="Food Poster"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 p-6 flex flex-col justify-center text-white">
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.svg"
              alt="FASTF Logo"
              className="w-20 h-20 mb-2"
            />
            <h2 className="text-xl font-bold mb-6">ĐĂNG NHẬP</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold hover:brightness-110"
              disabled={loading}
            >
              {loading ? "Đang Đăng Nhập..." : "ĐĂNG NHẬP"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <button
              onClick={() => setShowRegister(true)}
              className="text-orange-400 hover:underline"
            >
              ĐĂNG KÝ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}