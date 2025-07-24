import { useEffect, useState } from "react";
import Modal from 'react-modal';


export default function ProductFormModal({isOpen, onClose, onSubmit, initialData = null, categories = [], loading = false}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        status: "active",
      });
    
      useEffect(() => {
        if (initialData) {
          setFormData({
            name: initialData.name || "",
            description: initialData.description || "",
            price: initialData.price || "",
            quantity: initialData.quantity || "",
            category: initialData.category?.name || "",
            status: initialData.status || "active",
          });
        } else {
          setFormData({
            name: "",
            description: "",
            price: "",
            quantity: "",
            category: "",
            status: "active",
          });
        }
      }, [initialData, isOpen]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };
    
      return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={initialData ? "Update Product" : "Add Product"}
          className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-white/30 bg-opacity-30 flex justify-center items-center" >
          
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            {initialData ? "Update Product" : "Add New Product"}
          </h2>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="name">
                Name
              </label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                focus:ring-red-500"/>
            </div>
    
            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="description"> Description </label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                focus:ring-red-500"/>
            </div>
    
            <div className="flex gap-4">
                {/* Price */}
                <div className="w-1/2">
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="price"> Price </label>
                <input id="price" name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange}
                    required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                    focus:ring-red-500"/>
                </div>
        
                {/* Quantity */}
                <div className="w-1/2">
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="quantity"> Quantity </label>
                <input id="quantity" name="quantity" type="number" min="0" value={formData.quantity} onChange={handleChange}
                    required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2
                    focus:ring-red-500"/>
                </div>
            </div>

            <div className="flex gap-4">
                {/* Category */}
                <div className="w-1/2">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="category">Category</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                        focus:ring-red-500">
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                        ))}
                    </select>
                </div>
        
                {/* Status */}
                <div className="w-1/2">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="status">
                        Status
                    </label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 
                        focus:ring-red-500" >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
      
            
    
            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md 
                hover:bg-gray-300 transition">
                Cancel
              </button>

              <button type="submit" disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50">
                {loading ? "Saving..." : initialData ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      );
}