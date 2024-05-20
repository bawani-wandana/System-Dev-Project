import React from 'react'
import SideBar from '../components/SideBar'
import DashBoardView from '../components/DashBoardView'

const AdminInventory = () => {
    return (
        <div className='flex'>
            <div className='basis-[15%] h-[100vh]'>
                <SideBar />
            </div>
            <div className='basis-[85%]'>
                <DashBoardView />
                <div className='text-[200px]'>
                <div>
                    <div></div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AdminInventory