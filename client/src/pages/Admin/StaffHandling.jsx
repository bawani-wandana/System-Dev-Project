import React from 'react'
import SideBar from '../../components/SideBar';
import DashBoardView from '../../components/DashBoardView';
import EnhancedTable from '../../components/EnhancedTable';

const headCells = [
    { id: 'staffid', numeric: false, disablePadding: true, label: 'Staff ID' },
    { id: 'firstname', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'lastname', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phonenumber', numeric: true, disablePadding: false, label: 'Phone Number' },
];

const rows = [
    { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, phonenumber: 4.5 },
 
];



const StaffHandling = () => {


    return (
        <div className='flex font-[Lato]'>
            <div className='basis-[15%] h-[100vh]'>
                <SideBar />
            </div>
            <div className='basis-[85%]'>
                <DashBoardView />
                <div className='mt-10 ml-8 mr-8 '>
                    <EnhancedTable rows={rows} headCells={headCells}  />
                </div>





            </div>
        </div>
    )
}

export default StaffHandling