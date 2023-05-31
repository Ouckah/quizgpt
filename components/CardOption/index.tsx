import Link from 'next/link';
import React from 'react';

type CardOptionProps = {
    title: string,
    description: string,
    image: string,
    href: string,
}

const CardOption = ({ title, description, image, href }: CardOptionProps) => {
    return (
        <>

            <Link className="flex w-52 h-full flex-col bg-gray-900 shadow-blue rounded-xl gap-2 transition-all duration-300 hover:scale-150 hover:z-10" href={href}>
                <img className="h-1/2 rounded-t-xl" src={image}/>
                <h1 className="font-semibold px-5 pt-3">{title}</h1>
                <p className="text-sm opacity-75 px-5 pb-3">{description}</p>
            </Link>
        
        </>
    )
}

export default CardOption;