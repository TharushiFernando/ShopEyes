import React, { useState } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

function handleSignOut() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("USERTYPE");
    localStorage.removeItem("NAME");
    localStorage.removeItem("USERID");

    window.location.href = '/Signin';
}

export default function AddItem() {

    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const navigate = useNavigate();


    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        if (checkNull()) {
            const newItem = {
                itemCode,
                itemName,
                itemCategory,
                itemPrice,
                itemQuantity
            }
            axios.post("http://localhost:8070/item/add", newItem).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Item Added!",
                    confirmButtonText: "OK",
                    onConfirm: () => {

                    },
                }).then(() => navigate("/item"));
            }).catch((error) => {
                alert(error)
            })
        }

    }

    function checkNull() {

        if (itemCategory == "") {
            Swal.fire({
                icon: "error",
                title: "Error, Please fill all the feilds!",
                confirmButtonText: "OK",
                onConfirm: () => {


                },
            });
            return false;
        } else {
            return true;
        }
    }



    return (
        <div id="layout-my" >

            <form className="needs-validation" id="content-property"onSubmit={sendData} novalidate>
                <fieldset>
                    <legend><h1>List New Item</h1></legend><br/>
                    <div className="form-group">
                        <label for="itemCode">Item Code</label>
                        <input type="number" className="form-control" id="itemCode" placeholder="Enter item code" onChange={(e) => {
                            setItemCode(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="itemName">Item Name</label>
                        <input type="text" className="form-control" id="itemName" placeholder="Enter item name" onChange={(e) => {
                            setItemName(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="itemCategory">Category</label>&nbsp;<br />
                        <select id="itemCategory" name="itemCategory" onChange={(e) => {
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
                        <input type="number" min ="0" className="form-control" id="itemQuantity" placeholder="Enter item quantity" onChange={(e) => {
                            setItemQuantity(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="itemPrice">Unit Price</label>
                        <input type="number" min ="0" className="form-control" id="itemPrice" placeholder="Enter item price" onChange={(e) => {
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
                    <button type="submit" width="600px" className="btn btn-primary align-elements"> Add </button>
                </div>
                </center></fieldset>
            </form>
            <br/><br/><br/>


        </div>
    )
}