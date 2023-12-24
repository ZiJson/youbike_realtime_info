"use client";
import { useQuery } from "@tanstack/react-query";
import CustomSearch from "./CustomSearch";
import CustomSelect from "./CustomSelect";
import { useEffect, useState } from "react";

async function getData() {
    const res = await fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

const cityData = ["台北市", "新北市", "台中市", "桃園市"]


export default function SiteInfo() {
    // const [data, setData] = useState<Data[]>([])
    // const data = await getData()
    const { data } = useQuery<Data[]>({
        queryKey: ['siteInfo'],
        queryFn: getData,
        initialData: [],
        refetchInterval:60000
    }
    )
    const onSearchChange = (value: string) => {
        console.log(value)
    }
    return (
        <div className=" container pt-[136px] px-[124px] pb-[32px]">
            <h1 className=" text-[#B5CC22] text-[24px] leading-[24px] font-[700]">站點資訊</h1>
            <div className=" flex gap-6">
                <CustomSelect placeholder="選擇縣市" options={cityData} onChange={onSearchChange} />
                <CustomSearch placeholder="搜尋站點" options={data.map((item) => item.sna.slice(11))} onChange={onSearchChange} />
            </div>
        </div>
    )
}

export type Data = {
    "sno": string
    "sna": string
    "tot": string
    "sbi": string
    "sarea": string
    "mday": string
    "lat": string
    "lng": string
    "ar": string
    "sareaen": string
    "snaen": string
    "aren": string
    "bemp": string
    "act": string
    "srcUpdateTime": string
    "updateTime": string
    "infoTime": string
    "infoDate": string
}