import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8070/item/")
      .then((res) => setItems(res.data))
      .catch((error) => alert(error.message));
  }, []);

  const onDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This item will be deleted permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0077cc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8070/item/delete/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
            setItems(items.filter((i) => i._id !== id));
          })
          .catch((err) => alert(err.message));
      }
    });
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Items Report", 10, 10);
    const headers = [['#', 'Item Code', 'Name', 'Category', 'Unit Price', 'Quantity']];
    const data = items.map((item, index) => [
      index + 1,
      item.itemCode,
      item.itemName,
      item.itemCategory,
      item.itemPrice,
      item.itemQuantity,
    ]);
    doc.autoTable({ head: headers, body: data });
    doc.save('Inventory_Report.pdf');
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  // Inline Styles
  const containerStyle = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
  };
  const buttonGroupStyle = { display: 'flex', gap: '1rem', marginBottom: '1.5rem' };
  const buttonStyle = {
    padding: '10px 16px',
    fontSize: '1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none',
    display: 'inline-block',
    textDecoration: 'none'
  };
  const warningBtn = { ...buttonStyle, backgroundColor: '#f0ad4e', color: 'white' };
  const primaryBtn = { ...buttonStyle, backgroundColor: '#007bff', color: 'white' };
  const dangerBtn = { ...buttonStyle, backgroundColor: '#dc3545', color: 'white' };
  const inputStyle = {
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: '1.5rem 0',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem'
  };
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  };
  const thStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '12px',
    textAlign: 'center', // ✅ Centered headers
    border: '1px solid #ddd'
  };
  const tdStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    verticalAlign: 'middle',
    textAlign: 'center' // ✅ Optional: Center data too
  };
  const actionWrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      {/* Heading */}
      <h1 style={headingStyle}>Shop Dashboard</h1>

      {/* Button group */}
      <div style={buttonGroupStyle}>
        <Link to="/item/add" style={{ ...warningBtn, textDecoration: 'none' }}>
          ➕ Add New Product
        </Link>
        <button onClick={generateReport} style={primaryBtn}>
          📄 Generate & Download Report
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for items..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={inputStyle}
      />

      {/* Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Item Code</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Unit Price</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.itemCode}</td>
                <td style={tdStyle}>{item.itemName}</td>
                <td style={tdStyle}>{item.itemCategory}</td>
                <td style={tdStyle}>{item.itemPrice}</td>
                <td style={tdStyle}>{item.itemQuantity}</td>
                <td style={tdStyle}>
                  <div style={actionWrapper}>
                    <Link
                      to={`/item/get/${item._id}`}
                      style={{ ...warningBtn, textDecoration: 'none' }}
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => onDelete(item._id)}
                      style={dangerBtn}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={tdStyle} colSpan="6" align="center">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
