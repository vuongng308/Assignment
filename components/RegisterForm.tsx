"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Đăng ký thất bại!");
      }
      
      const res1 = await fetch('http://localhost:3001/cart/a', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res1.ok) {
        throw new Error("Không thể tạo giỏ hàng!");
      }

      alert("Đăng ký thành công!");
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0f0f0f, #1a1a2e, #3b3b58)",
      }}
    >
      <div className="flex bg-[#1d1b35] rounded-2xl shadow-2xl w-[880px] p-4 gap-x-8">
        {/* Poster bên trái */}
        <div className="w-1/2 bg-white rounded-xl overflow-hidden">
          <img
            src="/images/POSTER.svg"
            alt="Food Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form bên phải */}
        <div className="w-1/2 p-6 flex flex-col justify-center text-white">
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.svg"
              alt="FASTF Logo"
              className="w-20 h-20 mb-2"
            />
            <h2 className="text-xl font-bold mb-6">ĐĂNG KÝ</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Tên người dùng"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={form.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold hover:brightness-110"
            >
              ĐĂNG KÝ
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-orange-400 hover:underline cursor-pointer"
            >
              ĐĂNG NHẬP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}