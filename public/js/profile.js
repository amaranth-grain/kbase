const submitForm = id => {
    console.log(document.getElementById(id));
    document.getElementById(id).submit();
    console.log(`Form submitted`);
}