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
        document.getElementById('message').value = '';

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

    try{

        let oldMessages = JSON.parse(localStorage.getItem('messages'));
        let lastMsgId;
        if(!oldMessages) {
            console.log('no old messages');
            oldMessages = [];
            lastMsgId = 0;
        }
        else
        {
           // messages = oldMessages;
            lastMsgId = oldMessages[oldMessages.length - 1].id;
        }
        console.log('last msg id', lastMsgId);

        const res = await axios.get(`http://localhost:3000/message/fetch?lastMsgId=${lastMsgId}`);
        console.log("dataaaaaa",res.data)

        if(res.status === 200){
            const newMessages = res.data.message;
            let messages = oldMessages.concat(newMessages);
            if(messages.length > 10){
                messages = messages.slice(messages.length - 10, messages.length);
            }
            console.log('here is your messages',messages)
            localStorage.setItem('messages', JSON.stringify(messages));
            showChat(messages);
        }    
    }
    catch(err)
    {
        console.log(err)
    }
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