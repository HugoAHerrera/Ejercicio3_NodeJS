const http = require('http');
const fs = require('fs');
const url = require('url');

function cargarDiccionario() {
    const data = fs.readFileSync('diccionario.txt', 'utf8');
    return data.split('\n').filter(Boolean);
}

function generarContrasena(diccionario, numPalabras) {
    let contrasena = [];
    for (let i = 0; i < numPalabras; i++) {
        const palabraAleatoria = diccionario[Math.floor(Math.random() * diccionario.length)];
        contrasena.push(palabraAleatoria);
    }
    return contrasena.join('');
}

const diccionario = cargarDiccionario();

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    const numPalabras = parseInt(queryObject.numPalabras);

    if (isNaN(numPalabras) || numPalabras <= 0) {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Escribe un número positivo y mayor a 0");
        return;
    }

    const contrasenaAleatoria = generarContrasena(diccionario, numPalabras);

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Contraseña generada: ${contrasenaAleatoria}`);
});

server.listen(3000, () => {
    console.log("Prueba: http://localhost:3000/?numPalabras=5");
});
