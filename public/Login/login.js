const login=async(event)=>
{
    try{
    event.preventDefault()
    let email=event.target.email.value
    let password=event.target.password.value

    const loginDetails={
        email,
        password
    }
    console.log(loginDetails)

    let response=await axios.post('http://localhost:3000/user/login',loginDetails)
    console.log("The response from login",response)
    if(response.status==200){   
        alert('User login successful') 
        localStorage.setItem('token',response.data.token)
        email.value ="";
        password.value ="";
        window.location.href="../Chat/chat.html"
    }
}
    catch(err)
    {
            console.log(err);
            document.body.innerHTML=`<div style="color:red;">Not sure${err.message} <div>`

    }
}