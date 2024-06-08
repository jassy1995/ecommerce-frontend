import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem } from "../models/orderItemModel";

type Cart = {
    items: OrderItem[];
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
}

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0
}

export const cartStore = create<Cart>(() => initialState)

export default function useCartService() {
    const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore();

    return {
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        increase: (item: OrderItem) => {
            const exist = items.find(i => i.slug === item.slug);
            const updatedCartItems = exist ? items.map(x => x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x) : [...items, { ...item, qty: 1 }];

            const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
            cartStore.setState({ items: updatedCartItems, itemsPrice, shippingPrice, taxPrice, totalPrice });
        }
    }
}

const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(items.reduce((a, c) => a + c.price * c.qty, 0));
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(Number(itemsPrice * 0.15));
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}
