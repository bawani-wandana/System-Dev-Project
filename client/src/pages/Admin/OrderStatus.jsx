import React from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import DataTable from 'react-data-table-component'

const OrderStatus = () => {


     
    return (
        <div className='flex font-[Lato]'>
            <div className='basis-[15%] h-[100vh]'>
                <SideBar />
            </div>
            <div className='basis-[85%]'>
                <DashBoardView />
                <div>

                </div>

            </div>
        </div>
    )
}

export default OrderStatus