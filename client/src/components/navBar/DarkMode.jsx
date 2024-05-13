import React from 'react'
import  light from '../../assets/light.png'
import  dark  from '../../assets/dark.png'


const DarkMode = () => {
    const [theme, setTheme]= React.useState(
        localStorage.getItem("theme")? localStorage.getItem("theme"): "light"

    );

    const element = document.documentElement; 
   //html element
   
    React.useEffect(()=>{
        if (theme == "dark"){
            element.classList.add("dark");
            localStorage.setItem("theme","dark");
        }else{
            element.classList.remove("dark");
            localStorage.setItem("theme","light");
        }
    }, [theme]);


  return (
    <div className='relative'>
        <img src={dark} alt=""
        onClick={()=> setTheme (theme === "light" ? "dark": "light")}
        className={'w-12 cursor-pointer absolute transition-all duration-300 right-0 z-10 ${theme=="dark" ? "opacity-0" : "opacity-100"}' }/>
        <img src={light} alt="" 
        onClick={()=> setTheme (theme === "light" ? "light": "dark")}
        className=' w-12  transition-all duration-300 cursor-pointer'/>
    </div>
  );
};

export default DarkMode