# Proyecto INMOMANAGER

## Descripción
Proyecto de gestión de inmuebles desarrollado en Node.js, Express, postgreSQL y PrismaORM.

## Instalación
1. Clonar el archivo .env.template a .env.local
2. Configurar las variables de entorno en el archivo .env.local
3. Ejecutar el comando `npm install` para instalar las dependencias
4. En caso de necesitar base de datos, abrir la aplicación externa docker y ejecutar `docker-compose up -d` en esta terminal para levantar los servicios deseados.
5. Ejecutar el comando `sh ./init-db-dev.sh` para carga la base de datos inicial.
6. Ejecutar el comando `npm run dev` para iniciar el servidor.