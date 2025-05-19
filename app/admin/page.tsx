"use client";

import { useState, useEffect } from "react";

interface Product {
  ma_mon_an: number;
  ten_mon_an: string;
  gia: number;
  danh_muc: string;
  mo_ta: string;
  isNew?: boolean; // đánh dấu sản phẩm mới
}

export default function AdminHomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    ten_mon_an: "",
    gia: 0,
    danh_muc: "",
    mo_ta: "",
  });

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
  }, [products]);


  const handleAddProduct = async () => {
    const nextId =
      products.length > 0
        ? Math.max(...products.map((p) => p.ma_mon_an)) + 1
        : 1;
    const newProd: Product = { ...newProduct, ma_mon_an: nextId, isNew: true };
    
    setProducts([...products, newProd]);
    setNewProduct({ ten_mon_an: "", gia: 0, danh_muc: "", mo_ta: "" });
  };

  const handleSaveNewProduct = async (id: number) => {
    const product = products.find((p) => p.ma_mon_an === id);
    if (!product) return;

    try {
      const response = await fetch('http://localhost:3001/thuc-don/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          danhmuc: product.danh_muc,
          ten: product.ten_mon_an,
          mota: product.mo_ta,
          gia: product.gia,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error("Tạo thực đơn thất bại: " + errText);
      }

      // Nếu thành công, cập nhật isNew
      setProducts((prev) =>
        prev.map((p) =>
          p.ma_mon_an === id ? { ...p, isNew: false } : p
        )
      );
    } catch (error) {
      console.error(error);
      alert("Lỗi khi lưu sản phẩm mới.");
    }
  };


  const handleDelete = async (id: number) => {
    const product = products.find((p) => p.ma_mon_an === id);
    if (!product) return;

    try {
      const response = await fetch('http://localhost:3001/thuc-don/' + product.ma_mon_an, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error("Xóa thực đơn thất bại: " + errText);
      }

      setProducts(products.filter((p) => p.ma_mon_an !== id));

    } catch (error) {
      console.error(error);
      alert("Lỗi khi xóa sản phẩm mới.");
    }
    
  };

  const handleEditProduct = async (updatedProduct: Product) => {

    try {
      const response = await fetch('http://localhost:3001/thuc-don/' + updatedProduct.ma_mon_an, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          danhmuc: updatedProduct.danh_muc,
          ten: updatedProduct.ten_mon_an,
          mota: updatedProduct.mo_ta,
          gia: updatedProduct.gia,
        }),
        
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error("Cập nhật thực đơn thất bại: " + errText);
      }

      setProducts((prev) =>
      prev.map((p) =>
        p.ma_mon_an === updatedProduct.ma_mon_an ? updatedProduct : p
      )
    );
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật sản phẩm mới.");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.ten_mon_an.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{
        background: "linear-gradient(135deg, #0f0f0f, #1a1a2e, #3b3b58)",
      }}
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-400">
        Admin - Quản lý món ăn
      </h1>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 text-black">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded">NEW</span>
            Thêm món mới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Danh mục"
              value={newProduct.danh_muc}
              onChange={(e) =>
                setNewProduct({ ...newProduct, danh_muc: e.target.value })
              }
              className="p-2 rounded border"
            />
            <input
              type="text"
              placeholder="Tên món"
              value={newProduct.ten_mon_an}
              onChange={(e) =>
                setNewProduct({ ...newProduct, ten_mon_an: e.target.value })
              }
              className="p-2 rounded border"
            />
            <input
              type="number"
              placeholder="Giá"
              value={newProduct.gia}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  gia: parseInt(e.target.value) || 0,
                })
              }
              className="p-2 rounded border"
            />
            <input
              type="text"
              placeholder="Mô tả"
              value={newProduct.mo_ta}
              onChange={(e) =>
                setNewProduct({ ...newProduct, mo_ta: e.target.value })
              }
              className="p-2 rounded border"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
          >
            <span className="text-xl">➕</span> Thêm món
          </button>
        </div>

        <table className="w-full border-collapse shadow-md">
          <thead className="bg-orange-100 text-gray-800">
            <tr>
              <th className="border p-3">Tên món</th>
              <th className="border p-3">Giá</th>
              <th className="border p-3">Danh mục</th>
              <th className="border p-3">Mô tả</th>
              <th className="border p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.ma_mon_an} className="bg-white">
                <td className="border p-2">
                  <input
                    type="text"
                    value={p.ten_mon_an}
                    onChange={(e) =>
                      handleEditProduct({ ...p, ten_mon_an: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={p.gia}
                    onChange={(e) =>
                      handleEditProduct({
                        ...p,
                        gia: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={p.danh_muc}
                    onChange={(e) =>
                      handleEditProduct({ ...p, danh_muc: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={p.mo_ta}
                    onChange={(e) =>
                      handleEditProduct({ ...p, mo_ta: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border p-2 text-center space-y-2">
                  {p.isNew ? (
                    <>
                      <button
                        onClick={() => handleSaveNewProduct(p.ma_mon_an)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full"
                      >
                        💾 Lưu
                      </button>
                      <button
                        onClick={() => handleDelete(p.ma_mon_an)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                      >
                        🗑️ Xóa
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditProduct(p)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(p.ma_mon_an)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                      >
                        🗑️ Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  Không có món ăn nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
