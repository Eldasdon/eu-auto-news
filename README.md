# AutoWire Europa

Agregador de noticias del sector del automóvil (lanzamientos, manufactura, mercado/acciones, ventas, estadísticas), con foco en Europa y novedades de EE.UU., Latinoamérica y Asia. Sitio estático, sin backend: `data/articles.json` alimenta `index.html`.

## Estructura

- `index.html`, `about.html`, `privacy.html` — páginas del sitio.
- `assets/style.css`, `assets/app.js` — estilos y lógica de render.
- `data/articles.json` — fuente de datos de los artículos (`{ updatedAt, articles: [...] }`).
- `.github/workflows/pages.yml` — despliega el sitio a GitHub Pages en cada push a `main`.

## Publicar en GitHub Pages (una vez)

1. En el repo de GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Haz push a `main`; el workflow `pages.yml` construye y publica automáticamente.
3. La URL será `https://<usuario>.github.io/<repo>/`. Para dominio propio, añade un archivo `CNAME` con el dominio y configura el DNS (registro CNAME a `<usuario>.github.io`).

## Monetización con Google AdSense

1. Solicita una cuenta en https://adsense.google.com usando la URL pública del sitio (necesita estar ya publicado y con contenido real).
2. Cuando Google te dé tu ID de editor (`pub-XXXXXXXXXXXXXXXX`):
   - Añade el script de AdSense en el `<head>` de `index.html`, `about.html` y `privacy.html`.
   - Crea un archivo `ads.txt` en la raíz con: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
3. La aprobación de AdSense puede tardar días/semanas y requiere contenido suficiente y políticas cumplidas (por eso el resumen original + cita de fuente en cada artículo).

## Actualización de contenido

Las noticias se generan y añaden a `data/articles.json` mediante una tarea programada (2 veces al día) que busca noticias reales, redacta un resumen propio y breve, y cita la fuente original al final de cada artículo. Cada entrada tiene esta forma:

```json
{
  "id": "slug-unico",
  "title": "Título breve",
  "summary": "Resumen propio de 2-4 frases, sin copiar texto de la fuente.",
  "category": "lanzamientos | manufactura | mercado | ventas | estadisticas | asia",
  "sourceName": "Nombre del medio",
  "sourceUrl": "https://...",
  "publishedAt": "2026-09-14T08:00:00Z"
}
```

Para actualizar manualmente: edita `data/articles.json` y haz push a `main`; el sitio se redepliega solo.
