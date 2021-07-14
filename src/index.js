/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

//*console.log('Happy hacking :)----')//

const baseUrl = "https://platzi-avo.vercel.app";
//const url = "https://platzi-avo.vercel.app/api/avo"; --fue eliminada para anadir las img
const appNode = document.querySelector("#app");

//Delegacion de eventos se agrega a al raiz de la aplicacion 
appNode.addEventListener("click", (event) => {
    if (event.target.nodeName === "H2") {
        window.alert ("Hola");
    }   
});

//API Intl se utiliza para dar formato de fechas y monedas
 const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat ("en-EN", {
         style: "currency",
         currency: "USD",
     }).format(price)

     return newPrice;
 };

//web api,  cuando se trabaja con fetch es para llamr la informacion y ademas se requiere de unos los siguientes procesos
//1. conectar al server
// estamos usanso promise pero para mejorarlo podria con async/await
window
.fetch(`${baseUrl}/api/avo`)
// 2. procesar la respuesta y convertirla en JSON
.then ((respuesta) => respuesta.json())
// 3. JSON -> renderizar la informacion en el browser
.then((responseJson) => {
    const todosLosItems = [];
    responseJson.data.forEach( (item) => {
       
        

        //cuando este dentro de la promesa de cada uno de lo  item creo cada nodo que son imagenes, titulo y precio
        //crear imagen
        const imagen = document.createElement("img"); 
        imagen.className ="p-2.5 rounded-full shadow-2xl border-solid border-4 border-green-200  pointer-events-auto w-40 ";
        // agregar informacion  url de la imagen
        imagen.src = `${baseUrl}${item.image}`;
       
        
       
        //crear title
        const title = document.createElement("h2");
        title.className = "justify-center text-sm text-green-700  font-semibold m-2 w-36 p-1.5";
        // agregar informacion 
        title.textContent = item.name;
        
        //title.style = "font-size: 2rem"; //en forma de cadena de texto
        //title.style.fontSize = "3rem";// forma de objeto 
        //otra forma para style es con clases que va alidao con el css index
        //title.className ="muy-grande";

        // clase traida desde tailwindcss.com
        //title.className ="text-2xl text-green-700";
        

        
        //crear precio
        const price = document.createElement("div");
        //document.body.appendChild(price); <= asi se agregan los elemntos al body abajo lo agregaremso dentra de un div para optimizar 
        // agregar informacion
        price.className = "flex-auto text-green-500 text-base text-right pointer-events-auto font-medium  text-center md:text-cente p-1.5"; 
        price.textContent = formatPrice(item.price);
         
        //solo en div
        const container = document.createElement ('div')
        container.className ="grid inline-grid  divide-y divide-green-400  rounded p-5 bg-green-50 m-4 shadow-2xl ring ring-red-100 ring-offset-4 h-72";
        container.append(imagen, title, price);

        todosLosItems.push(container);
        
    });
    appNode.append(...todosLosItems);
});
