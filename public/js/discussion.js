function toggleReply(id){
    console.log(id)
    var replyContainer = document.getElementById(id);
    if(replyContainer.style.display == "flex"){
        replyContainer.style.display = "none";
    } else {
        replyContainer.style.display = "flex"
    }
    console.log("CLICK!")
}
