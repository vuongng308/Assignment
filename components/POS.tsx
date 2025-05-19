"use client";
import { useEffect, useState, useRef } from "react";

interface Product {
  ma_mon_an: number;
  ten_mon_an: string;
  gia: number;
  danh_muc: string;
  mo_ta: string;
  isNew?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  maDonHang: string | number;
  userId: string | number;
  createdAt: string;
  tongTien: number;
  trangThai: string;
  chiTietDonHang: {
    ma_mon_an: number;
    soLuong: number;
    donGia: number;
  }[];
}

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "history">("menu");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderCodeInput, setOrderCodeInput] = useState<string>("");
  const [hasNewOrder, setHasNewOrder] = useState(false);
  const lastAlertedOrderIdRef = useRef<string | number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const prevOrdersRef = useRef<Order[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/thuc-don");
        if (!res.ok) throw new Error("Lỗi tải danh sách sản phẩm");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("loadProducts error:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
        const res = await fetch("http://localhost:3001/orders");
        if (!res.ok) throw new Error("Lỗi tải đơn hàng");
        const data = await res.json();

        if (res.ok && data.donHangs) {
            const newOrder = data.donHangs.find(
            (order: Order) =>
                order.trangThai === "Đang xử lý" &&
                !prevOrdersRef.current.some(
                (prev) => prev.maDonHang === order.maDonHang
                )
            );

            if (
            newOrder &&
            newOrder.maDonHang !== lastAlertedOrderIdRef.current
            ) {
            setHasNewOrder(true); // Bật chấm đỏ
            lastAlertedOrderIdRef.current = newOrder.maDonHang;
            }

            prevOrdersRef.current = data.donHangs;
            setOrders(data.donHangs);
        }
        } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        }
    };

    const intervalId = setInterval(fetchOrders, 10000); // polling liên tục
    fetchOrders(); // gọi lần đầu

    return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
    if (activeTab === "history") {
        setHasNewOrder(false); 
    }
    }, [activeTab]);


  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.ma_mon_an === product.ma_mon_an);
      if (found) {
        return prev.map((item) =>
          item.ma_mon_an === product.ma_mon_an
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.ma_mon_an !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.ma_mon_an === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.gia * item.quantity,
    0
  );

  // Hàm cập nhật trạng thái đơn hàng lên backend
  const updateOrderStatus = async (orderId: string | number) => {
    try {
      const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trangThai: "Hoàn thành" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Cập nhật trạng thái thất bại");
      }
      return true;
    } catch (error: any) {
      alert("Lỗi khi cập nhật trạng thái: " + error.message);
      return false;
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    if (orderCodeInput.trim()) {
      const success = await updateOrderStatus(orderCodeInput.trim());
      if (success) {
        alert(
          "Thanh toán thành công! Trạng thái đơn hàng đã được cập nhật thành Hoàn thành."
        );
        setCart([]);
        setOrderCodeInput("");
        if (activeTab === "history") {
          // Reload lại danh sách đơn hàng
          const res = await fetch("http://localhost:3001/orders");
          const data = await res.json();
          if (res.ok) {
            setOrders(data.donHangs);
            prevOrdersRef.current = data.donHangs;
          }
        }
      }
    } else {
      alert("Thanh toán thành công!");
      setCart([]);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-[#1a1a2e] text-white">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          showSidebar ? "w-48" : "w-0"
        } bg-[#2c2c3e] overflow-hidden`}
      >
        <div className="flex flex-col h-full p-4 space-y-4">
          <button
            onClick={() => setActiveTab("menu")}
            className={`text-left px-2 py-2 rounded hover:bg-[#3b3b58] ${
              activeTab === "menu" && "bg-[#3b3b58]"
            }`}
          >
            Món ăn
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`text-left px-2 py-2 rounded hover:bg-[#3b3b58] ${
              activeTab === "history" && "bg-[#3b3b58]"
            }`}
          >
            Lịch sử đơn hàng
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Toggle Sidebar */}
        <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="relative mb-4 px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
        {showSidebar ? "✖ Đóng menu" : "☰ Mở menu"}

        {hasNewOrder && !showSidebar && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full blink" />
        )}
        </button>

        {/* Main Content */}
        {activeTab === "menu" ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-orange-500 text-center">
              POS - Bán hàng
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Danh sách món */}
              <div className="bg-[#2c2c3e] p-4 rounded-[20px] shadow">
                <h2 className="text-xl font-semibold mb-3">
                  📋 Danh sách món ăn
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {paginatedProducts.map((p, index) => (
                    <div
                      key={p.ma_mon_an}
                      className="border border-white/20 rounded-lg p-4 shadow hover:shadow-md transition"
                    >
                      <h3 className="text-lg font-semibold">
                        {(currentPage - 1) * itemsPerPage + index + 1}.{" "}
                        {p.ten_mon_an}
                      </h3>
                      <p>Giá: {p.gia.toLocaleString()}đ</p>
                      <button
                        onClick={() => addToCart(p)}
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Thêm
                      </button>
                    </div>
                  ))}
                </div>
                {/* Nút chuyển trang */}
                <div className="mt-6 flex justify-center items-center gap-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
                  >
                    ← Trước
                  </button>
                  <span className="text-white font-medium">
                    Trang {currentPage}/{totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
                  >
                    Sau →
                  </button>
                </div>
              </div>

              {/* Giỏ hàng */}
              <div className="bg-[#2c2c3e] p-4 rounded-[20px] shadow">
                <h2 className="text-xl font-semibold mb-3">🛒 Giỏ hàng</h2>
                {cart.length === 0 ? (
                  <p className="text-white/60">Chưa có món nào được chọn.</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.ma_mon_an}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold">{item.ten_mon_an}</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              className="w-16 p-1 border rounded text-white bg-transparent"
                              onChange={(e) =>
                                updateQuantity(
                                  item.ma_mon_an,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <span className="text-white/80">
                              x {item.gia.toLocaleString()}đ
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.ma_mon_an)}
                          className="text-red-400 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}

                    {/* Input nhập mã đơn hàng */}
                    <div className="mt-4">
                      <label className="block mb-1" htmlFor="orderCodeInput">
                        Mã đơn hàng:
                      </label>
                      <input
                        id="orderCodeInput"
                        type="text"
                        value={orderCodeInput}
                        onChange={(e) => setOrderCodeInput(e.target.value)}
                        placeholder="Nhập mã đơn hàng"
                        className="w-full p-2 rounded bg-[#3b3b58] text-white border border-gray-600"
                      />
                    </div>

                    <div className="pt-4 border-t mt-4">
                      <p className="text-right font-bold text-lg text-green-400">
                        Tổng: {totalAmount.toLocaleString()}đ
                      </p>
                      <button
                        onClick={handleCheckout}
                        className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                      >
                        Thanh toán
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.maDonHang}
                    className="border-b border-white/20 pb-4"
                  >
                    <p>
                      <strong>Mã đơn hàng:</strong> {order.maDonHang}
                    </p>
                    <p>
                      <strong>Người dùng:</strong> {order.userId}
                    </p>
                    <p>
                      <strong>Ngày đặt:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong> {order.tongTien.toLocaleString()}
                      đ
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {order.trangThai}
                    </p>
                    <h4 className="mt-2 font-semibold">Chi tiết:</h4>
                    <ul className="list-disc list-inside ml-4">
                      {order.chiTietDonHang.map((item, index) => (
                        <li key={index}>
                          Món: {item.ma_mon_an} - SL: {item.soLuong} - Đơn giá:{" "}
                          {item.donGia.toLocaleString()}đ
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>Chưa có đơn hàng nào trong lịch sử.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
