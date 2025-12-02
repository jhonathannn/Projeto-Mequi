"use client"

import { Prisma } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../context/cart";
import CartSheets from "./cart-sheet";

interface ProductDetailProps{
    product: Prisma.ProductGetPayload<{include: {
        restaurant: {
            select: {
                name: true,
                avatarImageUrl: true
            },
        },
    },
}>}

const ProductDetail = ({product}: ProductDetailProps) => {

    const { toggleCart} = useContext(CartContext)

    const [quantity, setQuantity] = useState<number>(1)

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if(prev == 1){
                return 1
            } 
            return prev - 1
        })
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleAddToCart = () => {
        toggleCart()
    }

    return ( 
        <>
        <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5  flex flex-col flex-auto overflow-hidden">
            <div className="flex-auto overflow-hidden">
                {/* restaurante */}
                <div className="flex items-center gap-1.5 ">
                    <Image
                        src={product.restaurant.avatarImageUrl}
                        alt={product.restaurant.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground space-x-1">{product.restaurant.name}</p>
                </div>

                {/* nome do produto */}
                <h2 className="mt-1 text-xs font-semibold">{product.name}</h2>

                {/* preço e quantidade */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {formatCurrency(product.price)}
                    </h3>
                    <div className="flex items-center gap-3 text-center">
                        <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                            <ChevronLeftIcon/>
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                            <ChevronRightIcon/>
                        </Button>
                    </div>
                </div>

                <ScrollArea className="h-full">
                    {/* sobre */}
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    {/* Ingredientes */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-1">
                            <ChefHatIcon size={18}/>
                            <h4 className="font-semibold">Ingredientes</h4>
                        </div>
                        <ul className="list-disc px-5 text-sm text-muted-foreground">
                            {product.ingredients.map((i) =>(
                                <li key={i}>{i}</li>
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </div>

             <Button onClick={handleAddToCart} className="rounded-full w-full mt-6">Adicionar à sacola</Button>
        </div>
        <CartSheets/>
        </>
     );
}
 
export default ProductDetail;