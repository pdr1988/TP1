//La idea del codigo fue usar dos vectores, uno llamado productos[] y otro productosCompra[]. productos[] es utlizada para cargar productos 
//ofrecidos a la venta
//productosCompra[] es usada para poner los productos que se agregan al carrito de compras junto con cantidades y precio
//cada vez que se compra o se borra del carrito un producto, se actualiza el arreglo productosCompra[] y se lo imprime en pantalla en su totalidad
//debajo de la tabla de productos (izquierda de la pantalla) se encuentra implementado un boton (verde) para finlizar compra
//dicho boton realiza las sumas de las cantidades totales de los productos comprados de productosCompra[] y lo muestro en un h2
//ubicado debajo de la tabla del carrito de compras

// IMPORTANTE! AL ABRIR HTML CON FIREFOX DEVELOPER, QUEDAN MUY DESALINEADAS LAS CELDAS DE LA TABLA DE CARRITO. NO SUCECIENDO LO MISMO AL HACERLO CON CHROME
//O MICROSOFT EDGE. AL DIA DE LA FECHA, NO ENCONTRE SOLUCION A ESTE INCONVENIENTE POR LO QUE RECOMIENDO ABRIRLO CON CUALQUIERA DE ESTOS ULTIMOS DOS

var productos = [
    {   id: 1,
        nombre: "harina",
        precioUnitario: 35,
        cantidad: 9
        
    },
    {   id: 2,
        nombre: "pan",
        precioUnitario: 25,
        cantidad: 120
        
    },
    {   id: 3,
        nombre: "papa",
        precioUnitario: 52,
        cantidad: 10
        
    },
    {   id: 4,
        nombre: "palta",
        precioUnitario: 55,
        cantidad: 23
        
    },
    {   id: 5,
        nombre: "fideos",
        precioUnitario: 85,
        cantidad: 58
        
    },
    {   id: 6,
        nombre: "aceite",
        precioUnitario: 350,
        cantidad: 85
        
    },
    {   id: 7,
        nombre: "sopa",
        precioUnitario: 86,
        cantidad: 12
        
    },
    {   id: 8,
        nombre: "mermelada",
        precioUnitario: 108,
        cantidad: 58
        
    },
    {   id: 9,
        nombre: "porotos",
        precioUnitario: 69,
        cantidad: 74
        
    },
    {   id: 10,
        nombre: "lentejas",
        precioUnitario: 85,
        cantidad: 14
        
    },
    {   id: 11,
        nombre: "mandarina",
        precioUnitario: 43,
        cantidad: 86
        
    },
    {   id: 12,
        nombre: "banana",
        precioUnitario: 79,
        cantidad: 111
        
    },
    {   id: 13,
        nombre: "leche de almendras",
        precioUnitario: 145,
        cantidad: 54
        
    },
    {   id: 14,
        nombre: "papel higienico",
        precioUnitario: 147,
        cantidad: 1025
        
    },
    {   id: 15,
        nombre: "lavandina",
        precioUnitario: 55,
        cantidad: 95
        
    },
    {   id: 16,
        nombre: "alcohol en gel",
        precioUnitario: 123,
        cantidad: 62
        
    },
    {   id: 17,
        nombre: "shampoo",
        precioUnitario: 400,
        cantidad: 41
        
    },
    {   id: 18,
        nombre: "arroz",
        precioUnitario: 66,
        cantidad: 100
        
    },
    {   id: 19,
        nombre: "harina",
        precioUnitario: 35,
        cantidad: 46
        
    },
    {   id: 20,
        nombre: "salsa de tomate",
        precioUnitario: 35,
        cantidad: 35
        
    },
];
// creo un arreglo para guardar productos comprados
 var productosCompra = []; 
//se recorre productos[] item por item y se la dibuja en la pagina
productos.forEach(element => {
    crearTabla(element);
});

//implemento funcion que escribe toda la tabla de produto[]en la pagina
function crearTabla(producto){
    //nombre
    var tdNombre = document.createElement ("td");
    var txtNombre = document.createTextNode (producto.nombre);
    tdNombre.appendChild(txtNombre);
    //precio unitario
    var tdPrecioUnitario = document.createElement("td");
    var txtPrecioUnitario = document.createTextNode(producto.precioUnitario);
    tdPrecioUnitario.appendChild(txtPrecioUnitario);
    //input
    var tdInput = document.createElement("td");
    var inputCantidad = document.createElement("input");
    inputCantidad.setAttribute("type", "text");
    tdInput.appendChild(inputCantidad);
    //button
    var tdbutton = document.createElement("td")
    var btnComprar = document.createElement("button");
    var txtComprar = document.createTextNode("Comprar");
    btnComprar.appendChild(txtComprar);
    btnComprar.addEventListener("click", agregarCarrito)
    btnComprar.setAttribute("id", producto.id)
    tdbutton.appendChild(btnComprar);
    //tr de tabla
    var trLista = document.createElement("tr");
    trLista.appendChild(tdNombre);
    trLista.appendChild(tdPrecioUnitario);
    trLista.appendChild(tdInput);
    trLista.appendChild(tdbutton);    
    var tbody = document.querySelector('tbody');
    tbody.appendChild(trLista);
}

//funcion para agregar producto a listado de compras en productoCompra[] cuando se hace click en comprar, si corresponde
function agregarCarrito(e){
//recupero valor de input
var input = e.target.parentNode.previousSibling.firstChild;
//si el input esta en blanco (se hizo click en boton comprar pero no se ingreso la cantidad)
    if (input.value == '')
    {
        alert('Ingrese cantidad a comprar!');
        return;
    }

//si se apretó de nuevo botón de compra en un producto ya seleccionado
var indAux = productosCompra.findIndex(elemento => elemento.id == e.target.id);
//console.log(indAux);
    if (indAux != -1) {
        alert("Producto ya seleccionado!");
        return; 
    }
        
var idItem = e.target.id;
//chequeo stock disponible
var stock = productos[idItem-1].cantidad - input.value;
    if (stock <0) {
        alert("Sin Stock!");
        console.log(stock);
        return;
        
    }
//en el caso de contar con stock, que el producto no esté repetido y que se haya agregado una cantidad en input:
//agrego productos a productosCompra[]
    agregarDatos(productos[idItem-1], input.value);
//con la estructura de datos anterior, llamo a funcion que dibuja tabla en pantalla
    dibujarTabla(productosCompra, e);

}

//funcion que agrega a productosCompra[] el elemento a comprar 
function agregarDatos(item,input) {
    var productoAux = {  
        id: "",
        nombre: "",
        precioUnitario: "",
        cantidad: "",
    }
    productoAux.id = item.id;
    productoAux.nombre = item.nombre;
    productoAux.precioUnitario = item.precioUnitario;
    productoAux.cantidad = input;
    productosCompra.push(productoAux);
    console.log(productoAux);
    console.log(productosCompra);
}

//funcion que dibuja toda una tabla siendo su elemento de referencia la estructura de datos productoCompra[]
function dibujarTabla (productosCompra, e){
    //primero borro tabla completa
    var bodyPadre = document.getElementById('cuerpoCompra');
    bodyPadre.innerHTML = "";
    //dibujo tabla completa con elementos de productoCompra[]
    productosCompra.forEach(item => {
    //nombre producto comprado
    var tdNombreCompra = document.createElement ("td");
    var txtNombreCompra = document.createTextNode (item.nombre);
    tdNombreCompra.appendChild(txtNombreCompra);
    //imprimo valor de Input
    var input = e.target.parentNode.previousSibling.firstChild;
    var tdInputCompra = document.createElement ("td");
    var txtInputCompra = document.createTextNode (item.cantidad);
    tdInputCompra.appendChild(txtInputCompra);
    //precio unitario producto comprado
    var tdprecioUnitarioCompra = document.createElement("td");
    var txtprecioUnitarioCompra = document.createTextNode(item.precioUnitario);
    tdprecioUnitarioCompra.appendChild(txtprecioUnitarioCompra);
    //precio total
    var tdprecioTotalItem = document.createElement("td");
    var txtprecioTotalItem = document.createTextNode(item.precioUnitario*item.cantidad);
    tdprecioTotalItem.appendChild(txtprecioTotalItem);
    //boton eliminar
    var tdBtnSupr = document.createElement("td")
    var btnSupr = document.createElement("button");
    var txtBtnSupr = document.createTextNode("Borrar");
    btnSupr.appendChild(txtBtnSupr);
    btnSupr.addEventListener("click", eliminarProducto)
    btnSupr.setAttribute("id", item.id)
    tdBtnSupr.appendChild(btnSupr);

    var trListaCompra = document.createElement("tr");
    trListaCompra.appendChild(tdNombreCompra);
    trListaCompra.appendChild(tdInputCompra);
    trListaCompra.appendChild(tdprecioUnitarioCompra);
    trListaCompra.appendChild(tdprecioTotalItem);
    trListaCompra.appendChild(tdBtnSupr);
        
    var tbody1 = document.getElementById('cuerpoCompra');
    tbody1.appendChild(trListaCompra);
    })
}

//funcion que elimina producto de productoCompra[]

function eliminarProducto (e){
    var indiceAux = productosCompra.findIndex(item => item.id == e.target.id);
    console.log(productosCompra);
    productosCompra.splice(indiceAux,1)
    console.log(indiceAux);
    console.log(productosCompra);
    dibujarTabla(productosCompra, e);
}

//funcion asociada a boton "finalizar compra" que realiza y muestra el precio total a pagar

function finCompra (){
    var finalizar = document.querySelector("h2")
    var sumaTotal = 0;
    productosCompra.forEach(element => {
    sumaTotal = element.precioUnitario*element.cantidad + sumaTotal;
    });
    finalizar.innerHTML = "TOTAL: $"+sumaTotal +'   <img src="../IMAGENES/apu.jpg" />'
    

}