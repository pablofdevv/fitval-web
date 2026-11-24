# Respuestas a las preguntas de la entrega

## Ejercicio 0 (Parte 0)

### Pregunta 1
*¿Qué ves? Borra mentalmente el `_redirects`: ¿qué verías y por qué?*

**Respuesta:** Con el archivo `_redirects`, al recargar en cualquier ruta (como `/lo-que-sea`) Netlify redirige la petición interna con código 200 hacia `/index.html`, cargando la SPA de React para que el enrutador del cliente maneje la ruta (mostrando la página 404 personalizada de la app). Sin el archivo `_redirects`, el servidor web de Netlify buscaría un archivo físico llamado `/lo-que-sea` o `/lo-que-sea/index.html` en el sistema de archivos del hosting; al no existir, devolvería la página de error 404 genérica de Netlify antes de que React llegue a ejecutarse.

## Parte 1 (Planes)

### Pregunta 2 (Limpieza de efectos en Loading)
*¿Qué pasaría si no devolvieras la limpieza y el usuario cambiara de página antes de los 5 segundos?*

**Respuesta:** Si no devolvemos `clearTimeout(timer)` en la función de limpieza de `useEffect`, el temporizador seguiría activo en el navegador. Al cumplirse los 5 segundos, intentaría actualizar el estado `setSlow(true)` de un componente que ya ha sido desmontado del árbol de React, provocando fugas de memoria y posibles advertencias o errores en la consola.

### Ejercicio 1.1 (API apagada)
Al apagar `json-server` y recargar la página, `fetch` falla por error de red y se captura en el `.catch()`, mostrando el mensaje de error en rojo: *"No se han podido cargar los planes."*.

### Ejercicio 1.2 (Ruta errónea `/plan`)
Al cambiar la ruta a `/plan`, la API responde con un código de estado `404 Not Found` en la pestaña Red, activando la comprobación `!response.ok` y mostrando el mensaje de error en rojo en la interfaz.
