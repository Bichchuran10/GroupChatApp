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

    let response=await axios.post('http://localhost:3000/user/login',loginDetails)
    if(response.status==200){   
        alert('User login successful') 
        localStorage.setItem('token',res.data.token)
    }
}
    catch(err)
    {
            console.log(err);
            document.body.innerHTML=`<div style="color:red;">${err.message} <div>`

    }
}