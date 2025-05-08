"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CustomerInfo() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"account" | "history" | "rewards" | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === "history" || hash === "rewards") {
      setSelectedTab(hash);
    } else {
      setSelectedTab("account");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    router.push("/login");
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
                  <h2 className="text-2xl font-bold text-white mb-6">Cập nhật thông tin</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Họ"
                      className="p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="Tên"
                      className="p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    className="w-full p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      className="w-full p-3 bg-[#1d1b35] border border-[#37335e] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                    <button className="absolute right-3 top-3 text-gray-400 hover:text-orange-500">
                    </button>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:brightness-110 transition">
                      Lưu thay đổi
                    </button>
                    <button className="bg-[#1d1b35] border border-[#37335e] text-white px-6 py-2 rounded-lg hover:bg-[#37335e] transition">
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              )}

              {selectedTab === "rewards" && (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Điểm thưởng</h2>
                    <p className="text-gray-400">Chức năng đang được phát triển</p>
                    <div className="mt-4 animate-pulse">
                      <div className="h-48 bg-[#1d1b35] rounded-xl"></div>
                    </div>
                  </div>
                )}

              {selectedTab === "history" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-white mb-4">Lịch sử đơn hàng</h2>
                  <p className="text-gray-400">Chức năng đang được phát triển</p>
                  <div className="mt-4 animate-pulse">
                    <div className="h-48 bg-[#1d1b35] rounded-xl"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}