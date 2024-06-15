import React from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import { FaRegCalendarMinus } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { BarChart, Bar, Rectangle, } from 'recharts';
import Navbar from '../../components/navBar/Navbar';
import ItemSales from '../../components/itemSales';
import ItemRevenue from '../../components/itemRevenue';

const data1 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const data2 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Admindashboard = () => {
    return (

        <div className='font-[Lato] dark:bg-gray-900 ' >
            <div>
                <Navbar />
            </div>
            <div className='flex'>
                <div className='basis-[15%] h-[100vh]'>
                    <SideBar />
                </div>
                <div className='basis-[85%]'>
                    <DashBoardView />
                    <div className='pt-[35px] px-[25px] bg-bray-100'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-black text-[40px] leading-[14px] font-medium cursor-pointer dark:text-white'> Dashboard </h1>
                            <button className='bg-c3 h-[50px] rounded-md text-white flex items-center text-[20px] justify-center px-[30px] cursor-pointer'>Generate Reports</button>
                        </div>
                        
                        <ItemSales/>

                        <ItemRevenue/>
                        </div>

                    </div>
                </div>
            </div>

    )
}

export default Admindashboard