# Respuestas a las preguntas de la entrega

## Ejercicio 0 (Parte 0)

### Pregunta 1
*¿Qué ves? Borra mentalmente el `_redirects`: ¿qué verías y por qué?*

**Respuesta:** Con el archivo `_redirects`, al recargar en cualquier ruta (como `/lo-que-sea`) Netlify redirige la petición interna con código 200 hacia `/index.html`, cargando la SPA de React para que el enrutador del cliente maneje la ruta (mostrando la página 404 personalizada de la app). Sin el archivo `_redirects`, el servidor web de Netlify buscaría un archivo físico llamado `/lo-que-sea` o `/lo-que-sea/index.html` en el sistema de archivos del hosting; al no existir, devolvería la página de error 404 genérica de Netlify antes de que React llegue a ejecutarse.
