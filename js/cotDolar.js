// Api Cotizacion dolar
const criptoYa= "https://criptoya.com/api/dolar";
const cotDolar= document.getElementById("cotDolar");
setInterval(()=>{
    fetch(criptoYa)
        .then(Response => Response.json())
        .then(({solidario})=>{
            cotDolar.innerHTML=`
            <div class="card text-center">
            <div class="card-header">
              
            </div>
            <div class="card-body">
              <h5 class="card-title">Cotizacion Dolar Actualizado</h5>
              <p class="card-text">Para obtener el importe a pagar Multiplicar el importe del producto por la cotizacion del Dolar en el momento.</p>
              <a href="#" class="btn btn-primary">Dolar Solidario: ${solidario}</a>
            </div>
            
          </div>
              
                
                `
        })
        .catch(error=>console.error(error))
},1000)
