import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateItem() {

    const params = useParams();
    const navigate = useNavigate();
    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");

    useEffect(() => {
        function getItem() {
            axios.get(`http://localhost:8070/item/get/${params.id}`).then((res) => {
                setItemCode(res.data.item.itemCode);
                setItemName(res.data.item.itemName);
                setItemCategory(res.data.item.itemCategory);
                setItemPrice(res.data.item.itemPrice);
                setItemQuantity(res.data.item.itemQuantity);
                
            }).catch((error) => {
                alert(error.message);

            })
        }

        getItem();



    }, [])

    function updateData(e) {
        e.preventDefault();//prevent normal behaviour
        const newItem = {
            itemCode: itemCode,
            itemName : itemName,
            itemCategory : itemCategory,
            itemPrice : itemPrice,
            itemQuantity: itemQuantity
        }
        axios.put(`http://localhost:8070/item/update/${params.id}`, newItem)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Item Updated!",
                confirmButtonText: "OK",
                onConfirm: () => {
    
                },
            
            })
        }).then(() => navigate("/item")
        ).catch((error) => {
                alert(error)
            })
    }
    

    return (
        <div id="layout-my" >

            <form className="needs-validation" id="content-property"onSubmit={updateData} novalidate>
                <fieldset>
                    <legend><h1>Update Item Details</h1></legend><br/>
                    <div className="form-group">
                        <label for="itemCode">Item Code</label>
                        <input type="number" className="form-control" value={itemCode} id="itemCode" placeholder="Enter item code" onChange={(e) => {
                            setItemCode(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="itemName">Item Name</label>
                        <input type="text" className="form-control" id="itemName" value={itemName} placeholder="Enter item name" onChange={(e) => {
                            setItemName(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="itemCategory">Category</label>&nbsp;<br />
                        <select id="itemCategory" name="itemCategory" value={itemCategory} onChange={(e) => {
                            setItemCategory(e.target.value);
                        }} required >
                            <option value="Not Selected" >Choose one...</option>
                            <option value="Vegetables" >Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Baby Products">Baby Products</option>
                            <option value="Dairy" >Dairy</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Food Cupboard">Food Cupboard</option>
                            <option value="Household">Household</option>
                            <option value="Cooking Essentials">Cooking Essentials</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label for="itemQuantity">Quantity</label>
                        <input type="number" min ="0" className="form-control" id="itemQuantity" value={itemQuantity} placeholder="Enter item quantity" onChange={(e) => {
                            setItemQuantity(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="itemPrice">Unit Price</label>
                        <input type="number" min ="0" className="form-control" id="itemPrice" value={itemPrice} placeholder="Enter item price" onChange={(e) => {
                            setItemPrice(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <label for="dob">Expire Date</label>
                        <input type="date" className="form-control" id="expireDate" placeholder="Enter Expire Date" onChange={(e) => {
                            setExpireDate(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div> */}
                    <br/>
                    <center>
                    <div style={{alignItems: 'right'}} >
                    <button type="submit" width="600px" className="btn btn-primary align-elements"> Update </button>
                </div>
                </center></fieldset>
            </form>
            <br/><br/><br/>


        </div>
    )
}