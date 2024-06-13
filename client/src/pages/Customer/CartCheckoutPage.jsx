import React, { useState } from 'react'
import Navbar from '../../components/navBar/Navbar'
import ShoppingCart from '../../components/ShoppingCart'
import StepperControl from '../../components/StepperControl'
import Stepper from '../../components/Stepper'
import CheckOut from './CheckOut'
import PaymentPage from './PaymentPage'
import Footer from '../../components/footer/Footer'
import { StepperContext } from '../../contexts/StepperContext'
import OrderComplete from './OrderComplete'



const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState('');
    const [finalData, setFinalData] = useState([]);
    const steps = [
        "cart",
        "Checkout",
        "Payment",
        "confirmation",
    ];

    const addItemToCart = (item) => {
        setCart([...cart, item]);
        
    }

    const [selectedOption, setSelectedOption] = useState('Pick Up');
    const [totalWithoutShipping, setTotalWithoutShipping] = useState(0);

    const handleTotalUpdate = (newSubtotal) => {
        setTotalWithoutShipping(newSubtotal);
    };

    const displaySteps = (step) => {
        switch (step) {
            case 1:
                return <ShoppingCart updateTotal={handleTotalUpdate} />
            case 2:
                return <CheckOut totalWithoutShipping={totalWithoutShipping}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />
            case 3:
                return <PaymentPage />
            case 4:
                return <OrderComplete />
            default:
           
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    }


    return (
        <div className='bg-blue-100 dark:bg-gray-900'>
            <Navbar />
            <div className='md:w-3/4 mt-14 mx-auto shadow-xl rounded-2xl pt-4 pb-2 bg-white'>
                {/* Stepper */}
                <div className='container horizontal mt-5 ml-20'>
                    <Stepper steps={steps}
                        currentStep={currentStep} />
                </div>
                {/* Display Components */}
                <div className='my-10 p-4'>
                    <StepperContext.Provider value={{
                        userData,
                        setUserData,
                        finalData,
                        setFinalData,
                    }}>
                        {displaySteps(currentStep)}

                    </StepperContext.Provider>
                </div>


                <StepperControl
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={steps} />
            </div>
            <Footer />

        </div>
    )
}

export default CartPage