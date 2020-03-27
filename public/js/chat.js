function createMessage(month, day, msgTime, sender, message){
    var container = document.getElementById("conversation");
	let msgContainer = document.createElement("div");
    msgContainer.classList.add("message");
    
    let dateContainer = document.createElement("h4");
    let date = document.createElement("span");
    date.textContent = `${month} ${day}`;

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("contactImg");
    let img = document.createElement("img");
	img.src = "https://randomuser.me/api/portraits/med/men/11.jpg";

    let dataContainer = document.createElement("div");
	dataContainer.classList.add("contactContainer");

	let chatCenter = document.createElement("div");
	chatCenter.classList.add("chatCenter");

    let firstRow = document.createElement("div");
    
    let name = document.createElement("div");
    name.classList.add("contactName");
    name.textContent = sender;
    name.style.fontWeight = "bold";
    let dot = document.createTextNode(" \u2022 ");

    let time = document.createElement("div");
    time.classList.add("messageTime");
    time.textContent = msgTime;

    let msg = document.createElement("div");
    msg.classList.add("messageData");
    msg.textContent = message;

    firstRow.append(name);
    firstRow.append(dot);
    firstRow.append(time);
    chatCenter.append(firstRow);
    chatCenter.append(msg);

    imgContainer.append(img);
    dataContainer.append(imgContainer);
    dataContainer.append(chatCenter);

    dateContainer.append(date);

    msgContainer.append(dateContainer);
    msgContainer.append(dataContainer);
    
    container.append(msgContainer);
}

function selectChat(element){
    console.log(element.id);
}