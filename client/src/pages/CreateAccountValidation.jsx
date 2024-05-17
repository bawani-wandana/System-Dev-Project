function validation (values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/
    const confirmpassword_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/
    const phonenumber_pattern = /^\d{10}$/
    const username_pattern = /^[a-z0-9_]+$/
    
 

    if (values.firstname === ""){
        error.firstname =  "First Name should not be empty"
    }
    else {
        error.firstname =""
    }

    
    if (values.lastname === ""){
        error.lastname =  "Last Name should not be empty"
    }
    else {
        error.lastname =""
    }

    if (values.email === ""){
        error.email =  "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "Email is not valid"
    }else {
        error.email =""
    }

    if (values.username === ""){
        error.username =  "Username should not be empty"
    }
    else if (!username_pattern.test(values.username)){
        error.username = "Username is not valid"
    }else {
        error.username =""
    }

    if (values.phonenumber === ""){
        error.phonenumber =  "Phone Number should not be empty"
    }
    else if (!phonenumber_pattern.test(values.phonenumber)){
        error.phonenumber  = "Phone Numbe is not valid"
    }else {
        error.phonenumber  =""
    }



    if (values.password ===""){
        error.password = "Password is required"
    }
    else if (!password_pattern.test(values.password)){
        error.password = "Password should be at least 8 character and must contain numbers, simple & capital letters"
    }else {
        error.password =""
    }

    if (values.confirmpassword === ""){
        error.confirmpassword = "Confirm Password is required"
    }
    else if (!confirmpassword_pattern.test(values.confirmpassword)){
        error.confirmpassword = "Password should be at least 8 character and must contain numbers, simple & capital letters"
    }
    else if (values.confirmpassword !== values.confirmpassword){
        error.confirmpassword = "Password is not matched"
    }else {
        error.confirmpassword =""
    }

    return error;


}

export default validation