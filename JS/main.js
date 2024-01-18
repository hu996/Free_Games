let rowdata=document.querySelector('.row');
let header=document.querySelectorAll('ul a');
let closeDetails=document.querySelector('.close');
let game=document.querySelector('.game');
let detailsPage= document.querySelector('.overlay');

let detailsgame=document.querySelector('.gamedt');
let htmanage=document.querySelector('.selectthisdivtoshowandhide');


// console.log(detailsgame.innerHTML="husein");

closeDetails.addEventListener('click',function(){


    htmanage.classList.remove('htmanage');
    detailsPage.classList.remove('d-block');
   detailsPage.classList.add('d-none');
   
})


// function goTodetails(){
//     game.addEventListener('click',function(){
//         detailsPage.classList.remove('d-none');
//         detailsPage.classList.add('d-block');

        
//      })
     
// }


const Api_key='d0bcd82c04mshb7ad32a57d93b1bp172ed9jsn86dfe5fb3ecc';
var ctr="MMORPG";
var data=[];
var detailsData="";




for(let i=0;i<header.length;i++){
    header[i].addEventListener('click',function(e){
        // console.log(e.target.innerHTML);

        getGames(e.target.innerHTML)
    })

}


getGames("MMORPG");
async function getGames(category){

    
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd0bcd82c04mshb7ad32a57d93b1bp172ed9jsn86dfe5fb3ecc',
		
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    data=result;
	await DisplayGames();
    console.log(result)
  
} catch (error) {
	console.log(error);
}

    // console.log(category);


}

function DisplayGames(){

    let game=''
    for(let i=0;i<data.length;i++){


        game+=` <div class="col-md-3 col-xs-6 mb-2" onclick="getDetails(${data[i].id})">
        <div class="game" >
            <div class="card" ">
               
                <ul class="list-group">
                <img src="${data[i].thumbnail}" class="list-group-item" alt="...">
                  
                </ul>
                <div class="card-body">
                  <h5 class="card-title">${data[i].title}</h5>
                  <p class="card-text">${data[i].short_description}</p>
                </div>
                
                <div class="list-group ">
                <li class="list-group-item p-0 d-flex justify-content-between"> <a href="#" >${data[i].genre}</a>
                  <a href="#" class="card-link">${data[i].platform}</a></li>
                </div>
              </div>
        </div>
    </div>`

    rowdata.innerHTML=game;
        
    }
}


async function getDetails(id){

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
       
        headers: {
            'X-RapidAPI-Key': 'd0bcd82c04mshb7ad32a57d93b1bp172ed9jsn86dfe5fb3ecc',
           
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        detailsData=result;
        displayDetails();
        console.log(detailsData);
    } catch (error) {
        console.log(error);
    }

}


function displayDetails(){

    htmanage.classList.add('htmanage')
    detailsPage.classList.remove('d-none');

    detailsPage.classList.add('d-block');


console.log(detailsData.title);
// for(let i=0;i<detailsData.length;i++){


    detailsgame.innerHTML=`
    <div class="col-sm-2">
    <img src="${detailsData.thumbnail}" alt="game details">
  </div>
  <div class="col-sm-12 col-md-9 ps-0 ms-5">
  <ul class="ps-0">
    <li>
    <span class="fw-bold" > Title </span>: <span class="bg-info  rounded-3" style="padding: 0 5px;">${detailsData.title}</span></li>
    <li class="ps-0 ">
   <span class="fw-bold"> Category: </span><span class="bg-info  rounded-3" style="padding: 0 5px;">${detailsData.genre}</span>
     </li>

     <li>
     <span class="fw-bold">Platform</span> <span class="bg-info  rounded-3" style="padding: 0 5px;">${detailsData.platform}</span>
    </li>

    <li>
    <span class="fw-bold">Status</span> : <span class="bg-info rounded-3" style="padding: 0 5px;">  ${detailsData.status}</span>
    </li>
    <li>
      Description: <span >${detailsData.description}</span>
    </li>
  </ul>

  <a href="${detailsData.game_url}"  class="btn btn-outline-warning">more Details</a>
  </div>  
    `




   
}

// detailsgame=detailscontnt;

// }











