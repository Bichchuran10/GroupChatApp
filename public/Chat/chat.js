// document.getElementById('chat-form').onsubmit = async (event) => {
   
//     try {
//         event.preventDefault();
//         const token = localStorage.getItem('token');
//         const message = document.getElementById('message').value;
//         const groupId = localStorage.getItem('groupId');
//         if(!groupId) {
//             alert('Please select a group first.');
//             return document.getElementById('message').value = '';
           
//         }
//         const res = await axios.post('http://localhost:3000/message/send', 
//         {
//             message: message,
//             groupId: groupId
//         },
//         {
//             headers: {
//                 'Authorization': token
//             }
//         });
//         document.getElementById('message').value = '';

//     } catch (error) {
//         console.log('error while sending msg', error);
//     }
// };

// window.addEventListener('DOMContentLoaded', async () => {
//     try {
//         localStorage.removeItem('groupId');
//        // setInterval(() => {
//             fetchGroups();
//        // }, 1000);  

        
//     } 
//     catch (error) {
//         console.log(error);
//     }
// });


// const fetchMessages=async(groupId, intervalId)=>{

//     try{
//         localStorage.setItem('intervalId', intervalId);
//         console.log('int id isss',intervalId)
        

//         let oldMessages = JSON.parse(localStorage.getItem('messages'));
//         let lastMsgId;
//         if(!oldMessages) {
//             console.log('no old messages');
//             oldMessages = [];
//             lastMsgId = 0;
//         }
//         else
//         {
//             messages = oldMessages;
//             console.log("hahahhaa msg",messages)
//             console.log("hahahha ",lastMsgId)
//             lastMsgId = oldMessages[oldMessages.length - 1].id;
//             console.log('here is lasMsgid',lastMsgId)
//         }
//         console.log('last msg id', lastMsgId);

//         const res = await axios.get(`http://localhost:3000/message/fetch?lastMsgId=${lastMsgId}&groupId=${groupId}`);
//         console.log("response from fetching messages",res)
//         console.log("dataaaaaa",res.data)

//         if(res.status === 200){
//             const newMessages = res.data.message;
//             messages = oldMessages.concat(newMessages);
//             if(messages.length > 10){
//                 messages = messages.slice(messages.length - 10, messages.length);
//             }
//             console.log('here is your messages',messages)
//         }
//             let currentMsgs = [];
//             for(let i =0 ; i < messages.length; i++) {
//             if(messages[i].groupId == groupId){
//                 currentMsgs.push(messages[i]);
//             }
//         }
//             console.log('msgs to show:', currentMsgs);
//             localStorage.setItem('messages', JSON.stringify(messages));
//             showChat(messages);
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }

// function showChat(messages)
// {
//     try{
//         const chatul = document.getElementById('chat-ul');
//         chatul.innerHTML = '';

//         console.log("inside show chat",messages)
//         messages.forEach((message) => {
//             chatul.innerHTML += `
//             <p>
//                 ${message.from}: ${message.message}
//             </p>
//             <br>
//         `;
//         });
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }
// document.getElementById('new-group-btn').onclick = async (e) => {
//     window.location.href = 'createChat.html';
// };

// async function fetchGroups() {
//     try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/chat/getGroups', {
//             headers: {
//                 'Authorization': token
//             }
//         });
//         console.log('get groups response:', res);
//         if(res.status === 200) {
//             const groups = res.data.groups;
//             showGroups(groups);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// function showGroups(groups) {
//     try {
//         // console.log(groups);
//         const chatList = document.getElementById('chat-list');
//         chatList.innerHTML = '';
//         groups.forEach(group => {
//             // console.log(group);
//             // console.log(group.name);
//             chatList.innerHTML += `
//                 <div>
//                 <p id="${group.id}">${group.name}</p>
//                 <button>+</button>
//                 </div>
//                 <hr>
//             `;
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }



// document.getElementById('chat-list').onclick = async (e) => {
//     e.preventDefault();
//     try {
//         e.target.classList.add('active');
//         const previousIntervalId = localStorage.getItem('intervalId');
//         if(previousIntervalId) {
//             clearInterval(previousIntervalId);
//         }
//         console.log(e.target.nodeName);
//         // if(e.target.nodeName === 'P') {
//         //     // e.target.setAttribute('class', 'active');
//         //     const groupId = e.target.id;
//         if(e.target.nodeName === 'BUTTON'){
//             // console.log(e.target.parentElement.children[0].id);
//             const groupId = e.target.parentElement.children[0].id;
//             sessionStorage.setItem('addToGroup', groupId);
//             window.location.href = `newMember.html`;
//         }else {
//             const chatNameDiv = document.getElementById('open-chat');
//             let groupId;
//             if(e.target.nodeName === 'P'){
//                 chatNameDiv.innerHTML = `<p><b>${e.target.innerText}</b></p>`;
//                 groupId = e.target.id;
//             }else {
//                 chatNameDiv.innerHTML = `<p><b>${e.target.children[0].innerText}</b></p>`;
//                 groupId = e.target.children[0].id;
//             }
//             await new Promise((resolve, reject) => {

//                 localStorage.setItem('groupId', groupId);
//                 // localStorage.removeItem('messages');
//                 resolve();
//             });
//             const intervalId = setInterval(() => {

//                 fetchMessages(groupId, intervalId);
//             }, 1000);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// document.getElementById('open-chat').onclick = (e) => {
//     e.preventDefault();
//     try {
//         document.getElementById('members-list').classList.add('active');
//         // console.log('this is getting called');
//         const groupId = localStorage.getItem('groupId');
//         fetchMembersAndShowToUser(groupId);
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function fetchMembersAndShowToUser(groupId) {
//     try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`http://localhost:3000/chat/getMembers/?groupId=${groupId}`, {
//             headers: {
//                 'Authorization': token
//             }
//         });
//         console.log('get members response:', res);
//         if(res.status === 200) {
//             const members = res.data.members;
//             showMembersToUser(members);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// function showMembersToUser(members) {
//     try {
//         const memberBody = document.getElementById('members-ul');
//         memberBody.innerHTML = '';
//         members.forEach(member => {
//             if(member.isAdmin) {
//                 memberBody.innerHTML += `<li>
//                     ${member.dataValues.name} <b>-Admin</b>
//                     <button class="rmadminbtn" id="rmadminbtn-${member.dataValues.id}">Remove Admin Permission</button>
//                     <button class="rmbtn" id="rmbtn-${member.dataValues.id}">Remove User</button>
//                 </li>`;
//             } else {
//                 memberBody.innerHTML += `<li>
//                     ${member.dataValues.name}
//                     <button class="adminbtn" id="mkbtn-${member.dataValues.id}">Make Admin</button>
//                     <button class="rmbtn" id="rmbtn-${member.dataValues.id}">Remove User</button>
//                 </li>`;
//             }
//         }); 
//     } catch (error) {
//         console.log(error);
//     }
// }

// document.getElementById('close-members-btn').onclick = (e) => {
//     e.preventDefault();
//     document.getElementById('members-list').classList.remove('active');
// }

// document.getElementById('members-ul').onclick = (e) => {
//     e.preventDefault();
//     try {
//         if(e.target.className == 'adminbtn'){
//             makeAdmin(e.target.id);
//         }
//         else if(e.target.className == 'rmbtn') {
//             removeMember(e.target.id);
//         } else if(e.target.className == 'rmadminbtn') {
//             removeAdminPermission(e.target.id);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// async function makeAdmin(idString) {
//     try {
//         const userId = idString.split('-')[1];
//         const token = localStorage.getItem('token');
//         const groupId = localStorage.getItem('groupId');
//         const res = await axios.put('http://localhost:3000/admin/makeAdmin', {userId: userId, groupId: groupId}, {
//             headers: {
//                 'Authorization': token
//             }
//         }); 
//         if(res.status === 200) {
//             console.log('setting admin response:', res);
//             confirm('user set as admin');
//             fetchMembersAndShowToUser(groupId);
//         }
//     } catch (error) {
//         console.log(error);
//         if(error.response.status === 403) {
//             alert(`You don't have required permissions.`);
//         }
//     }
// };

// async function removeMember(idString) {
//     try {
//         const userId = idString.split('-')[1];
//         const token = localStorage.getItem('token');
//         const groupId = localStorage.getItem('groupId');
//         let config = { 
//             headers: {
//                 Authorization: token
//             },
//             data: {userId: userId, groupId: groupId}
//         }
//         const res = await axios.delete('http://localhost:3000/admin/removeFromGroup', config); 
//         if(res.status === 200) {
//             console.log('removing user response:', res);
//             confirm('user removed from group');
//             fetchMembersAndShowToUser(groupId);
//         }
//     } catch (error) {
//         console.log(error);
//         if(error.response.status === 403) {
//             alert(`You don't have required permissions.`);
//         }
//     }
// };

// async function removeAdminPermission(idString) {
//     try {
//         const userId = idString.split('-')[1];
//         const token = localStorage.getItem('token');
//         const groupId = localStorage.getItem('groupId');
//         const res = await axios.put('http://localhost:3000/admin/removeAdmin', {userId: userId, groupId: groupId}, {
//             headers: {
//                 'Authorization': token
//             }
//         }); 
//         if(res.status === 200) {
//             console.log('remove admin response:', res);
//             confirm('user removed from admin');
//             fetchMembersAndShowToUser(groupId);
//         }
//     } catch (error) {
//         console.log(error);
//         if(error.response.status === 403) {
//             alert(`You don't have required permissions.`);
//         }
//     }
// };



const chatForm = document.getElementById('chat-form');
const newGroupBtn = document.getElementById('new-group-btn');
const chatList = document.getElementById('chat-list');
const openChat = document.getElementById('open-chat');
const closeMembersBtn = document.getElementById('close-members-btn');
const membersUl = document.getElementById('members-ul');
const baseUrl = `http://localhost:3000`;

chatForm.onsubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const message = document.getElementById('message').value;
        const groupId = localStorage.getItem('groupId');
        if(!groupId) {
            alert('Please select a group first.');
            return document.getElementById('message').value = '';
            // throw new Error('no group selected');
        }
        const res = await axios.post(`${baseUrl}/message/send`, 
        {
            message: message,
            groupId: groupId
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
        localStorage.removeItem('groupId');
        setInterval(() => {
            
            fetchGroupsAndShowToUser(); 
        }, 1000);
        // fetchMessagesAndShowToUser(); 
    } catch (error) {
        console.log(error);
    }
});

async function fetchMessagesAndShowToUser(groupId, intervalId) {
    try {
        localStorage.setItem('intervalId', intervalId);
        let oldMessages = JSON.parse(localStorage.getItem('messages'));
        console.log("old msssgg",oldMessages)
        let lastMsgId;
        let messages;
        if(!oldMessages) {
            console.log('no old messages');
            oldMessages = [];
            lastMsgId = 0;
        }else {
            messages = oldMessages;
            lastMsgId = oldMessages[oldMessages.length - 1].id;
        }
        // console.log('old messages', oldMessages);
        // console.log('messages:', messages);
        // console.log('last msg id', lastMsgId);
        const res = await axios.get(`${baseUrl}/message/fetchNewMsgs/?lastMsgId=${lastMsgId}&groupId=${groupId}`);
        // console.log('fetch res', res);
        
        if(res.status === 200){
            // console.log('this piece is executed');
            const newMessages = res.data.messages;
            messages = oldMessages.concat(newMessages);
            if(messages.length > 10){
                messages = messages.slice(messages.length - 10, messages.length);
            }
            // console.log('messages', messages);
        }    
        let currentMsgs = [];
        for(let i =0 ; i < messages.length; i++) {
            if(messages[i].groupId == groupId){
                currentMsgs.push(messages[i]);
            }
        }
        console.log("the curr msgs ",currentMsgs)
        // console.log('msgs to show:', currentMsgs);
        localStorage.setItem('messages', JSON.stringify(messages));
        showChatToUser(currentMsgs);
    } catch (error) {
        console.log(error);
    }
};

function showChatToUser(messages) {
    try {
        const chatul = document.getElementById('chat-ul');
        chatul.innerHTML = '';
        messages.forEach((message) => {
            // chatBody.innerHTML += message.from+': '+ message.message + `<br>`;
            chatul.innerHTML += `
                <p>
                    ${message.from}: ${message.message}
                </p>
                <br>
            `;

        });
    } catch (error) {
        console.log(error);
    }
}

newGroupBtn.onclick = async (e) => {
    window.location.href = 'createChat.html';
};

async function fetchGroupsAndShowToUser() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/chat/getGroups`, {
            headers: {
                'Authorization': token
            }
        });
        // console.log('get groups response:', res);
        if(res.status === 200) {
            const groups = res.data.groups;
            showGrouopsToUser(groups);
        }
    } catch (error) {
        console.log(error);
    }
}

function showGrouopsToUser(groups) {
    try {
        // console.log(groups);
        const chatList = document.getElementById('chat-list');
        chatList.innerHTML = '';
        groups.forEach(group => {
            // console.log(group);
            // console.log(group.name);
            chatList.innerHTML += `
                <div>
                <p id="${group.id}">${group.name}</p>
                <button>+</button>
                </div>
                <hr>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}

chatList.onclick = async (e) => {
    e.preventDefault();
    try {
        e.target.classList.add('active');
        const previousIntervalId = localStorage.getItem('intervalId');
        if(previousIntervalId) {
            clearInterval(previousIntervalId);
        }
    
        if(e.target.nodeName === 'BUTTON'){
            // console.log(e.target.parentElement.children[0].id);
            const groupId = e.target.parentElement.children[0].id;
            sessionStorage.setItem('addToGroup', groupId);
            window.location.href = `newMember.html`;
        }else {
            const chatNameDiv = document.getElementById('open-chat');
            let groupId;
            if(e.target.nodeName === 'P'){
                chatNameDiv.innerHTML = `<p><b>${e.target.innerText}</b></p>`;
                groupId = e.target.id;
            }else {
                chatNameDiv.innerHTML = `<p><b>${e.target.children[0].innerText}</b></p>`;
                groupId = e.target.children[0].id;
            }
            await new Promise((resolve, reject) => {
                localStorage.setItem('groupId', groupId);
                resolve();
            });
            const intervalId = setInterval(() => {
                fetchMessagesAndShowToUser(groupId, intervalId);
            }, 1000);
        }
    } catch (error) {
        console.log(error);
    }
}

openChat.onclick = (e) => {
    e.preventDefault();
    try {
        document.getElementById('members-list').classList.add('active');
        // console.log('this is getting called');
        const groupId = localStorage.getItem('groupId');
        fetchMembersAndShowToUser(groupId);
    } catch (error) {
        console.log(error);
    }
}

async function fetchMembersAndShowToUser(groupId) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/chat/getMembers/?groupId=${groupId}`, {
            headers: {
                'Authorization': token
            }
        });
        console.log('get members response:', res);
        if(res.status === 200) {
            const members = res.data.members;
            showMembersToUser(members);
        }
    } catch (error) {
        console.log(error);
    }
}

function showMembersToUser(members) {
    try {
        const memberBody = document.getElementById('members-ul');
        memberBody.innerHTML = '';
        members.forEach(member => {
            if(member.isAdmin) {
                memberBody.innerHTML += `<li>
                    ${member.dataValues.name} <b>-Admin</b>
                    <button class="rmadminbtn" id="rmadminbtn-${member.dataValues.id}">Remove Admin Permission</button>
                    <button class="rmbtn" id="rmbtn-${member.dataValues.id}">Remove User</button>
                </li>`;
            } else {
                memberBody.innerHTML += `<li>
                    ${member.dataValues.name}
                    <button class="adminbtn" id="mkbtn-${member.dataValues.id}">Make Admin</button>
                    <button class="rmbtn" id="rmbtn-${member.dataValues.id}">Remove User</button>
                </li>`;
            }
        }); 
    } catch (error) {
        console.log(error);
    }
}

closeMembersBtn.onclick = (e) => {
    e.preventDefault();
    document.getElementById('members-list').classList.remove('active');
}

membersUl.onclick = (e) => {
    e.preventDefault();
    try {
        if(e.target.className == 'adminbtn'){
            makeAdmin(e.target.id);
        }
        else if(e.target.className == 'rmbtn') {
            removeMember(e.target.id);
        } else if(e.target.className == 'rmadminbtn') {
            removeAdminPermission(e.target.id);
        }
    } catch (error) {
        console.log(error);
    }
};

async function makeAdmin(idString) {
    try {
        const userId = idString.split('-')[1];
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupId');
        const res = await axios.put(`${baseUrl}/admin/makeAdmin`, {userId: userId, groupId: groupId}, {
            headers: {
                'Authorization': token
            }
        }); 
        if(res.status === 200) {
            console.log('setting admin response:', res);
            confirm('user set as admin');
            fetchMembersAndShowToUser(groupId);
        }
    } catch (error) {
        console.log(error);
        if(error.response.status === 403) {
            alert(`You don't have required permissions.`);
        }
    }
};

async function removeMember(idString) {
    try {
        const userId = idString.split('-')[1];
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupId');
        let config = { 
            headers: {
                Authorization: token
            },
            data: {userId: userId, groupId: groupId}
        }
        const res = await axios.delete(`${baseUrl}/admin/removeFromGroup`, config); 
        if(res.status === 200) {
            console.log('removing user response:', res);
            confirm('user removed from group');
            fetchMembersAndShowToUser(groupId);
        }
    } catch (error) {
        console.log(error);
        if(error.response.status === 403) {
            alert(`You don't have required permissions.`);
        }
    }
};

async function removeAdminPermission(idString) {
    try {
        const userId = idString.split('-')[1];
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupId');
        const res = await axios.put(`${baseUrl}/admin/removeAdmin`, {userId: userId, groupId: groupId}, {
            headers: {
                'Authorization': token
            }
        }); 
        if(res.status === 200) {
            console.log('remove admin response:', res);
            confirm('user removed from admin');
            fetchMembersAndShowToUser(groupId);
        }
    } catch (error) {
        console.log(error);
        if(error.response.status === 403) {
            alert(`You don't have required permissions.`);
        }
    }
};
