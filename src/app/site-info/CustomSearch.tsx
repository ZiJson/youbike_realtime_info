"use client";
import { ChangeEvent, use, useEffect, useRef, useState, MouseEvent } from "react";
import searchIcon from "../../../public/svg/search_24px.svg"
import Image from "next/image"
type props = {
    placeholder: string;
    options: string[]
    onChange:(value: string) => void
}

export default function CustomSearch({ placeholder, options, onChange:changeEvent }: props) {
    const searchRef = useRef<HTMLDivElement>(null)
    const [search, setSearch] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    useEffect(()=>{
        if(options.includes(search)) changeEvent(search)
    },[search])

    useEffect(() => {
        const closeDrop = (e: globalThis.MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsFocus(false)
            }
        }
        document.addEventListener("mousedown", closeDrop)

        return () => document.removeEventListener("mousedown", closeDrop)
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setSearch(value)
    }
    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { id: option } = e.target as HTMLElement
        setSearch(option)
        setIsFocus(false)
    }
    return (
        <div ref={searchRef} className="w-fit">
            <label htmlFor="site" className="relative">
                <input
                    id="site"
                    type="text"
                    value={search}
                    className={`w-[175px] h-[40px] bg-[#F3F3F3] px-[16px] py-[8px] rounded-lg font-medium text-[18px] leading-[20px] ${search === "" ? "text-[#AEAEAE]" : "text-[#323232]"}`}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={() => setIsFocus(pre => !pre)}
                >
                </input>
                <Image src={searchIcon} alt="icon" className="absolute top-[50%] translate-y-[-50%] right-[16px]" />
            </label>
            {
                isFocus ?
                    <div className="w-[175px] max-h-60 overflow-x-auto mt-2 bg-[#F3F3F3] px-[16px] py-[8px] rounded-lg text-[#323232] text-[18px] flex flex-col gap-3">
                        {
                            options.filter((option)=>option.includes(search)).map((option,index) => {
                                return (
                                    <div
                                        id={option}
                                        className=" hover:cursor-pointer hover:font-[500]"
                                        key={index}
                                        onClick={onClick}
                                    >
                                        {option}
                                    </div>
                                )
                            })
                        }
                    </div>
                    : null
            }
        </div>
    )
}