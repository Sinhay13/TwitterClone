window.addEventListener('DOMContentLoaded',()=>{
    bindTweet();
    
})

function bindTweet(){// function conter client pour suprimer les tweets
    const elements=document.querySelectorAll("btn-danger")// on lui demande de checker les element contenant cette classe
    const tweetContainer = document.querySelector("#tweet-list-container")//on recupere l'id dans la vue tweet.pug
    console.log("elements")
    elements.forEach(e=>{
        e.addEventListener  ("click",($event)=>{ // on lui dit d'ecouter quand on clic
            const tweetId= $event.target.getAttribute('tweetid') // on recupere l'Id dans target + get attribute
            axios.delete('/tweets/' + tweetId)// on appel axio et on lui demande de delete on nome nos elements en fonction de notre route
                 .then(function(response){// on gére la reponse
                    tweetContainer.innerHTML=response.data// on recupere la reponse
                    bindTweet()// on rapelle notre pour actualiser la liste des tweets
                 })
                 .catch( function(err){console.log(err)});// on gére lerreur
        })
    })
}