

/* --------------------FUNCIONES ASINCRONAS */
/* con los parentesis se autoejecuta */
(async function load(){
  async function getData(url){
    const response=await fetch(url)
    const data= await response.json()
    if(data.data.movie_count>0){
      return data
    }
    throw new Error('no se encontro ninguna resultado')
  }
  
  /* se pone el $ antes por convencion  */
  /* aqui hayqueponer el # */
  const $actionContainer=document.querySelector('#action')
  /* aca no hay queponer el # */
  const $dramaContainer=document.getElementById('drama')
  const $animationContainer=document.querySelector('#animation')
  
  const $featuringContainer=document.querySelector('#featuring')
  const $form=document.getElementById('form')
  const $home=document.querySelector('#home')
  
  const $modal=document.getElementById('modal')
  const $overlay=document.getElementById('overlay')
  const $hideModal=document.getElementById('hide-modal')
  
  const $modalTittle= $modal.querySelector('h1')
  const $modalImage= $modal.querySelector('img')
  const $modalDescription= $modal.querySelector('p')
  
  function setAttributes($element,attributes){
    for( let attribute in attributes){
      $element.setAttribute(attribute,attributes[attribute])
    }

  }

  function featuringTemplate(peli){
    return(
      `<div class="featuring">
      <div class="featuring-image">
        <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
      </div>
    </div>`
    )
  }

  async function cacheExist(category){
    const listName=`${category}List`
    const cacheList= window.localStorage.getItem(listName)
    if(cacheList){
      return JSON.parse(cacheList)
    }
    const {data:{movies:d}}= await getData(`https://yts.mx/api/v2/list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName,JSON.stringify(d) )
    return d
  }
  const actionList= await cacheExist('action')
  rendeMovieList(actionList,$actionContainer,'action')
  const dramaList= await cacheExist('drama')
  rendeMovieList(dramaList,$dramaContainer,'drama')
  const animationList= await cacheExist('animation')
  rendeMovieList(animationList,$animationContainer,'animation')

  $form.addEventListener('submit', async(event)=>{
    /* para evitar que se reinicie la pantalla  */
    event.preventDefault()
    /* agregar css */
    /*agrega una clase  */
    $home.classList.add('search-active')

    const $loader=document.createElement('img')
    setAttributes($loader,{
      src: './src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)
/* obtiene el valor del campo, en este caso el campo con name='search' */
    const data =new FormData($form);

    try{
      /* desestructuracion del objeto, obtengo el atributo data y dentro de ese mismo obtengo el atributo movies
      y le doy un nombre llamado pelis */
      const {
        data:{
          movies:pelis}}= await getData(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('search')}`)
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML=HTMLString
    }catch(error){
      alert(error.message)
      $loader.remove()
      $home.classList.remove('search-active')
    }
  })



  
  function  videoItemTemplate(movie,category){
    return(
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
      <div class="primaryPlaylistItem-image">
      <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
      ${movie.title}
      </h4>
      </div>
      `
      )
    }
    
    
    
    
    function createTemplate(HTMLString){
      /* crea un documento html*/
      const html =document.implementation.createHTMLDocument()
      html.body.innerHTML=HTMLString
      return html.body.children[0]
    }
    
    
    
    function addEventClick($element){
      $element.addEventListener('click', ()=> {
        showModal($element)
      })
    }
    
    function findById(list,id){
      return list.find((movie)=> movie.id==parseInt(id,10))
    }
    
    
    function findMovie(id,category){
      switch(category){
        case 'action':{
          const data= findById(actionList,id)
          return data
        }
        case 'drama':{
          return findById(dramaList,id)
          
        }
        default:{
          return findById(animationList,id)
          
        }
      }
    }
    
    function showModal($element){
      $overlay.classList.add('active')
      $modal.style.animation='modalIn .8s forwards'
      const id=$element.dataset.id
      const category=$element.dataset.category
      const data2=findMovie(id,category)
      
      $modalTittle.textContent=data2.title
      $modalImage.setAttribute('src',data2.medium_cover_image)
      $modalDescription.textContent=data2.description_full
    }
    
    
    
    $hideModal.addEventListener('click',hideModal)
    
    function hideModal(){
      $overlay.classList.remove('active')
      $modal.style.animation='modalOut .8s forwards'  
    }
    
    
    
    function rendeMovieList(list,$container,category){
      /* -------------TEMPLATE */
      $container.children[0].remove();
      
      list.forEach(
        (movie)=>{
          const HTMLString=videoItemTemplate(movie,category);
          const movieElement= createTemplate(HTMLString)
          $container.append(movieElement)
          const image=movieElement.querySelector('img')
          image.addEventListener('load',()=>{
            image.classList.add('fadeIn')
          })
          addEventClick(movieElement)
        }
        )
      }
      
      
      
      
      
      
    })()
    
    
    
    