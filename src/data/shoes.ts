export type ShoeStatus =
  | "Basketball"
  | "Storage"
  | "Casual"
  | "Retired";

export type Shoe = {
  id: number;
  brand: string;
  model: string;
  status: ShoeStatus;
  rating?: number;
  colorway?: string;
  notes?: string;
  image?: string;
};

export const shoes: Shoe[] = [
  {
    id: 1,
    brand: "Nike",
    model: "GT Cut Academy",
    status: "Storage",
    rating: 4.5,
    colorway: "Black / Green",
    notes: "Waiting to rotate in."
  },
  {
    id: 2,
    brand: "Nike",
    model: "Hyperdunk 2015",
    status: "Basketball",
    rating: 4.8,
    colorway: "White / Black",
    notes: "Elite traction, still holds up."
  },
  {
    id: 3,
    brand: "Adidas",
    model: "Harden Vol 6",
    status: "Casual",
    rating: 4.0,
    colorway: "Red / Black",
    notes: "Retired from court use."
  }
];