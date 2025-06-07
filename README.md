# 🏥 Examen Técnico Fullstack Junior – Backend

Este proyecto corresponde al backend del sistema de gestión de especialistas médicos para la clínica **Salud Vital**, desarrollado como parte del examen técnico de la ficha ADSO 2863722 del SENA.

---

## 📌 Funcionalidad

Permite:
- Crear, ver, editar, inactivar, reactivar y eliminar especialistas médicos.
- Registrar horarios por día con validación de traslapes.
- Implementar soft delete (estado `activo`) y restauración.
- Agrupar los horarios por día por cada especialista.

---

## ⚙️ Tecnologías utilizadas

- **Node.js** + **AdonisJS v6**
- **MySQL**
- **VineJS** (validaciones)
- **Postman** (pruebas de endpoints)

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/examen-backend.git
cd examen-backend

### 2. Instalar dependencias
npm install

### 3. Configurar variables de entorno
Copia el archivo .env.example a .env y ajusta tu conexion a MySQL

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=examen_backend

### 4. Ejecutar migraciones y seeders
node ace migration:run
node ace db:seed

### 5. Iniciar el servidor de desarrollo
node ace serve --watch

### Endpoints principales
| Método | Ruta                        | Acción                         |
| ------ | --------------------------- | ------------------------------ |
| GET    | /especialistas              | Listar especialistas activos   |
| GET    | /especialistas/inactivos    | Listar especialistas inactivos |
| GET    | /especialistas/\:id         | Ver detalle de un especialista |
| POST   | /especialistas              | Crear especialista             |
| PATCH  | /especialistas/\:id         | Editar especialista            |
| DELETE | /especialistas/\:id         | Inactivar especialista         |
| POST   | /especialistas/\:id/restore | Restaurar especialista         |
| DELETE | /especialistas/\:id/force   | Eliminar definitivamente       |

## 📬 Colección de Postman

Para facilitar las pruebas del backend, se incluye una colección de Postman con todas las rutas disponibles:

- [Descargar colección Postman](./Miguel_examen.postman_collection.json)

Importa este archivo en tu Postman local o desde [Postman Web](https://web.postman.co) para comenzar a probar las rutas de forma inmediata.


# Autor:
Miguel Angel Bohada Lopez - Ficha ADSO 2863722
Instructor: ing. Giovanny Gonzalez
Fecha: 7 de junio de 2025
