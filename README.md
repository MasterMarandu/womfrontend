# Frontend Documentation

## Descripción General
Aplicación web de gestión de tareas desarrollada con React que permite:
- Autenticación de usuarios (login)
- CRUD completo de tareas (crear, leer, actualizar, eliminar)
- Listado de tareas con estado de completado
- Interfaz responsive con Bootstrap
- Notificaciones y confirmaciones visuales

## Tecnologías Utilizadas
- **React** (create-react-app)
- **Redux** + **Redux-Saga** (gestión de estado y side effects)
- **Axios** (comunicación HTTP)
- **Formik** + **Yup** (manejo y validación de formularios)
- **Bootstrap 5** + **React-Bootstrap** (estilos y componentes UI)
- **React-Toastify** + **SweetAlert2** (notificaciones)
- **JWT** (autenticación mediante token)

## Instalación y Ejecución
1. **Requisitos previos**:
   ```bash
   Node.js (v18+) y npm (v9+)

2. Clonar repositorio :

~~~
git clone <repository-url>
cd frontend
~~~


3. Instalar dependencias :

~~~
npm install
~~~


4. Ejecutar en desarrollo :

~~~
npm start
~~~


5.  **Iniciar Sesion para admin:**:

user: testuser
password: testpassword


# Estructura de Componentes Principales

## 1. LoginPage  
- **Ubicación**: `src/pages/LoginPage`
- **Funcionalidad**:
  - Formulario de autenticación con validación
  - Integración con API para login
  - Redirección post-autenticación
  - Manejo de estados de carga y errores

## 2. TareasList  
- **Ubicación**: `src/components/TareasList`
- **Funcionalidad**:
  - Listado tabular de tareas
  - CRUD mediante modal (TareaEditModal)
  - Actualización en tiempo real
  - Filtros y paginación (pendiente implementar)

## 3. TareaEditModal  
- **Ubicación**: `src/components/TareaEditModal`
- **Funcionalidad**:
  - Formulario modal para creación/edición
  - Validación con Formik/Yup
  - Comunicación con API para guardar cambios

## 4. Navbar  
- **Ubicación**: `src/components/Navbar`
- **Funcionalidad**:
  - Barra de navegación con información de usuario
  - Botón de logout
  - Indicador de estado de autenticación

# Interacción con la API

## Flujo de Autenticación

- **POST /login**
  - **Headers**: `{ Content-Type: application/x-www-form-urlencoded }`
  - **Body**: `{ username, password }`
  - **Response**: `{ access_token }`

El token se almacena en `localStorage`. Todos los requests posteriores incluyen:

```http
Authorization: Bearer <token>
```


## Endpoints Principales 


| Método | Endpoint            | Descripción           | Componente               |
|--------|---------------------|-----------------------|--------------------------|
| GET    | `/tasks/`           | Listar tareas         | TareasList               |
| POST   | `/tasks/`           | Crear tarea           | TareaEditModal           |
| PUT    | `/tasks/{id}`       | Actualizar tarea      | TareaEditModal           |
| DELETE | `/tasks/{id}`       | Eliminar tarea        | TareasList               |
| GET    | `/users/role/user`  | Listar usuarios       | (Pendiente implementación) |


#### Ejemplo de Llamada API

~~~
export const fetchTareasApi = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener tareas');
  }
};
~~~

### Flujo de Datos (Redux-Saga) 

    Acciones : Definidas en src/features/tareas/tareaSlice.js
    Side Effects : Manejados por sagas en src/features/tareas/tareaSaga.js
    Estado Global :

~~~
{
  tareas: [],
  loading: false,
  error: null,
  successMessage: '',
  selectedTarea: null
}
~~~

### Manejo de Errores 

Notificaciones visuales : 
   React-Toastify para mensajes de éxito
   SweetAlert2 para confirmaciones y errores críticos
         
Validación de formularios : 
   Esquemas Yup integrados con Formik
         
     

### Convenciones 

Nomenclatura : 
        Componentes: PascalCase (Ej: TareaEditModal)
        Acciones Redux: snake_case (Ej: fetch_tareas_request)
         
  

### Estructura de carpetas :
~~~
    src/
├── components/    # Componentes reutilizables
├── features/      # Módulos Redux (tareas, auth)
├── pages/         # Páginas principales
├── services/      # Servicios API
└── App.js         # Configuración de rutas

~~~


### Consideraciones de Seguridad 

JWT Storage : El token se almacena en localStorage (mejorable a httpOnly cookie)
Protección de rutas : 

// src/App.js
<PrivateRoute path="/tareas" component={TareasList} />


### Mejoras Pendientes 

Implementar roles de usuario
Añadir paginación en listados
Mejorar manejo de expiración de token
Implementar pruebas unitarias con Jest
Internacionalización (i18n)
     





