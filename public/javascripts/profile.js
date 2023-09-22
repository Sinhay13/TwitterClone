// Wait for the DOM content to load before binding the tweet functionality
window.addEventListener('DOMContentLoaded', () => {
    // we stock the image post  with id from profile template 
    const inputAvatar= document.querySelector('#input-avatar');
    const formContainer= document.querySelector('#form-container');

    // add listener for click
    formContainer.addEventListener('click', (e)=> {
        inputAvatar.click();
    });
    // add listener for changing img 
    inputAvatar.addEventListener('change', ()=>{
        formContainer.submit();
    })


});