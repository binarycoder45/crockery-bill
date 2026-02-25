export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
}

export const products: Product[] = [
  // Plates & Thalis
  {
    id: 1,
    name: "Steel Thali Set",
    category: "Plates",
    price: 250,
    unit: "set",
    stock: 50,
  },
  {
    id: 2,
    name: "Ceramic Dinner Plate",
    category: "Plates",
    price: 120,
    unit: "piece",
    stock: 100,
  },
  {
    id: 3,
    name: "Melamine Quarter Plate",
    category: "Plates",
    price: 45,
    unit: "piece",
    stock: 200,
  },
  {
    id: 4,
    name: "Brass Pooja Thali",
    category: "Plates",
    price: 450,
    unit: "piece",
    stock: 30,
  },

  // Glasses & Cups
  {
    id: 5,
    name: "Steel Glass Set (6 pcs)",
    category: "Glasses",
    price: 180,
    unit: "set",
    stock: 80,
  },
  {
    id: 6,
    name: "Copper Glass",
    category: "Glasses",
    price: 150,
    unit: "piece",
    stock: 60,
  },
  {
    id: 7,
    name: "Chai Cup Set (6 pcs)",
    category: "Glasses",
    price: 220,
    unit: "set",
    stock: 45,
  },
  {
    id: 8,
    name: "Kulhad Set (12 pcs)",
    category: "Glasses",
    price: 180,
    unit: "set",
    stock: 25,
  },

  // Bowls & Katoris
  {
    id: 9,
    name: "Steel Katori Set (6 pcs)",
    category: "Bowls",
    price: 160,
    unit: "set",
    stock: 70,
  },
  {
    id: 10,
    name: "Ceramic Serving Bowl",
    category: "Bowls",
    price: 280,
    unit: "piece",
    stock: 40,
  },
  {
    id: 11,
    name: "Mixing Bowl Set",
    category: "Bowls",
    price: 350,
    unit: "set",
    stock: 35,
  },

  // Utensils
  {
    id: 12,
    name: "Steel Spoon Set (12 pcs)",
    category: "Utensils",
    price: 120,
    unit: "set",
    stock: 90,
  },
  {
    id: 13,
    name: "Serving Spoon Set",
    category: "Utensils",
    price: 180,
    unit: "set",
    stock: 55,
  },
  {
    id: 14,
    name: "Ladle (Karchi)",
    category: "Utensils",
    price: 60,
    unit: "piece",
    stock: 100,
  },
  {
    id: 15,
    name: "Tongs (Chimta)",
    category: "Utensils",
    price: 80,
    unit: "piece",
    stock: 75,
  },

  // Cookware
  {
    id: 16,
    name: "Kadhai (Medium)",
    category: "Cookware",
    price: 550,
    unit: "piece",
    stock: 25,
  },
  {
    id: 17,
    name: "Pressure Cooker 3L",
    category: "Cookware",
    price: 1200,
    unit: "piece",
    stock: 20,
  },
  {
    id: 18,
    name: "Tawa (Non-stick)",
    category: "Cookware",
    price: 450,
    unit: "piece",
    stock: 30,
  },

  // Storage
  {
    id: 19,
    name: "Steel Container Set",
    category: "Storage",
    price: 380,
    unit: "set",
    stock: 40,
  },
  {
    id: 20,
    name: "Masala Box (7 containers)",
    category: "Storage",
    price: 320,
    unit: "piece",
    stock: 50,
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
