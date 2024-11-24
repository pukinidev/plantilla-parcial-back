# Parcial 2 

Valeria Caro Ramirez - 202111040

## Como correr el proyecto?

El proyecto se configuro con docker para la base de datos, sin embargo, solo es cuestion de cambiar las configuraciones de postgres para que funcione con una instalacion local de la base de datos.

### Docker

* Si se desea correr con docker:

  * `docker compose up -d` -> Linux
  * `docker-compose up -d` -> Windows
* Para matar los servicios:

  * `docker compose down -v` -> Linux
  * `docker-compose down -v` -> Windows

### Local

Para correr el proyecto con una instalacion local de la base de datos se debe cambiar la configuracion de la base de datos en el  app.module.ts.
