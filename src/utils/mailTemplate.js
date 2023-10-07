
export default function generateEmailContent(productRows, purchaser, amount) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
        font-family: Arial, sans-serif;
        }
        h1 {
        color: #333;
        }
        table {
        border-collapse: collapse;
        width: 100%;
        }
        th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        </style>
        </head>
        <body>
            <h1>Tu orden ha sido generada</h1>
            <table>
                <tr>
                    <th>Código del producto</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                </tr>
                ${productRows} <!-- Aquí se insertarán las filas de productos -->
            </table>
            <p>Comprador: ${purchaser}</p>
            <p>Total de la Compra: $${amount}</p>
        </body>
        </html>
    `;
}
