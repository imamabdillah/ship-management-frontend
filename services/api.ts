import { Ship } from "@/types/ship";

const BASE_URL = "http://localhost:5014/api";

export const fetcher = async (url: string, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, options);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data; // Mengembalikan data JSON langsung
};

// Get all ships
export const getShips = async (): Promise<any[]> => {
  const data = await fetcher("/Ship");
  console.log("Data from API:", data); // Periksa apakah ada duplikasi
  return data;
};

// Add ship API
export const addShip = async (ship: Omit<Ship, "id">): Promise<void> => {
  await fetcher("/Ship", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ship),
  });
};

// Delete ship API
export const deleteShip = async (id: string): Promise<void> => {
  await fetcher(`/Ship/${id}`, {
    method: "DELETE",
  });
};
