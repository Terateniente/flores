# Flores amarillas 🌻

Una experiencia digital romántica e interactiva inspirada en la tradición de regalar flores amarillas el 21 de septiembre. El jardín, las flores, las luciérnagas y los pétalos están dibujados y animados con código.

## Personalizar el regalo

Edita únicamente `src/config.ts`:

```ts
recipientName: 'Mi persona favorita'
senderName: 'Luis'
mainMessage: 'Estas flores son para ti 💛'
letterMessage: `Tu carta...`
specialMessage: 'Tu mensaje especial'
musicUrl: `${import.meta.env.BASE_URL}music/romantic-garden.mp3`
```

Puedes sustituir `public/music/romantic-garden.mp3` por otra pista propia conservando el mismo nombre, o cambiar `musicUrl`. Para evitar bloqueos de reproducción automática, la música comienza después de pulsar **Abrir mi regalo**.

## Ejecutar en local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Comprobar y compilar

```bash
npm run typecheck
npm run build
npm run preview
```

La versión de producción queda en `dist/`.

## Desplegar

### Vercel

Importa el repositorio, selecciona **Vite** y usa `npm run build` como comando de build y `dist` como directorio de salida.

### Netlify

Conecta el repositorio. Usa `npm run build` como build command y `dist` como publish directory. También puedes arrastrar la carpeta `dist/` a Netlify Drop.

### GitHub Pages

El proyecto usa rutas relativas (`base: './'`), así que funciona en un subdirectorio. Compila con `npm run build` y publica el contenido de `dist/` mediante GitHub Actions o una rama `gh-pages`.

## Incluye

- Diseño mobile-first optimizado para 390×844, 393×873 y 430×932.
- Cuatro clases de flores generadas con CSS y crecimiento escalonado.
- Carta animada, contador, hitos en 5/10/20 flores y easter eggs.
- Lluvia de pétalos, luciérnagas, partículas de cursor/toque y brillo final.
- Audio local, Web Share API con respaldo al portapapeles y preferencias de movimiento reducido.
