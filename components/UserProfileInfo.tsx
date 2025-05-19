"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderHistory from "../components/OrderHistory";
import RewardPoints from "../components/RewardPoints";
import Image from "next/image";

export default function CustomerInfo() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"account" | "history" | "rewards" | null>(null);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === "history" || hash === "rewards") {
      setSelectedTab(hash);
    } else {
      setSelectedTab("account");
    }

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setUserInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
        password: "",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSaveChanges = async () => { 
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.userId;

  // Kiểm tra xem userId có tồn tại không
  if (!userId) {
    alert("Không tìm thấy userId! Bạn cần đăng nhập lại.");
    router.push("/login");
    return;
  }

  // Xử lý thông tin mật khẩu, nếu không thay đổi thì không gửi mật khẩu
  const updatedUserInfo = {
    username: userInfo.username,
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
  };

  try {
    // Gửi yêu cầu PUT đến backend
    const response = await fetch(`http://localhost:3001/auth/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserInfo),
    });

    if (response.ok) {
      // Kiểm tra xem phản hồi có phải là JSON không
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        alert("Cập nhật thông tin thành công");

        // Cập nhật lại thông tin trong localStorage
        localStorage.setItem("user", JSON.stringify({
          ...user,
          username: userInfo.username,
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        }));
      } else {
        const text = await response.text();
        alert(`Thông báo: ${text}`);
        console.log("Phản hồi từ server:", text);
      }
    } else {
      alert("Có lỗi xảy ra khi cập nhật thông tin");
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    if (error instanceof Error) {
      alert(`Lỗi kết nối tới server: ${error.message}`);
    } else {
      alert("Lỗi kết nối tới server: Không xác định");
    }
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-[#1d1b35] border-b border-[#37335e] sticky top-0 z-50">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push("/home")}
        >
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-orange-500 font-bold text-xl">Trang chủ</span>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[260px] border-r border-[#37335e] p-5 bg-[#1d1b35]">
          <div className="flex flex-col items-center gap-3 mb-5">
            <div className="w-24 h-24 bg-[#2a2746] rounded-full border-2 border-orange-500" />
            <h1 className="text-lg font-bold text-white">Thông tin tài khoản</h1>
          </div>

          <ul className="divide-y divide-[#37335e]">
            <li
              className="py-3 hover:bg-[#2a2746] cursor-pointer text-center text-white font-medium transition-colors"
              onClick={() => setSelectedTab("account")}
            >
              Quản lý tài khoản
            </li>
            <li
              className="py-3 hover:bg-[#2a2746] cursor-pointer text-center text-white font-medium transition-colors"
              onClick={() => setSelectedTab("history")}
            >
              Lịch sử đơn hàng
            </li>
            <li
              className="py-3 hover:bg-[#2a2746] cursor-pointer text-center text-white font-medium transition-colors"
              onClick={() => setSelectedTab("rewards")}
            >
              Điểm thưởng
            </li>
            <li
              className="py-3 hover:bg-[#2a2746] cursor-pointer text-center text-red-400 font-medium transition-colors"
              onClick={handleLogout}
            >
              Đăng xuất
            </li>
          </ul>
        </div>

        {/* Main content */}
        {selectedTab && (
          <div className="flex-1 flex justify-center items-start p-8">
            <div className="w-full max-w-4xl bg-[#2a2746] p-6 rounded-xl border border-[#37335e] shadow-2xl">
              {selectedTab === "account" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">Cập nhật thông tin</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleInputChange}
                      placeholder="Họ"
                      className="p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleInputChange}
                      placeholder="Tên"
                      className="p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleInputChange}
                    placeholder="Tên đăng nhập"
                    className="w-full p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={userInfo.password}
                      onChange={handleInputChange}
                      placeholder="Mật khẩu"
                      className="w-full p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                    <button className="absolute right-3 top-3 text-gray-400 hover:text-orange-500" />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:brightness-110 transition"
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={() => router.push("/home")}
                      className="bg-[#1d1b35] border border-[#37335e] text-white px-6 py-2 rounded-lg hover:bg-[#37335e] transition"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              )}

              {selectedTab === "rewards" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-white mb-4">Điểm thưởng</h2>
                  <RewardPoints />
                </div>
              )}

              {selectedTab === "history" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-white mb-4">Lịch sử đơn hàng</h2>
                  <OrderHistory />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}