
/**
 * Header component for the inventory system.
 *
 * Displays the application name and a sticky header bar with an "Add Product" button.
 *
 * Props:
 * - onAdd (function): Callback function triggered when the "+ Add Product" button is clicked.
 *
 * @component
 * @example
 * return (
 *   <Header onAdd={() => openProductModal()} />
 * )
 */
export default function Header({ onAdd }) {
    return (
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70
       shadow-md px-7 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">
          In<span className="text-red-500">SYS</span>
        </h1>

        <button onClick={onAdd} className="flex items-center bg-red-500 hover:bg-red-600 text-white
         font-semibold px-4 py-2 rounded-md shadow-lg cursor-pointer transition ease-in duration-300">
          + Add Product
        </button>
        
      </div>
    );
  }
  