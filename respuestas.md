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

## Parte 2 (Rutas y horario)

### Pregunta 3 (Ejercicio 2.1: Buscador en la URL)
*¿Qué pasa con el texto del buscador al recargar y al ir atrás? ¿Pasaría lo mismo si `activity` fuera un `useState`?*

**Respuesta:** Al estar guardado en la URL con `useSearchParams`, el texto del buscador se mantiene intacto al recargar la página y responde al historial del navegador (al pulsar el botón Atrás o Adelante, el valor del buscador cambia automáticamente según el query param de la URL). Si fuera un `useState` local simple, al recargar se resetearía al valor inicial vacío y no se sincronizaría con la navegación del historial del navegador.

### Pregunta 4 (Ejercicio 2.2: Caché de RTK Query)
*¿Cuántas peticiones salen la segunda vez? ¿Por qué?*

**Respuesta:** La segunda vez se realizan 0 peticiones de red. RTK Query almacena automáticamente en su memoria caché las respuestas asociadas a cada clave de consulta (`/classes?activity:contains=...`). Al volver a escribir las mismas letras, RTK Query detecta que ya dispone de los datos en caché y los devuelve inmediatamente sin realizar nuevas llamadas HTTP.


## Parte 3 (Login, registro y sesión)

### Pregunta 5 (Ejercicio 3.1: Sesión en localStorage)
*¿Sigues dentro después de recargar? ¿Qué hay guardado en `localStorage`? ¿Por qué ese token no le serviría a una API de verdad?*

**Respuesta:**
- Sí, seguimos dentro tras recargar la página. El store de Redux se inicializa leyendo el token guardado en `localStorage` (`preloadedState: { auth: { token: localStorage.getItem("token") } }`), y el hook `useCurrentUser` lo toma para consultar quién es el usuario (`getMe`), reconstruyendo el estado del usuario en memoria.
- En `localStorage` solo se guarda la clave `token` con el valor `token-fake-2`. No se guarda nada del usuario (ni correo, ni nombre, ni rol ni contraseña).
- Ese token no le serviría a una API de verdad porque es solo una cadena arbitraria generada en el cliente (`token-fake-2`), sin firma criptográfica, sin tiempo de expiración y sin validación del servidor. En una API real se utiliza un JWT (JSON Web Token) o una cookie HttpOnly firmado con una clave secreta del backend; si el servidor aceptara un string plano inventado por el navegador, cualquiera podría falsificar `token-fake-1` y vulnerar la seguridad haciéndose pasar por administrador u otro usuario.
