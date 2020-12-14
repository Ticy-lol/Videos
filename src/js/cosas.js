console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}


/* PROMESAS */
const getUserAll=new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve('Todo bien en la vida All');
  }, 5000);

})
const getUser=new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve('Todo bien en la vida');
  }, 3000);

})



/* getUser
.then(()=>console.log('Todo bien en la vida'))
.catch(()=>console.log('Todo mal en la vida'))
 */

Promise.all([getUser,getUserAll])
.then((message)=>console.log(message))
.catch(()=>console.log('Todo mal en la vida'))


/* ----------------------API */

/* -------------USANDO AJAX */
$.ajax('https://randomuser.me/api',{
  method: 'GET',
  success: function (data){
    console.log(data)
  },
  error: function(error){
    console.log(error)
  }
})

/* USANDO JS PURO(VAINILLA) */
fetch('https://randomuser.me/api')
.then(function(response){
  return response.json()
})
.then(function(data){
  console.log('user',data.results[0].name.first)
})
.catch(function(error){
  console.log('Hubo un error',error)
});


/* --------------------FUNCIONES ASINCRONAS */
/* con los parentesis se autoejecuta */
(async function load(){
  async function getData(url){
    const response=await fetch(url)
    const data= await response.json()
    return data
  }
  const actionList= await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const animationList= await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList= await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  /*  let terrorList;
   usando promesas 
  getData('https://yts.mx/api/v2/list_movies.json?genre=terror')
  .then(function(data){
    console.log('terrorlist',data);
    terrorList=data
  }) */
  console.log(actionList,animationList,dramaList)
})()

document.get
/* -----------------------SELECTORES */

/* usando jquery */

const $home = $(".home") //Elemento con la clase home
const $home = $("#home") //Elemento con el id home

/* usando js */

//Retorna un elemento con el id home
document.getElementById("home")

//Retorna una lista de elementos con la clase home
document.getElementsByClassname("home")

//Retorna una lista de elementos con el tag div
document.getElementsByTagName("div")

//Devuelve el primer elemento que coincida con el query de búsqueda.
document.querySelector("div .home #modal")

//Devuelve todos los elementos que coincidan con el query de búsqueda.
document.querySelectorAll("div .home #modal")




