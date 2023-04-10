document.getElementById('chat-form').onsubmit = async (event) => {
   
    try {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const message = document.getElementById('message').value;
        const res = await axios.post('http://localhost:3000/message/send', 
        {
            message: message
        },
        {
            headers: {
                'Authorization': token
            }
        });

    } catch (error) {
        console.log('error while sending msg', error);
    }
};

window.addEventListener('DOMContentLoaded', async () => {
    try {
        setInterval(() => {
            fetchMessages();
        }, 1000);  
    } 
    catch (error) {
        console.log(error);
    }
});


const fetchMessages=async()=>{

    const res = await axios.get('http://localhost:3000/message/fetch');
    console.log("dataaaaaa",res.data)
    const messages = res.data.message;
    showChat(messages);

}

function showChat(messages)
{
    try{
        const chatBody = document.getElementById('chat-body');
        chatBody.innerHTML = '';
        messages.forEach((message) => {
            chatBody.innerHTML += message.message + `<br>`;
        });
    }
    catch(err)
    {
        console.log(err)
    }
}