'use client'
import { useCartStore } from "@/lib/hooks/useCartStore"
import { useEffect, useState } from "react";
import Link from "next/link";
const Menu = () => {
    const { items } = useCartStore(state => state);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ul>
            <li>
                <Link className="btn btn-ghost rounded-btn" href='/cart'>
                    Cart
                    {mounted && items.length !== 0 && (
                        <div className="badge badge-secondary">
                            {items.reduce((a, c) => a + c.qty, 0)}
                        </div>
                    )}
                </Link>
            </li>
            <li>
                <button className="btn btn-ghost rounded-btn" type="button">
                    Sign in
                </button>
            </li>
        </ul>
    )

}

export default Menu;
