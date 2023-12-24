"use client";
import Link from "next/link"
import { Navigation } from "./Navbar"
import { use } from "react"

type props = {
    navs: Navigation[]
    pathname: string
    expand:boolean
    closeSidebar:()=>void
}

export default function SideBar({ navs, pathname, expand,closeSidebar }: props) {
    return (
        <div className={`absolute px-[32px] py-[32px] w-screen h-[calc(100vh-72px)] top-full right-0 bg-[#B5CC22] text-[18px] flex flex-col justify-between ${expand?"translate-x-0":"translate-x-full"} transition-all duration-500 lg:hidden`}>
            <div className="flex flex-col gap-[32px]">
                {navs.map((nav) => {
                    return (
                        <Link href={nav.route} key={nav.label} className={`w-fit font-[500] leading-6 ${pathname === nav.route ? 'text-[#677510]' : 'text-white'} hover:text-[#677510]`} onClick={closeSidebar}>
                            {nav.label}
                        </Link>
                    )
                })}
            </div>
            <button className="w-fit leading-5 text-[#B5CC22] py-[10px] px-[24px] bg-white font-[400] rounded-full">
                登入
            </button>
        </div>
    )
}