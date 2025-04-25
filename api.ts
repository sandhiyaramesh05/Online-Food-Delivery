import axios from "axios";

const API_URL = "http://localhost:3000/onlinefood";

export const getFoods = async () => axios.get(API_URL);
export const createFood = async (food: { orderno: string; customername: string; restaurentname: string; menuitems: string; delievryaddress: string }) => axios.post(API_URL, food);
export const updateFood = async (id: number, food: { orderno: string; customername: string; restaurentname: string; menuitems: string; delievryaddress: string }) => axios.put(`${API_URL}/${id}`, food);
export const deleteFood = async (id: number) => axios.delete(`${API_URL}/${id}`);

export const fetchFoods = async () => {
  try {
    const response = await getFoods();
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};




