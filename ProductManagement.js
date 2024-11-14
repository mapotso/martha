import React, { useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [errors, setErrors] = useState({}); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "Valid price is required";
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = "Valid quantity is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/MyProducts', {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            });
            alert('Product added successfully: ' + response.data.name);

            // Save the new product to localStorage
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            storedProducts.push(response.data);  // Assuming the API returns the created product
            localStorage.setItem("products", JSON.stringify(storedProducts));

            // Reset form data
            setFormData({ name: '', description: '', category: '', price: '', quantity: '' });

        } catch (error) {
            console.error(error);
            alert('Error adding product: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <section style={styles.container}>
            <h2 style={styles.header}>Product Management</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
                
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Product Description" 
                    required 
                    value={formData.description} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                {errors.description && <span style={styles.error}>{errors.description}</span>}
                
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Product Category" 
                    required 
                    value={formData.category} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                {errors.category && <span style={styles.error}>{errors.category}</span>}

                <input 
                    type="number" 
                    name="price" 
                    placeholder="Product Price" 
                    required 
                    value={formData.price} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                {errors.price && <span style={styles.error}>{errors.price}</span>}
                
                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Product Quantity" 
                    required 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                {errors.quantity && <span style={styles.error}>{errors.quantity}</span>}

                <button type="submit" style={styles.submitButton}>Add Product</button>
            </form>
        </section>
    );
};

const styles = {
    container: {
        fontFamily: '"Helvetica Neue", sans-serif',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        maxWidth: '700px',
        margin: '30px auto',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        fontSize: '32px',
        color: '#333',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '14px',
        margin: '8px 0',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        backgroundColor: '#fff',
    },
    submitButton: {
        padding: '14px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: '#d9534f',
        fontSize: '14px',
        marginTop: '-5px',
    },
};

export default ProductManagement;
