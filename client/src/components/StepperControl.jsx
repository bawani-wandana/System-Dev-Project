import React from 'react'

const StepperControl = ({handleClick, currentStep, steps}) => {
  return (
    <div className='container flex justify-between ml-20 mt-20 mb-4'>
        {/* back button */}
        <button 
        onClick={()=>handleClick()} 
        className={` bg-c3 text-white py-2 px-8 rounded-md cursor-pointer
        border-2 border-slate-300 hover:bg-b1 hover:text-white transition duration-200
        ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed": ""}`}>
            Back
        </button>

        {/* next button */}
        <button 
        onClick={()=>handleClick("next")} 
        className=' bg-b1 text-white  py-2 px-8 rounded-md  cursor-pointer
        border-2 border-slate-300 hover:bg-c3 hover:text-white transition duration-200
        ease-in-out'>
                {currentStep === steps.length -1 ? "Confirm" : "Next"}
        </button>
    </div>
  )
}

export default StepperControl