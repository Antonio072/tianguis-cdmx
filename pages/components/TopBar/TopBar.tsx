import { FaShoppingCart,FaSearch } from 'react-icons/fa';

export const TopBar = () => {
    return (
        <div className="w-full flex justify-around items-center bg-gray-100 shadow-lg px-3 py-2">
            <FaShoppingCart className="text-4xl text-orange-500" />
            <h1 class="text-orange-500 text-2xl font-bold">TuTianguis</h1>
            <FaSearch className="text-2xl" />
        </div>
    );                               
}