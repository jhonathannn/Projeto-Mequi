"use client"

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  }>
}

type menuCategoriesWithProducts = Prisma.MenuCategoryPayload<{
  include: {products: true}
}>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    const [selectCategory, setSelectCategory] = useState<menuCategoriesWithProducts>(restaurant.menuCategories[0])

    const handleCatregoryClick = (category: menuCategoriesWithProducts) =>{
        setSelectCategory(category)
    }

    const getCategoryButtonVariant = (category: menuCategoriesWithProducts) => {
        return selectCategory.id == category.id ? "default" : "secondary"
    }

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-xl bg-white">
      <div className="p-2">
        <div className="flex items-center gap-3 p-5">
            <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
            />
            <div>
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
        </div>
        <div className="mt-2  ps-4 flex items-center gap-1 text-xs text-green-500">
            <ClockIcon size={12} />
            <p>Aberto</p>
        </div>
      </div>

      <ScrollArea className="w-full"> 
        <div className="flex w-max space-x-4 pt-0 p-5">
            {restaurant.menuCategories.map(category => (
                <Button
                    onClick={() => handleCatregoryClick(category)} 
                    className="rounded-full" 
                    key={category.id} 
                    variant={getCategoryButtonVariant(category)}
                    size="sm"
                >
                    {category.name}
                </Button>
            ))}
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>

       <h3 className="px-5 pt-2 font-semibold">{selectCategory.name}</h3>     
      <Products products={selectCategory.products}/>
    </div>
  );
};

export default RestaurantCategories;
