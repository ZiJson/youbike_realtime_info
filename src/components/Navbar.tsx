"use client";
import Link from "next/link"
import logo from "../../public/img/logo_180x180 1.png"
import menu from "../../public/svg/menu_24px.svg"
import close from "../../public/svg/close_24px.svg"
import Image from "next/image"
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";
import { useState } from "react";

type props = {
    navigations: Navigation[]
}
export type Navigation = {
    label: string,
    route: string
}

export default function Navbar({ navigations }: props) {
    const pathname = usePathname()
    const [expand,setExpand] = useState(false)
    const closeSidebar = () => {
        setExpand(false)
    }
    return (
        <div className="conteiner fixed w-screen  h-[72px] lg:h-[104px] px-[32px] lg:px-[124px] border-b border-[#EBEBEB] flex items-center text-[18px] gap-[60px] justify-between">
            <Link href="/" className="basis-[65px] lg:basis-[95px]">
                <Image src={logo} alt="logo" />
            </Link>
            <div className="grow lg:flex justify-between items-center hidden">
                <div className="flex gap-[40px]">
                    {navigations.map((nav => {
                        return (
                            <Link href={nav.route} key={nav.label} className={`font-[500] leading-6 ${pathname === nav.route ? 'text-[#B5CC22]' : 'text-[#677510]'} hover:text-[#B5CC22]`}>
                                {nav.label}
                            </Link>
                        )
                    }))}
                </div>
                <button className="leading-5 bg-[#B5CC22] py-[10px] px-[24px] text-white font-[400] rounded-full">
                    登入
                </button>
            </div>
            <button className="block lg:hidden" onClick={()=>setExpand(pre=>!pre)}>
                <Image src={expand?close:menu} alt="menu" />
            </button>
            <SideBar navs={navigations} pathname={pathname} expand={expand} closeSidebar={closeSidebar}/>
        </div>
    )
}
