function loadConversation(element){
    var user_id = 1;
    fetch('/conversation', {
		method: 'post',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify({"user_id": user_id, "contact_id": element.id})
	})
    .then((res) => res.json())
    .then((data) => {
        var container = document.getElementById("chats");
        while (container.firstChild) {
            container.firstChild.remove();
        }
        for(let i = 0; i < data.messages.length; i++){
            console.log(data.messages[i].message)
        }
    })
    .catch((err) => console.log(err));
}

function createMessage(){
    
}

function selectChat(element){
    console.log(element.id);
}