import React, { useState, useEffect } from "react";
import { fetchFoods, deleteFood, updateFood, createFood } from "../services/api";
import FoodForm from "./FoodForm";
import "./styles.css";
  
  const FoodList: React.FC = () => {
    const [foods, setFoods] = useState<any[]>([]);
    const [editingFood, setEditingFood] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
      fetchFoods().then(setFoods);
    }, []);

    const handleDelete = async (id: number) => {
      await deleteFood(id);
      fetchFoods().then(setFoods);
    };

    const handleEdit = (food: any) => {
      setEditingFood(food);
    };

    const handleUpdate = async (id: number, foodData: any) => {
      await updateFood(id, foodData);
      fetchFoods().then(setFoods);
      setEditingFood(null);
    };

    const handleCreate = async (foodData: any) => {
      await createFood(foodData);
      fetchFoods().then(setFoods);
    };


    const filteredFoods = foods.filter((food) => {
      return (
        typeof food.orderno === "string" &&
        food.orderno.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return (
      <div id="food-list">
        <FoodForm
          fetchFoods={() => fetchFoods().then(setFoods)}
          isEditing={!!editingFood}
          editId={editingFood?.id || null}
          initialData={editingFood || {
            orderno: "",
            customername: "",
            restaurentname: "",
            menuitems: "",
            delievryaddress: "",
          }}
          handleUpdate={handleUpdate}
          handleCreate={handleCreate}
        />

        <div id="search-bar">
          <h2 style={{ color: "white", marginLeft: "10px" }}>Search Users</h2>
          <input
            type="text"
            placeholder="Search by order number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        <h2 style={{ color: "white", marginLeft: "720px" }}>Users Data </h2>

        <div id="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Customer Name</th>
                <th>Restaurant</th>
                <th>Menu Items</th>
                <th>Delivery Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.map((food) => (
                <tr key={food.id}>
                  <td>{food.orderno}</td>
                  <td>{food.customername}</td>
                  <td>{food.restaurentname}</td>
                  <td>{food.menuitems}</td>
                  <td>{food.delievryaddress}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit"
                        onClick={() => handleEdit(food)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(food.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
export default FoodList;