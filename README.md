# Portfolio Gasacher

Portfolio profesional para conseguir trabajo freelance en **Workana**, **LinkedIn**, **Malt**, **Fiverr** y otras plataformas.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Personalización

Edita estos archivos con tu información real:

| Archivo | Qué cambiar |
|---------|-------------|
| `index.html` | Nombre, bio, servicios, proyectos, email, enlaces sociales |
| `src/main.js` | Email en el formulario de contacto (línea `tu@email.com`) |
| `src/styles/main.css` | Colores en `:root` si quieres otro estilo |

### Datos clave a actualizar

1. **Nombre y título** — Sección hero y header
2. **Estadísticas** — Años de experiencia, proyectos completados
3. **Sobre mí** — Tu historia y forma de trabajar
4. **Servicios** — Lo que realmente ofreces
5. **Proyectos** — Tus trabajos reales con enlaces a demo/GitHub
6. **Habilidades** — Tu stack técnico real
7. **Contacto** — Email, Workana, LinkedIn, GitHub

### Foto de perfil

Sustituye el avatar con iniciales por una imagen:

```html
<!-- En index.html, dentro de .about__avatar -->
<img src="/tu-foto.jpg" alt="Tu nombre" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />
```

Coloca tu foto en la carpeta `public/`.

## Despliegue gratuito

### Opción 1: Vercel (recomendado)

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) → Import Project
3. Selecciona el repo → Deploy
4. Obtienes una URL como `https://portfolio-gasacher.vercel.app`

### Opción 2: Netlify

1. Sube a GitHub
2. Ve a [netlify.com](https://netlify.com) → Add new site
3. Build command: `npm run build`
4. Publish directory: `dist`

### Opción 3: GitHub Pages

```bash
npm run build
# Sube la carpeta dist/ a la rama gh-pages
```

## Usar en plataformas freelance

### Workana

En tu perfil de Workana incluye:

- **Título**: "Desarrollador Web Full-Stack Freelance"
- **Descripción**: Copia el texto de la sección "Sobre mí"
- **Portfolio URL**: Tu URL desplegada (ej. `https://portfolio-gasacher.vercel.app`)
- **Habilidades**: Las de la sección "Habilidades"
- **Proyectos**: Enlaza cada proyecto con capturas de pantalla

### LinkedIn

- Añade la URL del portfolio en "Información de contacto → Sitio web"
- Publica tus proyectos como publicaciones con enlace al portfolio

### Otras plataformas

- **Malt**, **Fiverr**, **Upwork**, **Freelancer.com**: Misma URL del portfolio en todos los perfiles

## Formulario de contacto avanzado

El formulario actual abre el cliente de email. Para recibir mensajes directamente:

1. Crea cuenta en [Formspree](https://formspree.io)
2. Cambia el `<form>` en `index.html`:

```html
<form action="https://formspree.io/f/TU_ID" method="POST" class="contact__form">
```

## Build para producción

```bash
npm run build
npm run preview
```

Los archivos finales quedan en `dist/`.
