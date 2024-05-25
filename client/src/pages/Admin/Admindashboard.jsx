import React from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import { FaRegCalendarMinus } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { BarChart, Bar, Rectangle, } from 'recharts';

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
        <div className='flex font-[Lato] ' >
            <div className='basis-[15%] h-[100vh]'>
                <SideBar />
            </div>
            <div className='basis-[85%]'>
                <DashBoardView />
                <div className='pt-[35px] px-[25px] bg-bray-100'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black text-[40px] leading-[14px] font-medium cursor-pointer'> Dashboard </h1>
                        <button className='bg-c3 h-[50px] rounded-md text-white flex items-center text-[20px] justify-center px-[30px] cursor-pointer'>Generate Reports</button>
                    </div>
                    {/* Earnings and Total orders */}
                    <div className='grid  grid-cols-3 gap-[100px] mt-[25px] pb-[15px] mr-84 pr-96'>
                        <div className='h-[120px] rounded-md bg-c3 border-l-[10px] border-orange-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out'>
                            <div>
                                <h2 className='text-white text-[22px] leading-[24px] font-bold'>Earnings (Weekly)</h2>
                                <h1 className='text-[24px] leading-[24px] font-bold text-white mt-[12px]'>Rs. 200000.00 </h1>
                            </div>
                            <FaRegCalendarMinus fontSize={45} color='white' />

                        </div>
                        <div className='h-[120px] rounded-md bg-c3 border-l-[10px] border-orange-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out'>
                            <div>
                                <h2 className='text-white text-[22px] leading-[24px] font-bold'>Total Orders</h2>
                                <h1 className='text-[24px] leading-[24px] font-bold text-white mt-[12px]'>236</h1>
                            </div>
                            <TbPackages fontSize={50} color='white' />
                        </div>
                    </div>
                    {/* Bar Chart */}
                    <div className='flex mt-[60px] w-full gap-[30px]'>
                        <div className='basis-[50%] border bg-orange-50 shadow-md cursor-pointer rounded-md'>
                            <div className='bg-b1 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-gray-500 mb-[20px]'>
                                <h2 className='text-[25px] text-white font-semibold'>Sales Overview</h2>
                            </div>
                            <div>
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={data1}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </div>
                        </div>
                        {/* Line Chart */}
                        <div className='basis-[50%] border bg-orange-50 shadow-md cursor-pointer rounded-md'>
                            <div className='bg-b1 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-gray-500 mb-[20px]'>
                                <h2 className='text-[25px] text-white font-semibold'>Sales Overview</h2>
                            </div>
                            <div>
                                <LineChart
                                    width={800}
                                    height={400}
                                    data={data2}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Admindashboard