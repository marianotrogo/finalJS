class producto{
    constructor(id, nombre,precio,img){
        this.id=id,
        this.nombre=nombre,
        this.precio=precio,
        this.img=img,
        this.cantidad=1;
    }
}

const fifa13=new producto(1,"Fifa 13",5,"../img/fifa13.jpg");
const fifa14=new producto(2,"Fifa 14",8,"../img/fifa14.jpg");
const fifa15=new producto(3,"Fifa 15",10,"../img/fifa15.jpg");
const fifa16=new producto(4,"Fifa 16",15,"../img/fifa16.jpg");
const fifa19=new producto(5,"Fifa 19",18,"../img/fifa19.jpg");
const fifa20=new producto(6,"Fifa 20",21,"../img/fifa20.jpg");

const productos=[fifa13, fifa14, fifa15, fifa16,fifa19,fifa20];

let carrito = [];

/**cargar carrito desde el localstorage: */
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    
}

const contenedorProductos=document.getElementById("contenedorProductos");

const mostrarProductos=()=>{
    productos.forEach((producto)=>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.img}>
                <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Usd $ ${producto.precio}</p>
                <button class="btn colorBoton" id="boton${producto.id}">Agregar al carrito</button>
                </div>
            </div>     
        `
        contenedorProductos.appendChild(card);

        //agregar prodcutos al carrito
        const boton= document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", ()=>{
            Toastify({
                text: "Agregado al Carrito",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #ff0000, #785252)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
            agregarAlCarrito(producto.id)
        })
    })
}
//funcion agregar al carrito:
const agregarAlCarrito = (id) =>{
    const producto=productos.find((producto)=> producto.id===id);
    const productoEnCarrito = carrito.find((producto)=>producto.id===id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        carrito.push(producto);
        localStorage.setItem("carrito",JSON.stringify(carrito));
        
    }
    calcularTotal();
}

mostrarProductos();

//mostrar el carrito
const contenedorCarrito=document.getElementById("contenedorCarrito");
const verCarrito=document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=>{
    mostrarCarrito();
})

//funcion para mostrar el carrito

const mostrarCarrito=()=>{
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto)=>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.img}>
                <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Usd $${producto.precio}</p>
                <p class="card-text">${producto.cantidad}</p>
                <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar Producto</button>
                </div>
            </div>     
        `
        contenedorCarrito.appendChild(card);

        //eliminar productos del caarrito
        const boton=document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click",()=>{
            Swal.fire({
                title: 'Deseas eliminar este producto?',
                text: "Realmente estas seguro?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado',
                    'El producto fue eliminado satisfactoriamente',
                    'success'
                  )
                }
              })
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//funcion que elimna el producto del carrito.

const eliminarDelCarrito=(id)=>{
    const producto=carrito.find((producto)=>producto.id===id);
    const indice=carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

//vaciamos todo el carrito de compras

const vaciarCarrito=document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click",()=>{
    //agrego sweet alert2 para eliminar producto
    Swal.fire({
        title: 'Deseas vaciar el carrito?',
        text: "No podras revertir el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El Carrito fue vaciado',
            'success'
          )
          eliminarTodoElCarrito();
        }
      })
      

    // eliminarTodoElCarrito();
})

//funcion para eliminar todo el carrito
const eliminarTodoElCarrito=()=>{
    carrito=[];
    mostrarCarrito();
    localStorage.clear();
}

const total= document.getElementById("total");
const calcularTotal =()=>{
    let totalCompra=0;
    carrito.forEach((producto)=>{
        totalCompra+=producto.precio*producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra +...
    })
    total.innerHTML=`Total: Usd $${totalCompra}`;
}

