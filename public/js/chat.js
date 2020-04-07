function scrollToBottomOfChat(){
    var chatDiv = document.getElementById("conversation");
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

const highlightSelectedElement = id => {
    console.log("hi")
    let el = document.getElementById(`c${id}`);
    let chatContainers = document.getElementsByClassName("contactContainer");
    for (container of chatContainers) {
        container.style.backgroundColor = "#FFFFFF";
    }
    document.getElementById(id).click();
    el.style.backgroundColor = "#F8F8F8";
}

scrollToBottomOfChat();