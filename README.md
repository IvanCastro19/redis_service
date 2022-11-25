### script para construir el contenendor
````
docker build -t auth .
````

shell
````
sh compile.sh
````


### script para correr el contenedor
````
docker run \
    --name auth \
    --net cwvl \
    -p 0.0.0.0:3000:3000 \
    -v ${APP_PATH} \
    auth \
    -e MONGO_DB={mongodb name} \
    -e MONGO_PASSWORD={mongodb password} \
    -e MONGO_USERNAME={mongo db username} \
    -e AUX={mongodb aux}
```

para correr el script en shell

````
sh run.sh
````
