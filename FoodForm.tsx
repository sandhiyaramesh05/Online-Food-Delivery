import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./styles.css";
interface FoodFormProps {
  fetchFoods: () => void;
  isEditing: boolean;
  editId: number | null;
  initialData: {
    orderno: string;
    customername: string;
    restaurentname: string;
    menuitems: string;
    delievryaddress: string;
  };
  handleUpdate: (id: number, foodData: any) => Promise<void>;
  handleCreate: (foodData: any) => Promise<void>;
}

const FoodForm: React.FC<FoodFormProps> = ({
  fetchFoods,
  isEditing,
  editId,
  initialData = {
    orderno: "",
    customername: "",
    restaurentname: "",
    menuitems: "",
    delievryaddress: "",
  },
  handleUpdate,
  handleCreate,
}) => {
  const [orderno, setOrderno] = useState(initialData.orderno);
  const [customername, setCustomerName] = useState(initialData.customername);
  const [restaurentname, setRestaurentName] = useState(initialData.restaurentname);
  const [menuitems, setMenuItems] = useState(initialData.menuitems);
  const [delievryaddress, setDelievryAddress] = useState(initialData.delievryaddress);

  useEffect(() => {
    setOrderno(initialData.orderno || "");
    setCustomerName(initialData.customername || "");
    setRestaurentName(initialData.restaurentname || "");
    setMenuItems(initialData.menuitems || "");
    setDelievryAddress(initialData.delievryaddress || "");
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editId !== null) {
      await handleUpdate(editId, {
        orderno,
        customername,
        restaurentname,
        menuitems,
        delievryaddress,
      });
    } else {
      await handleCreate({
        orderno,
        customername,
        restaurentname,
        menuitems,
        delievryaddress,
      });
    }
    fetchFoods();
    setOrderno("");
    setCustomerName("");
    setRestaurentName("");
    setMenuItems("");
    setDelievryAddress("");
  };

  return (
    <div id="f1">
      <div id="food-form">
        <h2 style={{color: "white" , marginLeft: "380px" }}>{isEditing ? "Edit Food" : "Add Food"}</h2>
        <form onSubmit={handleSubmit}>
          <TextField label="" value={orderno} onChange={(e) => setOrderno(e.target.value)} fullWidth margin="normal" required />
          <TextField label="" value={customername} onChange={(e) => setCustomerName(e.target.value)} fullWidth margin="normal" required />
          <TextField label="" value={restaurentname} onChange={(e) => setRestaurentName(e.target.value)} fullWidth margin="normal" required />
          <TextField label="" value={menuitems} onChange={(e) => setMenuItems(e.target.value)} fullWidth margin="normal" required/>
          <TextField label="" value={delievryaddress} onChange={(e) => setDelievryAddress(e.target.value)} fullWidth margin="normal" required/>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodForm;
