"use client";
import { useEffect, useRef, useState } from "react";
import icon from "../../../public/svg/icon.svg";
import Image from "next/image";
import { MouseEvent } from "react";

type props = {
    placeholder: string
    options: string[]
    onChange: (value: string) => void
}



export default function CustomSelect({ placeholder, options, onChange }: props) {
    const selectRef = useRef<HTMLDivElement>(null)
    const [expand, setExpand] = useState(false)
    const [selected, setSelected] = useState("")

    useEffect(()=>{
        const closeDrop=(e:globalThis.MouseEvent)=>{
            if(selectRef.current&& !selectRef.current.contains(e.target as Node)){
                setExpand(false)
            }
        }
        document.addEventListener("mousedown",closeDrop)

        return ()=> document.removeEventListener("mousedown",closeDrop)
    })

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { id: option } = e.target as HTMLElement
        onChange(option)
        setSelected(option)
        setExpand(false)
    }
    return (
        <div ref={selectRef} className="w-fit">
            <div
                className=" w-[175px] h-[40px] bg-[#F3F3F3] px-[16px] py-[8px] rounded-lg flex justify-between items-center hover:cursor-pointer"
                onClick={() => setExpand(pre => !pre)}
            >
                {
                    selected === "" ?
                        <p className=" font-medium text-[18px] leading-[20px] text-[#AEAEAE]">{placeholder}</p>
                        :
                        <p className=" font-medium text-[18px] leading-[20px] text-[#323232] ">{selected}</p>
                }
                <Image src={icon} alt="icon" />
            </div>
            {
                expand ?
                    <div className="w-[175px] mt-2 bg-[#F3F3F3] px-[16px] py-[8px] rounded-lg text-[#323232] text-[18px] flex flex-col gap-3">
                        {
                            options.map(option => {
                                return (
                                    <div
                                        id={option}
                                        className=" hover:cursor-pointer hover:font-[500]"
                                        key={option}
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