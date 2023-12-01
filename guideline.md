# GUIDELINE

## HTML
### Sintaxis
- Etiquetas en minúscula.
- Una tabulación par los elementos anidados.
- Los atributos con comillas dobles.

### Atributo *lang*
- Añadir el atributo *lang* en el HTML.
- Añadir el atributo *lang* en todas las palabras de un idioma diferente al principal de la web.

### Orden de los atributos
- class
- id
- name
- data-*
- src
- for
- type
- href
- value
- title
- alt
- role
- aria-*
- tableindex
- Atributos booleanos

## CSS
### Sintaxis
- Una tabulación para elementos anidados. 
- Si se agrupan selectores, cada uno en una sola línea. 
- Un espacio antes de una llave de apertura.
- Un espacio despúes de una coma (,).
- Un espacio despues de los dos puntos (:).
- Cada declaración debe aparecer en su propia línea.
- Terminar las declaraciones con punto y coma (;).
- Los valores hexadecimales deben escribirse en minúscula. 

### Clases
- Las clases deben ser lo más cortas y concisas posible.
- Las cadenas de clases deben separarse con un guión (-).
- Las clases deben tener nombres que permitan la reutilización (ej. btn-primary). 


### Orden de las declaraciones
- Posicionamiento
- Modelo de caja
- Tipográfico
- Visual

### Declaraciones únicas
En los casos en los que un conjunto de reglas incluir solo una declaración, eliminar los saltos de línea.

### Notación abreviada
Usar solo las declaraciones abreviadas cuando no haya opción de declaraciones explícitas de los valores. 

### Anidamiento en preprocesadores
- Evitar el anidamiento innecesario en preprocesadores siempre que sea posible. Es preferible usar clases. 
- Si se debe usar la anidación, limitar a 4 selectores.

### Operadores en preprocesadores
Incluir todas las operaciones matemáticas entre paréntesis con un único espacio entre valores, variables y operadores.

### Organización
- Organizar por secciones y subsecciones:
  - Elementos generales (Componentes UI).
  - Cabecera.
  - Pie de página.
  - Página específica (ej. página de inicio).
- Usar la siguiente plantailla para iniciar una sección. El nombre debe ser en mayúscula con el nombre del componente. 
<pre>/*------------------------------------*\
  HEADER
\*------------------------------------*/</pre>
- Una línea vacía entre elementos estrechamente relacionados.
- Dos líneas vacías entre elementos poco relacionados.
- Cinco líneas vacías entre secciones nuevas.

### Comentarios
- Limitar el ancho de los compentarios a 100 carácteres.
- Comentarios descriptivos. 

### Selectores
- Evitar el uso de elementos genéricos. Es preferible usar clases. 

### Variables
- Después de los dos puntos debe haber un espacio en blanco.

### Funciones o Mixins
- Añadir el paréntesis cuando se ejecute una función o mixin.
- No añadir espacios en blanco entre la función o mixin y el paréntesis.