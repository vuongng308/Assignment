import { Product } from "@/types";

  const allProducts: Record<string, Product[]> = {
    Cupcake: [
      {
        id: 1,
        name: "Cupcake mềm",
        image: "/images/cupcake1.jpg",
        price: 25000,
        nutrition: "150 kcal, 5g béo, 20g đường"
      },
      {
        id: 2,
        name: "Cupcake dâu tây",
        image: "/images/cupcake2.jpg",
        price: 50000,
        nutrition: "180 kcal, 6g béo, 25g đường"
      },
      {
        id: 3,
        name: "Cupcake chocolate",
        image: "/images/cupcake3.jpg",
        price: 100000,
        nutrition: "210 kcal, 10g béo, 28g đường"
      },
      {
        id: 4,
        name: "Cupcake dâu hoa hồng",
        image: "/images/cupcake4.jpg",
        price: 45000,
        nutrition: "170 kcal, 5g béo, 22g đường"
      },
      {
        id: 5,
        name: "Cupcake tầng",
        image: "/images/cupcake5.jpg",
        price: 90000,
        nutrition: "250 kcal, 12g béo, 30g đường"
      },
      {
        id: 6,
        name: "Cupcake nhiều màu",
        image: "/images/cupcake6.jpg",
        price: 45000,
        nutrition: "190 kcal, 7g béo, 24g đường"
      },
    ],
    "Sea food": [
      {
        id: 7,
        name: "Tôm hùm nướng bơ tỏi",
        image: "/images/seafood1.jpg",
        price: 300000,
        nutrition: "200 kcal, 15g protein, 12g chất béo",
      },
      {
        id: 8,
        name: "Cua sốt ớt Singapore",
        image: "/images/seafood2.jpg",
        price: 350000,
        nutrition: "250 kcal, 20g protein, 8g chất béo",
      },
      {
        id: 9,
        name: "Cá hồi sashimi",
        image: "/images/seafood3.jpg",
        price: 400000,
        nutrition: "150 kcal, 25g protein, 5g chất béo",
      },
      {
        id: 13,
        name: "Ghẹ hấp bia",
        image: "/images/seafood4.jpg",
        price: 280000,
        nutrition: "180 kcal, 15g protein, 7g chất béo",
      },
      {
        id: 14,
        name: "Súp hải sản",
        image: "/images/seafood5.jpg",
        price: 120000,
        nutrition: "140 kcal, 10g protein, 4g chất béo",
      },
      {
        id: 15,
        name: "Tôm sốt chanh dây",
        image: "/images/seafood6.jpg",
        price: 250000,
        nutrition: "190 kcal, 12g protein, 6g chất béo",
      },
    ],
    "Juice": [
      { id: 16, name: "Nước ép cam", image: "/images/juice1.jpg", price: 30000, nutrition: "120 kcal, 0g béo, 25g đường" },
      { id: 17, name: "Nước ép dưa hấu", image: "/images/juice2.jpg", price: 25000, nutrition: "100 kcal, 0g béo, 20g đường" },
      { id: 18, name: "Nước ép táo", image: "/images/juice3.jpg", price: 35000, nutrition: "130 kcal, 0g béo, 22g đường" },
      { id: 19, name: "Nước ép cà rốt", image: "/images/juice4.jpg", price: 40000, nutrition: "90 kcal, 0g béo, 18g đường" },
      { id: 20, name: "Nước ép dứa", image: "/images/juice5.jpg", price: 30000, nutrition: "110 kcal, 0g béo, 21g đường" },
      { id: 21, name: "Nước ép xoài", image: "/images/juice6.jpg", price: 45000, nutrition: "150 kcal, 0g béo, 29g đường" },
    ],
    "Nước có ga": [
      { id: 22, name: "Coca Cola", image: "/images/nuoc_ga1.jpg", price: 20000, nutrition: "150 kcal, 0g béo, 38g đường" },
      { id: 23, name: "Pepsi", image: "/images/nuoc_ga2.jpg", price: 20000, nutrition: "140 kcal, 0g béo, 36g đường" },
      { id: 24, name: "Sprite", image: "/images/nuoc_ga3.jpg", price: 20000, nutrition: "130 kcal, 0g béo, 34g đường" },
      { id: 25, name: "7Up", image: "/images/nuoc_ga4.jpg", price: 20000, nutrition: "125 kcal, 0g béo, 33g đường" },
      { id: 26, name: "Fanta", image: "/images/nuoc_ga5.jpg", price: 20000, nutrition: "140 kcal, 0g béo, 35g đường" },
      { id: 27, name: "Nước có ga Ramune", image: "images/nuoc_ga6.jpg", price: 30000, nutrition: "200 kcal, 10g đường"},
    ],
    "Combo tiết kiệm": [
      { id: 28, name: "Combo gà rán và khoai tây", image: "/images/combo1.jpg", price: 90000, nutrition: "600 kcal, 30g béo, 50g đường" },
      { id: 29, name: "Combo pizza và nước ngọt", image: "/images/combo2.png", price: 120000, nutrition: "700 kcal, 35g béo, 60g đường" },
      { id: 30, name: "Combo sushi và sashimi", image: "/images/combo3.jpg", price: 150000, nutrition: "550 kcal, 20g béo, 45g đường" },
      { id: 31, name: "Combo mỳ Ý và salad", image: "/images/combo4.jpg", price: 85000, nutrition: "480 kcal, 22g béo, 42g đường" },
      { id: 32,name:"Combo lẩu nướng", image: "images/combo5.jpg", price: 400000, nutrition: "1000 kcal, 250g béo, 10g đường" },
      { id: 33, name: "Combo liên hoan tiết kiệm", image: "images/combo6.jpg", price: 250000, nutrition: "150000 kcal, 500g béo, 300g đường"}
    ],
    "Gà rán": [
      { id: 34, name: "Gà rán truyền thống", image: "/images/garan1.png", price: 40000, nutrition: "250 kcal, 12g béo, 8g đường" },
      { id: 35, name: "Gà rán cay", image: "/images/garan2.jpg", price: 45000, nutrition: "300 kcal, 15g béo, 10g đường" },
      { id: 36, name: "Gà rán mật ong", image: "/images/garan3.jpg", price: 50000, nutrition: "350 kcal, 18g béo, 12g đường" },
      { id: 37, name: "Gà popcorn nhỏ", image: "/images/garan4.jpg", price: 30000, nutrition: "180 kcal, 10g béo, 7g đường" },
      { id: 38, name: "Gà giòn vui vẻ", image: "/images/garan5.jpg", price: 60000, nutrition: "360 kcal, 20g béo, 14g đường" },
      { id: 39, name: "Gà sốt chanh dây", image: "/images/garan6.jpg", price: 75000, nutrition: "260 kcal, 15g béo, 20g đường" },
    ],
  };
  
  export default allProducts;
  
