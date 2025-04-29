import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddNavigation() {

    const [routeNo, setRouteNo] = useState("");
    const [navigationText, setNavigationText] = useState("");
    const [navigations, setNavigations] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8070/navigation/").then((res) => {
                setNavigations(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getItems();
    }, [])

    function onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/navigation/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        )
                        setNavigations(navigations.filter((i) => i._id !== id));
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            }
        })
        // .then(() => { window.location.reload(false); })
            // .then((res) => {
            //     alert("Deleted Successfully!");
            //     this.getItems();
            //     () => navigate("navigation/");
            // })
            .catch((error) => {
                console.error("Error deleting navigation:", error);
            });
    }


    function searchTable(navigations) {
        return navigations.filter((navigation) => {
            for (const key in navigation) {
              if (
                navigation.hasOwnProperty(key) &&
                typeof navigation[key] === "string" &&
                navigation[key].toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return true;
              }
            }
            return false;
          });
    }


    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        if (true) {
            const newNavigation = {
                routeNo,
                navigationText
            }
            axios.post("http://localhost:8070/navigation/add", newNavigation).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Navigation Added!",
                    confirmButtonText: "OK",
                    onConfirm: () => {

                    },
                }).then(() => navigate("/navigation"));
            }).catch((error) => {
                alert(error)
            })
        }

    }

    return (
        <div id="layout-my" >
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Path No</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTable(navigations).map((navigation, index) => (
                        <tr style={{ width: "90%" }} key={index}>
                            {/* <th scope="row">{index + 1}</th> */}
                            <td>{navigation.routeNo}</td>
                            <td>{navigation.navigationText}</td>

                            <td style={{ display: 'flex' }}> {/* <i class="fa-solid fa-calendar-days"></i> <i class="fa-solid fa-money-bill"></i>*/}
                                <a className='btn btn-warning' href={`navigation/get/${navigation._id}`}>
                                    <i title="Update Items" className='fas fa-edit'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-danger' onClick={() => onDelete(`${navigation._id}`)}>
                                    <i title="Delete Items" className='fas fa-trash-alt'></i>&nbsp;
                                </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

            <form classText="needs-validation" id="content-property"onSubmit={sendData} novalidate>
                <fieldset>
                    <legend><h1>Add New Navigation</h1></legend><br/>
                    <div classText="form-group">
                        <label for="routeNo">Route No</label><br/>
                        <input type="number" min="1" classText="form-control" id="routeNo" placeholder="Enter navigation code" onChange={(e) => {
                            setRouteNo(e.target.value);
                        }} required />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <br/>
                    <div classText="form-group">
                        <label for="navigationText">Navigation Text</label>

                        <textarea  id="navigationText" name="navigationText" rows="4" cols="50" classText="form-control" placeholder="Enter navigation name" onChange={(e) => {
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
                    <button type="submit" width="600px" classText="btn btn-primary align-elements"> Add </button>
                </div>
                </center></fieldset>
            </form>
            <br/><br/><br/>


        </div>
    )
}