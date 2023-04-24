![Podcaster by Gianluca Di Bella](podcaster_gianlucadibella.png)
# Mini Aplicación para Escuchar Podcasts Musicales

Este es un proyecto de prueba para crear una mini-aplicación que permite escuchar podcasts musicales. La aplicación consta de tres vistas: la vista principal, los detalles de un podcast y los detalles de un capítulo de un podcast.

## Cómo ejecutar el proyecto

Para ejecutar el proyecto, es necesario tener instalado [Node.js](https://nodejs.org) en tu computadora.

1. Descarga o clona el repositorio en tu computadora.
2. Abre una terminal en la carpeta del proyecto y ejecuta el comando `npm install` para instalar las dependencias necesarias.
3. Una vez que se hayan instalado las dependencias, ejecuta el comando `npm start` para iniciar el servidor local.
4. Abre un navegador web y visita `http://localhost:3000` para ver la aplicación en funcionamiento.

El proyecto también incluye la configuración del Webpack para un modo de desarrollo y producción. Para compilar y empaquetar los archivos CSS y JS generados para producción, ejecuta el comando `npm run build`.

## Posibles mejoras

Una posible mejora sería agregar un estado Redux y utilizar una arquitectura Flux para mejorar el manejo de los datos y la escalabilidad del proyecto. Sin embargo, para esta mini-aplicación, se utilizó un enfoque de HOC que permitió completar el desarrollo de manera sencilla y comprensible.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más información.
