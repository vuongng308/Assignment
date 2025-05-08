"use client";

const categories = [
  { id: 1, name: "Cupcake", image: "/images/cupcake.svg" },
  { id: 2, name: "Sea food", image: "/images/seafood.svg" },
  { id: 3, name: "Juice", image: "/images/juice.svg" },
  { id: 4, name: "Nước có ga", image: "/images/nuoc_ga.jpg" },
  { id: 5, name: "Combo tiết kiệm", image: "/images/combo.png" },
  { id: 6, name: "Gà rán", image: "/images/garan.png"},
];

interface CategoryMenuProps {
  selectedCategory: string | null; // Đổi tên prop thành selectedCategory
  onCategorySelect: (category: string) => void;
}

export default function CategoryMenu({ // SỬA CHỖ NÀY
  selectedCategory,
  onCategorySelect,
}: CategoryMenuProps) {
  return (
    <div className="mt-16 mx-4"> {/* Thêm margin-top tránh header */}
      {/* Danh sách categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const isSelected = cat.name === selectedCategory;
          return (
            <div
              key={cat.id}
              onClick={() => onCategorySelect(cat.name)}
              className={`cursor-pointer rounded-xl text-center p-3 transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-b from-orange-500 to-yellow-400 scale-105 shadow-lg"
                  : "bg-[#1d1b35] hover:bg-[#37335e] shadow-md"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 object-contain mx-auto p-1"
              />
              <p className={`mt-2 text-sm font-medium ${
                isSelected ? "text-black" : "text-white"
              }`}>
                {cat.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}