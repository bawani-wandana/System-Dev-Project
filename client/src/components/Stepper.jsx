import React, { useState, useEffect, useRef } from 'react'


const Stepper = ({ steps, currentStep }) => {

    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps]
        let count=0;

        while (count< newSteps.length){
            if(count === stepNumber){
                newSteps[count]={
                    ...newSteps[count],
                    highlighted:true,
                    selected:true,
                    completed:false,
                }
            count++;             
        }
        else if (count < stepNumber){
                newSteps[count]={
                    ...newSteps[count],
                    highlighted:false,
                    selected:true,
                    completed:true,
                };
            count++;             
        }
        else {
            newSteps[count]={
                ...newSteps[count],
                highlighted:false,
                selected:false,
                completed:false,
            };
        count++; 

        }
        }
        return newSteps;
    };


    useEffect(() => {
        //create object
        const stepsState = steps.map((step, index) =>
            Object.assign({}, {
                description: step,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false,
            }));

        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);
    }, [steps, currentStep]);


    const displaySteps = newStep.map((step, index) => {

        return (
            <div key={index}
                className= {index ===! newStep.length -1 ?  
                'w-full flex  items-center': 'flex items-center'}>
                <div className='relative flex flex-col items-center text-b1'>
                    <div className={`rounded-full transition duration-500 ease-in-out
border-2 border-gray-800 h-12 w-12 flex items-center
justify-center py-3 ${step.selected ? "bg-b1 text-white border border-blue-500" : " "}`}>
                        {/* display number */}
                        {step.completed ? (
                            <span className='text-white text-[20px]'>&#10003;</span>
                        ): (
                            index + 1
                        )}
                    </div>
                    <div className={`absolute uppercase top-0 text-center mt-16 w-32 text-[20px] ${step.highlighted ? "text-black": "text-gray-600"}`}>
                         {/* display description */}
                        {step.description}
                    </div>
                </div>
                {index !== newStep.length - 1 && (
                <div className={`flex w-[360px] border-[2px] transition duration-500 ease-in-out ${step.completed ? "border-b1": "border-gray-300"}`}>
                    {/* display line */}
                </div>
                )}
            </div>
        );
    });



    return (
        <div className='mx-4 p-4 flex justify-between items-center'>
            {displaySteps}

        </div>
    );
};

export default Stepper