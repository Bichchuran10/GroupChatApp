document.getElementById('group-name-form').onsubmit = async (e) => {
    
    try {
        e.preventDefault();
        const groupname = document.getElementById('groupname');
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/chat/nameTheGroup', 
            {groupname: groupname.value, groupid: localStorage.getItem('createdGroupId')},
            {
                headers: {
                    'Authorization': token
                } 
            } 
        );
        console.log('group name response:', res);
        if(res.status === 200) {
            alert('group created successfully')
            window.location.href = 'chat.html';
        }
    } catch (error) {
        console.log(error);
    }
};