# App Productos - Ionic Angular Firebase

Aplicación móvil para la gestión básica de productos desarrollada con **Ionic, Angular y Firebase**.

El proyecto permite administrar productos mediante una interfaz móvil, utilizando Firebase como servicio backend para el almacenamiento y gestión de la información.

## Descripción

Este proyecto consiste en una aplicación de administración de productos desarrollada con Ionic y Angular.

La aplicación utiliza **Firebase** como backend, permitiendo almacenar y consultar la información de los productos desde la aplicación.

El proyecto fue desarrollado como parte de un proceso de aprendizaje sobre el desarrollo de aplicaciones móviles híbridas utilizando Ionic, Angular y servicios de Firebase.

## Características

- Gestión básica de productos.
- Registro de productos.
- Consulta de productos.
- Actualización de información.
- Eliminación de productos.
- Integración con Firebase.
- Interfaz adaptada para dispositivos móviles.
- Navegación mediante Ionic.
- Formularios utilizando Angular.
- Comunicación con Firebase mediante AngularFire.

## Tecnologías utilizadas

### Frontend

- Ionic 8
- Angular 20
- TypeScript
- HTML
- CSS
- Ionicons
- RxJS

### Backend / Servicios

- Firebase
- AngularFire

### Desarrollo móvil

- Capacitor 8
- Capacitor Camera
- Capacitor App
- Capacitor Haptics
- Capacitor Keyboard
- Capacitor Status Bar

### Herramientas

- Angular CLI
- Ionic CLI
- TypeScript
- ESLint
- Jasmine
- Karma

## Arquitectura

La aplicación utiliza Angular como framework principal para la construcción de la interfaz y Ionic para proporcionar los componentes y funcionalidades orientadas al desarrollo móvil.

Firebase funciona como servicio backend para almacenar y gestionar la información de los productos.

```text
┌─────────────────────────────┐
│       Aplicación Ionic      │
│                             │
│       Angular 20            │
│       Ionic 8               │
└──────────────┬──────────────┘
               │
               │ AngularFire
               ▼
┌─────────────────────────────┐
│          Firebase           │
│                             │
│     Almacenamiento de datos │
└─────────────────────────────┘
```

## Funcionamiento

El usuario interactúa con la aplicación mediante las diferentes vistas disponibles para administrar los productos.

El flujo general de la aplicación es:

```text
Usuario
   │
   ▼
Aplicación Ionic
   │
   ▼
Angular
   │
   ▼
AngularFire
   │
   ▼
Firebase
   │
   ▼
Datos de productos
```

Las operaciones realizadas desde la aplicación se comunican con Firebase para consultar o modificar la información almacenada.

## Estructura general

```text
App-productos-IONIC-Angular-Firebase/
│
├── src/
│   ├── app/
│   ├── assets/
│   └── ...
│
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Requisitos

Para ejecutar el proyecto localmente se recomienda tener instalado:

- Node.js
- npm
- Angular CLI
- Ionic CLI
- Git

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/nicolas-arrieta-dev/App-productos-IONIC-Angular-Firebase.git
```

Ingresar a la carpeta:

```bash
cd App-productos-IONIC-Angular-Firebase
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Para que la aplicación pueda comunicarse con Firebase es necesario configurar un proyecto en Firebase y agregar las credenciales correspondientes dentro de la configuración de Angular.

La configuración debe realizarse utilizando las variables y archivos de entorno correspondientes al proyecto.

> No se recomienda subir credenciales privadas o información sensible de Firebase directamente al repositorio.

### 4. Ejecutar la aplicación

```bash
npm start
```

También puede utilizarse:

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

## Scripts disponibles

| Comando | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la compilación de producción |
| `npm run watch` | Compila automáticamente durante el desarrollo |
| `npm test` | Ejecuta las pruebas |
| `npm run lint` | Ejecuta el análisis de código |

## Dependencias principales

Entre las principales dependencias utilizadas se encuentran:

- `@angular/core`
- `@angular/fire`
- `@ionic/angular`
- `firebase`
- `@capacitor/core`
- `@capacitor/camera`
- `ionicons`
- `rxjs`

## Objetivo del proyecto

El objetivo del proyecto es desarrollar una aplicación móvil básica para la gestión de productos utilizando tecnologías modernas de desarrollo frontend y servicios cloud.

Principalmente, se busca poner en práctica conceptos como:

- Desarrollo de aplicaciones móviles híbridas.
- Angular.
- Ionic.
- Formularios.
- Componentes y servicios.
- Navegación.
- Integración con Firebase.
- Persistencia de datos.
- Operaciones CRUD.
- Uso de AngularFire.
- Desarrollo y organización de proyectos frontend.

## Créditos

Este proyecto fue desarrollado como parte de un proceso de aprendizaje siguiendo el contenido y las prácticas del material proporcionado por:

**Yorch Dev**

Sitio web:

https://www.yorch-dev.com/

Los créditos correspondientes al contenido, metodología y material de referencia utilizado durante el desarrollo pertenecen a su autor original.

Este repositorio tiene fines educativos y de aprendizaje.

<img width="652" height="1018" alt="image" src="https://github.com/user-attachments/assets/197f4bd8-db9c-48f1-90bf-ee7e067a7294" />
<img width="685" height="1016" alt="image" src="https://github.com/user-attachments/assets/ed141eaa-c021-43e7-8a75-ef2fdb202809" />
<img width="1525" height="533" alt="image" src="https://github.com/user-attachments/assets/56ae9cb3-e1c3-4a9e-a12b-a6551c197055" />

<img width="594" height="1020" alt="image" src="https://github.com/user-attachments/assets/04bcad7c-6d85-4759-b94f-034e0d157dee" />
<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/3a56aa6c-a8b4-473f-86db-aaf542518146" />
<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/83054a0b-4b71-4b2a-8a2c-7c8f43634112" />
<img width="628" height="1025" alt="image" src="https://github.com/user-attachments/assets/0db340fd-1e21-4a1c-ab00-99dc2e1f9cc6" />
<img width="661" height="1022" alt="image" src="https://github.com/user-attachments/assets/458f818b-f1ad-4099-ab09-f73c05f39e2f" />
<img width="633" height="1019" alt="image" src="https://github.com/user-attachments/assets/979d7488-495d-40e0-9ade-e4ebd3914599" />
<img width="677" height="1028" alt="image" src="https://github.com/user-attachments/assets/a79c57d9-53f1-45a3-8170-d2e2b3eb0fe7" />
<img width="596" height="1019" alt="image" src="https://github.com/user-attachments/assets/bc7b9431-814e-4cd4-8f73-f1e0c7f54256" />


