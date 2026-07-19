// Vector listado de productos.
const productos = [
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

// Vector para guardar los detalles de la factura
const facturaDetalles = []

// Referencias a los controles del formulario
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

cargarProductos()

// Actualizar precio al seleccionar producto
selectProducto.addEventListener("change", function(e){
    const precio = parseFloat(e.target.value)
    const cantidad = parseFloat(txtCantidad.value) || 0
    const total = cantidad * precio

    txtPrecio.value = Number(precio).toFixed(2)
    txtTotal.value = Number(total).toFixed(2)
})

// Actualizar total al cambiar cantidad
 txtCantidad.addEventListener("change", function(e){
    const cantidad = parseFloat(e.target.value)
    const precio = parseFloat(txtPrecio.value)
    const total = cantidad * precio
    txtTotal.value = Number(total).toFixed(2)
})

// Agregar producto
btnAgregar.addEventListener("click", function(e){
    const codigo = selectProducto.options[selectProducto.selectedIndex].dataset.codigo
    const descripcion = selectProducto.options[selectProducto.selectedIndex].textContent

    if(!codigo){
        alert("Seleccione un producto válido!")
        return
    }
    const cantidad = parseFloat(txtCantidad.value)
    if(isNaN(cantidad) || cantidad < 1){
        alert("Ingrese una cantidad válida (mínimo 1)!")
        return
    }

    const precio = parseFloat(txtPrecio.value)
    const total = parseFloat(txtTotal.value)

    const indice = existeProducto(codigo)
    if(indice != -1){
        facturaDetalles[indice][2] += cantidad
        facturaDetalles[indice][4] = facturaDetalles[indice][2] * precio
    } else {
        const item = [codigo, descripcion, cantidad, precio, total]
        facturaDetalles.push(item)
    }

    mostrarTabla()
    calcularTotales()
})

// Verificar si producto ya existe
function existeProducto(codigo){
    for(let i in facturaDetalles){
        if(codigo == facturaDetalles[i][0]){
            return i
        }
    }
    return -1
}

// Mostrar productos en tabla
function mostrarTabla(){
    tablaDetalle.innerHTML = ""
    for(let i in facturaDetalles){
        const fila = document.createElement("tr")

        fila.innerHTML = `
    <td>${facturaDetalles[i][0]}</td>
    <td>${facturaDetalles[i][1]}</td>
    <td>${facturaDetalles[i][2]}</td>
    <td>${facturaDetalles[i][3].toFixed(2)}</td>
    <td>${facturaDetalles[i][4].toFixed(2)}</td>
    <td><button class="btn-remove" onclick="eliminarProducto(${i})">X</button></td>`
        tablaDetalle.appendChild(fila)
    }
}

// Eliminar producto
function eliminarProducto(indice){
    facturaDetalles.splice(indice, 1)
    mostrarTabla()
    calcularTotales()
}

// Calcular totales
function calcularTotales(){
    let subtotal = 0
    for(let i in facturaDetalles){
        subtotal += facturaDetalles[i][4]
    }
    const iva = subtotal * 0.15
    const descuento = 150.00
    const totalPagar = subtotal + iva - descuento
    txtSubtotal.textContent = `$${subtotal.toFixed(2)}`
    txtIva.textContent = `$${iva.toFixed(2)}`
    txtDescuento.textContent = `$${descuento.toFixed(2)}`
    txtTotalPagar.textContent = `$${totalPagar.toFixed(2)}`

}

// Cargar productos en select
function cargarProductos(){
    for(let i in productos){
        const codigo = productos[i][0]
        const precio = productos[i][1]
        const descripcion = productos[i][2]

        const option = document.createElement("option")
        option.value = precio
        option.dataset.codigo = codigo
        option.textContent = descripcion

        selectProducto.appendChild(option)
    }
}
