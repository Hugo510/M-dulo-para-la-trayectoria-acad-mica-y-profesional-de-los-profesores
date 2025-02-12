# CV API Backend

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

Este proyecto implementa una API robusta y escalable para la gestión de currículums (CV) de maestros, focalizada en la seguridad, eficiencia y modularidad mediante el uso de tecnologías modernas y estándares profesionales.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` configurando las variables de entorno necesarias (ver sección de Configuración).

## Uso

Inicia el servidor en modo desarrollo con:

```bash
npm run dev
```

## Configuración

Define las variables de entorno necesarias en un archivo `.env` (ver variables: DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET, etc).

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
/src
  /controllers
  /models
  /routes
  /middlewares
  /utils
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
