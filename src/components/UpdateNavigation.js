import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddNavigation() {
    const params = useParams();
    const [routeNo, setRouteNo] = useState("");
    const [navigationText, setNavigationText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        function getNavigation() {
            axios.get(`http://localhost:8070/navigation/get/${params.id}`).then((res) => {
                setRouteNo(res.data.item.routeNo);
                setNavigationText(res.data.item.navigationText);
                
            }).catch((error) => {
                alert(error.message);

            })
        }

        getNavigation();



    }, [])



    function updateData(e) {
        e.preventDefault();//prevent normal behaviour
        const newNavigation = {
            routeNo: routeNo,
            navigationText : navigationText,
        }
        axios.put(`http://localhost:8070/navigation/update/${params.id}`, newNavigation)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Navigation Updated!",
                confirmButtonText: "OK",
                onConfirm: () => {
    
                },
            
            })
        }).then(() => navigate("/navigation")
        ).catch((error) => {
                alert(error)
            })
    }

    return (
        <div id="layout-my" >

            <form classText="needs-validation" id="content-property"onSubmit={updateData} novalidate>
                <fieldset>
                    <legend><h1>Update Navigation</h1></legend><br/>
                    <div classText="form-group">
                        <label for="routeNo">Route No</label><br/>
                        <input type="number" min="1" classText="form-control" id="routeNo" value={routeNo} placeholder="Enter navigation code" onChange={(e) => {
                            setRouteNo(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <br/>
                    <div classText="form-group">
                        <label for="navigationText">Navigation Text</label>

                        <textarea  id="navigationText" name="navigationText" rows="4" cols="50" value={navigationText} classText="form-control" placeholder="Enter navigation name" onChange={(e) => {
                            setNavigationText(e.target.value);
                        }} required >
                        </textarea>

                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    
                    <br/>
                    <center>
                    <div style={{alignNavigations: 'right'}} >
                    <button type="submit" width="600px" classText="btn btn-primary align-elements"> Update </button>
                </div>
                </center></fieldset>
            </form>
            <br/><br/><br/>


        </div>
    )
}