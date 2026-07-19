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
        // Vector para guardar los detalles de la factura
        const facturaDetalles =[]

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

        cargarProductos()

        selectProducto.addEventListener("change", function(e){
            const precio = parseFloat(e.target.value)
            const cantidad = parseFloat(txtCantidad.value)
            const total = cantidad * precio

            //Formateamos los valores a 2 decimales
            txtPrecio.value = Number(precio).toFixed(2)
            txtTotal.value = Number(total).toFixed(2)
        })

        txtCantidad.addEventListener("change", function(e){
            const cantidad = parseFloat(e.target.value)
            const precio = parseFloat(txtPrecio.value)
            const total = cantidad * precio
            txtTotal.value = Number(total).toFixed(2)
        })

        btnAgregar.addEventListener("click", function(e){
            const codigo = selectProducto.options[selectProducto.selectedIndex].dataset.codigo
            const descripcion = selectProducto.options[selectProducto.selectedIndex].textContent

            if( !codigo ){
                alert("Seleccione un producto válido!")
                return
            }
            const cantidad = parseFloat(txtCantidad.value)
            const precio = parseFloat(txtPrecio.value)
            const total = parseFloat(txtTotal.value)

            const indice = existeProducto(codigo)
            if(indice != -1){
                //Actualizamos cantidad = cantidad + nueva cantidad
                facturaDetalles[indice][2] = facturaDetalles[indice][2] + cantidad
                //Actualizamos total = nueva cantidad * precio 
                facturaDetalles[indice][4] = facturaDetalles[indice][2] * precio
            }
            else {
                 const item = [
                codigo,
                descripcion,
                cantidad,
                precio,
                total
            ]
            facturaDetalles.push(item)
            }
           
            console.log(facturaDetalles)
        })

        function existeProducto(codigo){
            for(let i in facturaDetalles){
                const codigoDt = facturaDetalles[i][0]
                if (codigo == codigoDt){
                    return i
                }
            }
            return -1
        }

        function cargarProductos(){
            for (let i in productos){
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