import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem } from "../models/orderItemModel";

// Define the cart type
type Cart = {
    items: OrderItem[];
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    increase?: (item: OrderItem) => void;
    decrease?: (item: OrderItem) => void;
};

// Initial state of the cart
const initialState: Omit<Cart, 'increase' | 'decrease'> = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
};

// Function to calculate prices
const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(items.reduce((a, c) => a + c.price * c.qty, 0));
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(Number(itemsPrice * 0.15));
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

// Zustand store for the cart
export const useCartStore = create<Cart>((set, get) => ({
    ...initialState,
    increase: (item: OrderItem) => {
        const { items } = get();
        const existingItem = items.find((i) => i.slug === item.slug);
        const updatedCartItems = existingItem
            ? items.map((x) =>
                x.slug === item.slug ? { ...existingItem, qty: existingItem.qty + 1 } : x
            )
            : [...items, { ...item, qty: 1 }];

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
        set({ items: updatedCartItems, itemsPrice, shippingPrice, taxPrice, totalPrice });
    },
    decrease: (item: OrderItem) => {
        const { items } = get();
        const existingItem = items.find((i) => i.slug === item.slug);
        if (!existingItem || existingItem.qty === 0) return;

        const updatedCartItems = existingItem.qty === 1
            ? items.filter((i) => i.slug !== item.slug)
            : items.map((x) =>
                x.slug === item.slug ? { ...x, qty: x.qty - 1 } : x
            );

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
        set({ items: updatedCartItems, itemsPrice, shippingPrice, taxPrice, totalPrice });
    },
}));

