// 'use client'
// import {useCartService } from "@/lib/hooks/useCartStore";
// import { OrderItem } from "@/lib/models/orderItemModel";
// // import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function AddToCart({ item }: { item: OrderItem }) {
//     // const router = useRouter();
//     const { items, increase, decrease } = useCartService();
//     const [existItem, setExistItem] = useState<OrderItem | undefined>();

//     useEffect(() => {
//         setExistItem(items.find(i => i.slug === item.slug))
//     }, [item, items]);

//     const addToCartHandler = async () => {
//         increase(item);
//     }

//     return existItem ?
//         (
//             <div>
//                 <button className="btn" type="button" onClick={() => decrease(existItem)}>-</button>
//                 <span className="px-2">{existItem.qty}</span>
//                 <button className="btn" type="button" onClick={() => increase(existItem)}>+</button>
//             </div>
//         )
//         : (
//             <button className="btn btn-primary w-full" type="button" onClick={addToCartHandler}>
//                 Add to cart
//             </button >
//         )
// }


'use client'
import { useCartStore } from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/orderItemModel";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
    // const router = useRouter();
    const { items, increase, decrease } = useCartStore(state => state);
    const [existItem, setExistItem] = useState<OrderItem | undefined>();

    useEffect(() => {
        setExistItem(items.find(i => i.slug === item.slug))
    }, [item, items]);

    const addToCartHandler = async () => {
        if (increase) {
            increase(item);
        }
    }
    const handleIncrement = async () => {
        if (increase && existItem) {
            increase(existItem);
        }
    }
    const handleDecrement = async () => {
        if (decrease && existItem) {
            decrease(existItem);
        }
    }

    return existItem ?
        (
            <div>
                <button className="btn" type="button" onClick={handleDecrement}>-</button>
                <span className="px-2">{existItem.qty}</span>
                <button className="btn" type="button" onClick={handleIncrement}>+</button>
            </div>
        )
        : (
            <button className="btn btn-primary w-full" type="button" onClick={addToCartHandler}>
                Add to cart
            </button >
        )
}

