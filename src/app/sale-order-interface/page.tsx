'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProducts } from '../../../utils/api/product';
import { createSale } from '../../../utils/api/sales-order';

export default function SalesOrder() {
    const [selectedSku, setSelectedSku] = useState('');
   
     const [name, setName] = useState('');
     const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [customerId, setCustomerId] = useState('');

    interface Product {
        id: string;
        sku: string;
        price: number;
        imageUrl: string;
        name: string;
        category: string;
        quantity: number;
    }

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log('Fetched Products:', data); // Debugging
            setProducts(Array.isArray(data.products) ? data.products : []);
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const order = {
            customerId,
            price,
            items: [
                {
                    name: name, // Use the name from state
                    sku: selectedSku,
                    quantity: parseInt(quantity.toString(), 10),
                    category: category 
                },
            ],
        };

        try {
            const res = await createSale(order);
            console.log('Order created:', res);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-[600px] h-[500px] bg-white rounded-lg text-black">
                <Image src={'/NBIMS.png'} width={150} height={150} alt="log" />

                <p className="font-bold text-2xl">Please May I Have Your Order</p>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto"
                >
                    <h2 className="text-xl font-bold mb-4">Place Sales Order</h2>

                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />

                    <select
                        value={selectedSku}
                        onChange={(e) => {
                            const selectedSku = e.target.value;
                            setSelectedSku(selectedSku);

                            const selectedProduct = products.find(
                                (product) => product.sku === selectedSku
                            );
                            if (selectedProduct) {
                                setName(selectedProduct.name);
                                setCategory(selectedProduct.category)
                                setPrice(selectedProduct.price)

                            }
                        }}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    >
                       
                        <option value="">Select Product</option>
                        {Array.isArray(products) &&
                            products.map((product) => (
                                <option key={product.sku} value={product.sku}>
                                    {product.name}
                                </option>
                            ))}
                    </select>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Quantity</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                −
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity((prev) => prev + 1)}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Submit Order
                    </button>
                </form>
            </div>
        </div>
    );
}
