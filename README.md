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
- [Docker](https://docs.docker.com/)
## Descripción del servicio
Para que las peticiones entre servicios sea más eficiente, utilizaremos el almacenamiento de datos en RAM que redis ofrece como cola de peticiones, donde entrarán y serán direccionadas al servicio pertinete. 
Por ahora, este servicio solo será el intermediario entre nuestro Webhook y el chatbot.

## Datos relevantes
Para la correcta ejecución del proyecto, es necesario tener un almacenamiento de redis ya preconfigurado y editar las variables de entorno con la url de acceso al servicio anteriomente mencionado. Para poder realizar pruebas, será necesario ejecutar un entorno temporal de redis donde las peticiones se almacenen.

## Instrucciones para crear una base de datos en redis
### Docker
Si cuentas con docker instalado, solo ejecuta el siguiente comando:
        docker run --name some-redis -d redis
### Windows
Por ahora, no hay una versión oficial de redis para windows, sin embargo, es posible instalarlo gracias a [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux).

Una vez cuentes con WSL2, ingresa en la terminal Ubuntu y agrega el repositorio de redis al apt, entonces, realiza la instalación
        curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
        echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

        sudo apt-get update
        sudo apt-get install redis

Al terminar, iniciar el servicio
        sudo service redis-server start

### macOS
Para instalar redis en macOS, utilizaremos [Homebrew](https://brew.sh/), por ende, es necesario que esté ya este instalado en la maquina.

Ahora procedemos a la instalación de redis, para ello, ejecuta el comando:
        brew install redis
Procedemos a iniciar el servicio:
        brew services start redis
### Ruta
    v1/store_message
### Entrada
    v1/webhook -- webhook
### Salida
    /bot -- chatbot 

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