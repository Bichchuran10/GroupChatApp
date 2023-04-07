const signup=async(event)=>{
    try{
    event.preventDefault()
    let name=event.target.name.value
    let email=event.target.email.value
    let phone=event.target.phone.value
    let password=event.target.password.value

    const user={
        name,
        email,
        phone,
        password
    }

    let response=await axios.post(`http://localhost:3000/user/signup`,user)
    console.log(response)
    if(response.status === 201) {
        alert(response.data.message)
        window.location.href ='../Login/login.html'
        }
    }
    catch (error) {
        console.log(error);
        if(error.status === 401){
            alert('User already exists. Please Login.');
        }
        document.getElementById('error').innerHTML+= `${error.data.message}`;
        
    }
}