## 🔒 Seguridad Implementada hasta el Momento

Actualmente, el sistema cuenta con las siguientes medidas de seguridad:

| 🔑 Medida | 📝 Descripción |
|-----------|----------------|
| **JWT (JSON Web Tokens)** | 🔐 Se utilizan para autenticar usuarios en cada request.<br>✅ Garantizan que solo usuarios con un token válido puedan acceder a la API. |
| **Roles y Permisos** | 👥 Middleware personalizado para validar el rol de cada usuario.<br>✅ Permite controlar qué acciones puede realizar cada rol dentro del sistema. |
| **Rate Limiting** | ⏱️ Limita el número de peticiones por IP en un periodo de tiempo definido.<br>🛡️ Previene ataques de fuerza bruta y denegación de servicio (DoS). |
| **Sequelize (ORM)** | 🗄️ Permite mapear clases a tablas en la base de datos.<br>🛡️ Previene ataques de SQL inyección mediante queries parametrizadas.<br>⚙️ Facilita la gestión segura y estructurada de datos. |

## Servicios externos

se implementa Cloudinary para el almacenamieto de archivos