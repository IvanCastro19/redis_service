---
title: 'Redis Service'
disqus: hackmd
---

# Servicio de colas con redis
###### tags: `microservices` `redis` `queue` `Ivan`,`colas`

## Documentación Extra
- [Redis](https://redis.io/)
- [npm](https://docs.npmjs.com/)
- [Typescript](https://www.typescriptlang.org/)

## Descripción del servicio
Para que las peticiones entre servicios sea más eficiente, utilizaremos el almacenamiento de datos en RAM que redis ofrece como cola de peticiones, donde entrarán y serán direccionadas al servicio pertinete. 
Por ahora, este servicio solo será el intermediario entre nuestro Webhook y el chatbot.

### Ruta
    v1/store_message
### Entrada
    v1/webhook -- webhook
### Salida
    /bot -- chatbot 

## Casos de uso

### Almacenar mensaje

```gherkin=
  Scenario: Agregar mensaje a la cola
    When Entra el objeto tipo mensaje al servicio
    Then se agrega a la base de datos de redis. 
    La lista de mensajes comienza con el más viejo al más reciente   
```
#### Flujo
```sequence
    Webhook->redis_service: { mensaje: 'Hola!', wa_id: '44912345678' }
    Note right of redis_service: Almacena el mensaje
    redis_service->redisDB: { mensaje: 'Hola!', wa_id: '44912345678' }
    redis_service-->Webhook: { status: ok }
    
```

### Extraer mensaje

```gherkin=
  Scenario: Envíar mensaje al bot
    When Despues de almacenar el mensaje, 
    este se despacha directo al chatbot, espera la respuesta del mensaje enviado y, 
    al recibirla, envía otro mensaje.
```
#### Flujo
```sequence
    redis_service->redisDB: {method: GET message}
    redisDB-->redis_service: { mensaje: 'Hola!', wa_id: '44912345678' }
    redis_service->bot: { mensaje: 'Hola!', wa_id: '44912345678' }
    bot--redis_service: { status: 200 }
    Note right of redis_service: Volvemos al inicio
    redis_service->redisDB: {method: GET message}
    redisDB-->redis_service: { mensaje: 'Hola de nuevo!', wa_id: '44912345679' }
    redis_service->bot: { mensaje: 'Hola de nuevo!', wa_id: '44912345679' }
    
```

### Bot retorna error al servicio de redis

```gherkin=
  Scenario: Mensaje de error en el servicio "bot"
    When El bot retorna un estatus de error al servicio de redis, este, 
    deja un tiempo de espera para asegurar que el servicio "bot" 
    vuelva a estar en linea en caso de un parón
```
#### Flujo
```sequence
    redis_service->bot: { mensaje: 'Hola!', wa_id: '44912345678' }
    bot-->redis_service: {status: error}
    Note right of redis_service: Tiempo de espera...
    redis_service->bot: { mensaje: 'Hola!', wa_id: '44912345678' }
    bot-->redis_service: {status: 200}
    Note right of redis_service: Siguiente mensaje
    redis_service->bot: { mensaje: 'Hola, de nuevo!', wa_id: '44912345678' }
```

## Comandos
### Instalación de dependencias
- Para instalar todas las dependencias.

        npm install || npm i
    
- Si se quiere excluir las dependencias de desarrollo (como Typescript o librerías para testing).
    
        npm install --omit=dev || npm i --omit=dev
    
### Iniciar el servidor
Se ha de recalcar que el desarrollo del proyecto fue con **Typescript**, por ende, para su inicialización y respectivo hosting, es completamente relevante su traducción a JavaScript, los siguientes comandos ya realizan esta acción.

- Para inciar el servidor en modo de desarrollo.

        npm run dev

- Para iniciar el servidor en modo de produccion.

        npm start
    
- Para solo realizar la traducción del código a JS.

        npm run build
        
### Docker
#### script para construir el contenendor
````
docker build -t auth .
````

shell
````
sh compile.sh
````


#### script para correr el contenedor
```
docker run \
    --name redis_queue \
    --net cwvl \
    -p 0.0.0.0:3000:3000 \
    -v ${APP_PATH} \
    auth \
    -e REDIS_URL={redis url}
```
#### para correr el script en shell

```
sh run.sh
```