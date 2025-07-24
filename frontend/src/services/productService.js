import axios from "axios";

const BASE_API_URL = "http://127.0.0.1:8000/api";

export const fetchProducts = async (filters = {}) => {

    try {
        const response = await axios.get(`${BASE_API_URL}/products`, {
            params: filters,
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


// POST: Add a product
export const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/products`, productData);
        return response.data;
    } 
    catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

// PUT: Update a product by ID
export const updateProduct = async (id, productData) => {
    
    try {
        const response = await axios.put(`${BASE_API_URL}/products/${id}`, productData);
        return response.data;
    } 
    catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// DELETE: Delete a product by ID
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_API_URL}/products/${id}`);
        return response.data;
    } 
    catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }

};


export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
