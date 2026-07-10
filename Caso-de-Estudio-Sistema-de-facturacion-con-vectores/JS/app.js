// Vectores separados
let descripciones = []
let cantidades = []
let precios = []
let totales = []

// Vector de códigos de los productos
let codigos = []

 // Vector listado de productos.
        // productos [ [producto1], [producto2], [producto3], ..N ]
        const productos = [
            //cod  , precio , descripcion
            //[0]    [1]   [2]
            ["0001", 3500, "Sistema Web Personalizado"],
            ["0002", 500, "Computador Core I7"],
            ["0003", 200, "Monitor LG 20 pulgadas"],
            ["0004", 300, "Telefono Celular Samsung"],
            ["0005", 200, "Camara profesional Web."],
            ["0006", 150, "Servicio de Mantenimiento Anual"],
            ["0007", 100, "Servicio de Hosting Web (1 año)"],
            ["0008", 250, "Licencia Software Antivirus (1 año)"],
            ["0009", 400, "Impresora Multifuncional HP"],
            ["0010", 120, "Router Inalámbrico TP-Link"],
            ["0011", 180, "Teclado Mecánico RGB"],
            ["0012", 90, "Mouse Óptico USB"],
            ["0013", 75, "Audífonos con Micrófono"],
            ["0014", 60, "Disco Duro Externo 1TB"],
            ["0015", 45, "Memoria USB 64GB"],
            ["0016", 250, "Tablet Android 10 pulgadas"],
            ["0017", 300, "Smartwatch Deportivo"],
            ["0018", 400, "Proyector Multimedia HD"],
            ["0019", 150, "Cámara de Seguridad IP"],
            ["0020", 80, "Soporte para Laptop Ajustable"]
        ]

        // Referencias a los controles del formulario (Select, Input, Button, Table etc.)
        const selectProducto = document.getElementById('id-select-producto')
        const txtCantidad = document.getElementById('id-txt-cantidad')
        const txtPrecio = document.getElementById('id-txt-precio')
        const txtTotal = document.getElementById('id-txt-total')
        const btnAgregar = document.getElementById('id-btn-agregar')
        const tablaDetalle = document.querySelector('#id-table-detalle tbody')

        // Referencias a las cajas de texto de totales
        const txtSubtotal = document.getElementById('id-txt-subtotal')
        const txtIva = document.getElementById('id-txt-iva')
        const txtDescuento = document.getElementById('id-txt-descuento')
        const txtTotalPagar = document.getElementById('id-txt-total-pagar')


// Agrega automáticamente todos los productos al elemento <select>
for (let i = 0; i < productos.length; i++) {
  selectProducto.innerHTML += "<option value='" + productos[i][0] + "'>" + productos[i][2] + "</option>"
}

// Cuando el usuario selecciona un producto,
// se muestra su precio y el total según la cantidad.
selectProducto.addEventListener("change", function() {
  let codigo = selectProducto.value
  for (let i = 0; i < productos.length; i++) {
    if (productos[i][0] === codigo) {
      txtPrecio.value = "$" + productos[i][1].toFixed(2)
      txtTotal.value = "$" + (productos[i][1] * parseInt(txtCantidad.value)).toFixed(2)
    }
  }
})

// EVENTO: ACTUALIZAR TOTAL POR CANTIDAD
// Recalcula el total cuando cambia la cantidad del producto.
txtCantidad.addEventListener("input", function () {
    if (selectProducto.value === "") {
        txtPrecio.value = "$0.00"
        txtTotal.value = "$0.00"
        return
    }
    let codigo = selectProducto.value
    for (let i = 0; i < productos.length; i++) {
        if (productos[i][0] === codigo) {
            txtTotal.value = "$" + (productos[i][1] * parseInt(txtCantidad.value)).toFixed(2)
        }
    }
})

// Agrega un producto a la factura.
// Si el producto ya existe, únicamente aumenta la cantidad.
btnAgregar.addEventListener("click", function(event) {
    event.preventDefault()
  let codigo = selectProducto.value
  let cantidad = parseInt(txtCantidad.value)

  if (codigo === "" || cantidad < 1) {
    alert("Debe seleccionar un producto y una cantidad válida.")
    return
  }

  for (let i = 0; i < productos.length; i++) {
    if (productos[i][0] === codigo) {
      let descripcion = productos[i][2]
      let precio = productos[i][1]
      let pos = descripciones.indexOf(descripcion)

      if (pos !== -1) {
        cantidades[pos] = cantidades[pos] + cantidad
        totales[pos] = cantidades[pos] * precios[pos]
      } else {
        codigos.push(codigo)
        descripciones.push(descripcion)
        cantidades.push(cantidad)
        precios.push(precio)
        totales.push(cantidad * precio)
      }
    }
  }

  mostrarTabla()
  calcularTotales()

  // Limpiar controles para un nuevo registro
selectProducto.value = ""
txtCantidad.value = 1
txtPrecio.value = "$0.00"
txtTotal.value = "$0.00"
})

// FUNCIÓN: MOSTRAR EL DETALLE DE LA FACTURA
// Construye dinámicamente la tabla con los productos agregados.
function mostrarTabla() {
  let texto = ""
  if (descripciones.length === 0) {
    texto = "<tr><td colspan='6' style='text-align:center;'>No hay productos en la factura</td></tr>"
  } else {
    for (let i = 0; i < descripciones.length; i++) {
      texto += "<tr>"
      texto += "<td>" + codigos[i] + "</td>"
      texto += "<td>" + descripciones[i] + "</td>"
      texto += "<td>$" + precios[i].toFixed(2) + "</td>"
      texto += "<td>" + cantidades[i] + "</td>"
      texto += "<td>$" + totales[i].toFixed(2) + "</td>"
      texto += "<td><button class='btn-remove' onclick='eliminarProducto(" + i + ")'>✕</button></td>"
      texto += "</tr>"
    }
  }
  tablaDetalle.innerHTML = texto
}


// FUNCIÓN: ELIMINAR PRODUCTOS
// Elimina un producto de la factura y actualiza la tabla.
function eliminarProducto(i) {
  let nuevasDescripciones = []
  let nuevasCantidades = []
  let nuevasPrecios = []
  let nuevasTotales = []

  let nuevosCodigos = []

  for (let j = 0; j < descripciones.length; j++) {
    if (j !== i) {
      nuevosCodigos.push(codigos[j])
      nuevasDescripciones.push(descripciones[j])
      nuevasCantidades.push(cantidades[j])
      nuevasPrecios.push(precios[j])
      nuevasTotales.push(totales[j])
    }
  }

  codigos = nuevosCodigos
  descripciones = nuevasDescripciones
  cantidades = nuevasCantidades
  precios = nuevasPrecios
  totales = nuevasTotales

  mostrarTabla()
  calcularTotales()
}


// FUNCIÓN: CALCULAR LOS TOTALES
// Calcula el subtotal, IVA, descuento y total a pagar.
function calcularTotales() {
  let subtotal = 0
  for (let i = 0; i < totales.length; i++) {
    subtotal = subtotal + totales[i]
  }

  let iva = subtotal * 0.15
  let descuento = 150
  let total = subtotal + iva - descuento

  txtSubtotal.textContent = "$" + subtotal.toFixed(2)
  txtIva.textContent = "$" + iva.toFixed(2)
  txtDescuento.textContent = "$" + descuento.toFixed(2)
  txtTotalPagar.textContent = "$" + total.toFixed(2)
}
