import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = "https://fakestoreapi.com/products";
        const response = await fetch(api);
        const data = await response.json();

        setProducts(data); 
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();

  }, []);

const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log(result);

      
      setProducts(products.filter((p) => p.id !== id));

    } catch (error) {
      console.log(error);
    }
  };
  

  

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {products.map((product) => (
        <div
          key={product.id}
          className="max-w-sm bg-white rounded-2xl shadow-md border p-4"
        >
          
          <div className="h-56 bg-gray-50 flex items-center justify-center rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain h-full w-full p-4"
            />
          </div>

          {/* Product Info */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg line-clamp-2">
              {product.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>

            <p className="mt-3 text-indigo-600 font-bold text-xl">
              ₹{product.price}
            </p>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              ⭐ {product.rating.rate}
              <span>•</span>
              <span>{product.rating.count} reviews</span>
            </div>

           
            <div className="mt-4 flex items-center gap-3">
              <button className="px-4 py-2 btn btn-primary mr-4 rounded-xl border hover:bg-gray-50">
                Add to Cart
              </button>

              <button className="px-4 py-2 btn btn-success rounded-xl bg-indigo-600 text-white shadow-md">
                View
              </button>

              <br/>


              <button
                onClick={() => deleteProduct(product.id)}
                className="px-4 py-2 rounded-xl bg-red-600 btn btn-danger mt-4 text-white">Delete</button>           
               </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;
