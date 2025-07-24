import { useEffect, useState } from "react";
import { addProduct, deleteProduct, fetchCategories, fetchProducts, updateProduct } from "../../services/productService";
import Header from "../../components/header";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Modal from 'react-modal';
import ProductFormModal from "../../components/productFormModal";

Modal.setAppElement('#root'); 

export default function Dashboard() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        category: "",
        status: "",
    });

    // Modal states
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [formModalOpen, setFormModalOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

     // Open "Add Product" modal
    const openAddProductModal = () => {
        setSelectedProduct(null);
        setFormModalOpen(true);
    };
      
     // Open "Edit Product" modal with selected product
    const openEditProductModal = (product) => {
        setSelectedProduct(product);
        setFormModalOpen(true);
    };
      
    // Handle form submission for adding/updating product
    const handleFormSubmit = async (formData) => {
        setFormLoading(true);
        try {
          if (selectedProduct) {
            // Update existing product
            await updateProduct(selectedProduct.id, formData)
            console.log("Updating product:", selectedProduct.id, formData);
          } 
          else {
            // Add new product
            await addProduct(formData);
            console.log("Adding new product", formData);
          }

          // Close modal and refresh product list
          setFormModalOpen(false);
        } 
        catch (err) {
          console.error("Save product failed", err);
        } 
        finally {
          setFormLoading(false);
        }
      };


    // Fetch products when filters change
    useEffect( () => {
        const getProducts = async () => {
            try {
            const response = await fetchProducts(filters);
            setProducts(response.data); 
            console.log("Fetched products:", response.data);
            }
            catch (err) {
                console.error("Error loading...", err);
            }  
        }

        getProducts();
    }, [filters]);

    // get product categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCategories();
                setCategories(response);
            } catch (err) {
                console.error("Error loading categories", err);
            }
        };

        getCategories();
    }, []);

    const handleAddProduct = () => {
        // Open modal or redirect to add page
        console.log("Add product clicked");
    };


    const handleSearchChange = (e) => {
        setFilters((prev) => ({ ...prev, name: e.target.value }));
    };
    
    const handleCategoryChange = (e) => {
        setFilters((prev) => ({ ...prev, category: e.target.value }));
    };
    
    const handleStatusToggle = () => {
        setFilters((prev) => ({
          ...prev,
          status: prev.status === "active" ? "" : "active",
        }));
    };
    

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setModalIsOpen(true);
    };
      
    const closeModal = () => {
        setModalIsOpen(false);
        setProductToDelete(null);
    };
      
    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(productToDelete.id);
            setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
            closeModal();
        } catch (error) {
            console.error("Delete failed:", error);
            closeModal();
        }
    };
      

    
    return(
        <div className="min-h-screen bg-red-50">
            {/* Header */}
            <Header onAdd={openAddProductModal} />

            {/* Filter Bar */}
            <div className="bg-white shadow-md rounded-md px-7 py-4 mx-5 mt-4 flex flex-col md:flex-row md:items-center gap-4">
                
                {/* Search Input */}
                <input type="text" placeholder="Search by name" value={filters.name}  onChange={handleSearchChange}
                className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"/>

                {/* Category Dropdown */}
                <select value={filters.category} onChange={handleCategoryChange} className="px-4 py-2 border border-gray-300
                 rounded-md w-full md:w-1/4" >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                    </select>


                {/* Status Checkbox */}
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={filters.status === "active"} onChange={handleStatusToggle}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700 font-medium">Active Only</span>
                </label>
            </div>

            {/* Product Table */}
            <div className="bg-white mt-6 mx-5 rounded-md shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-gray-700">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="text-center py-4 text-gray-500">No products found</td>
                    </tr>
                ) : ( products.map((product) => (
                    <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">Rs. {product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.category?.name || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.status === "active" ? "bg-green-100 text-green-800" : ""
                            }`}>
                                {product.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                            <button className="text-gray-700 hover:text-gray-900 cursor-pointer"
                            onClick={() => openEditProductModal(product)}>
                                <FaEdit size={18} />
                            </button>
                            <button className="text-red-500 hover:text-red-700 cursor-pointer"  
                                onClick={() => openDeleteModal(product)}><FaTrash size={18} /></button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
            
            {/* delete confirmation popup modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Confirm Delete" className="max-w-md mx-auto
              bg-white p-6 rounded-lg shadow-lg outline-none transition duration-1000 ease-in"
            overlayClassName="fixed inset-0 bg-white/30 bg-opacity-30 flex justify-center items-center">
            
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Are you sure you want to delete this product?</h2>
                <div className="flex justify-end space-x-3 mt-6">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 
                        transition">
                        Cancel
                    </button>
                    <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 
                    transition" >
                        Confirm
                    </button>
                </div>
            </Modal>
            
            {/* Update popup modal */}
            <ProductFormModal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} onSubmit={handleFormSubmit}
            initialData={selectedProduct} categories={categories} loading={formLoading} />


        </div>

    )
}