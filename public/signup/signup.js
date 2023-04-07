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

    let response=axios.post(`http://localhost:3000/user/signup`,user)
    }
    catch (error) {
        console.log(error);
        document.getElementById('error-text').innerHTML += `${error}`;
    }
}