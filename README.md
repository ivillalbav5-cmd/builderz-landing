# BUILDERZ · Landing

Landing de conversión de BUILDERZ (software factory). Tráfico desde Instagram y Google, mobile-first.
Next.js 16 (App Router) · TypeScript · Tailwind v4 (tokens en `app/globals.css`, no hay `tailwind.config`).

## Requisitos
- Node.js **20.9 o superior** (probado con Node 22) y npm.
- El build descarga las fuentes de Google (Plus Jakarta Sans e Inter): necesita internet al compilar.
- Es una app Next.js con servidor (`next start`), **no** un sitio estático.

## Correr en local
```bash
npm install                  # WhatsApp y Calendly ya vienen en el archivo .env
npm run dev                  # http://localhost:3100
```

## Variables de entorno
Se leen **al compilar** (`npm run build`): definirlas antes del build.

| Variable | Obligatoria | Qué es |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sí | Número con código de país, sin `+`. Ya cargado en `.env`. |
| `NEXT_PUBLIC_CALENDLY_URL` | Sí | Link de Calendly. Ya cargado en `.env`. |
| `ALLOW_INDEXING` | No | `true` **solo en la producción final**. Sin esto `robots.txt` bloquea a Google (correcto para Vercel y previews). |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | No | Medición. Vacías = no se carga nada. Con tráfico desde España hace falta banner de cookies antes de activarlas. |

`next.config.ts` también lee `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` al ARRANCAR (`npm start`, para armar la CSP): definirlas en ambos momentos.

Los dos valores vienen en `.env` (son públicos: se ven en el sitio). Para cambiarlos sin editar `.env`, usar `.env.local` o las variables del hosting (tienen prioridad). Si falta WhatsApp o Calendly el build falla con un mensaje claro (a propósito, para que nunca salga un valor de prueba).
Nunca poner secretos en variables `NEXT_PUBLIC_*`: se publican en el navegador.

## Publicar

### 1) Vercel (revisión del equipo)
1. Importar la carpeta/repo. Framework: Next.js (se detecta solo).
2. Cargar `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_CALENDLY_URL` (Production y Preview).
3. **No** cargar `ALLOW_INDEXING`: la URL de Vercel no debe indexarse.

### 2) Producción final (www.builderz.ar)
- **Opción más simple:** dejar el sitio en Vercel y apuntar el DNS de `www.builderz.ar` a Vercel (el hosting de WN Power dejaría de servir la web). En Vercel cargar además `ALLOW_INDEXING=true` en Production y volver a desplegar.
- **Si va en el hosting de WN Power:** confirmar con ellos que el plan permite aplicaciones Node.js (en cPanel: "Setup Node.js App") con Node ≥ 20.9. Pasos: `npm ci` → definir las variables (incluida `ALLOW_INDEXING=true`) → `npm run build` → `npm start` (usa el puerto de la variable `PORT`, por defecto 3100). Si el plan no soporta Node, avisar: hay que preparar una variante de exportación estática (se pierden los headers de seguridad y la optimización de imágenes).
- Los headers de seguridad (CSP, HSTS, etc.) los aplica Next. Si hay un proxy delante (nginx, Apache), no debe quitarlos.
- Si hay CDN o proxy con caché, purgarla en cada deploy: el HTML se sirve con `s-maxage` de un año.

### Después de publicar
- `https://www.builderz.ar/robots.txt` debe decir `Allow: /`. `…/sitemap.xml` debe abrir y listar `/` y `/en`.
- Las páginas deben salir **sin** `noindex` (en el código fuente de la página no debe aparecer `<meta name="robots" content="noindex...">`). Si aparece, falta `ALLOW_INDEXING=true` en el build.
- Verificar el dominio en Google Search Console, enviar el sitemap y pedir la indexación.
- Crear el perfil de Google Business (Buenos Aires) con el link del sitio.
- Probar los links de WhatsApp y Calendly desde un celular.

## Idiomas (español / inglés)
- Español en `/` e inglés en `/en`. Son dos páginas estáticas con su propia URL (cada una indexable), enlazadas con `hreflang` y declaradas en `sitemap.xml`.
- El botón **EN / ES** del header es un link a la otra versión. No hay detección automática de idioma ni cookies.
- Cada idioma tiene su `<title>`, descripción, imagen de redes (`app/en/opengraph-image.png`) y datos estructurados (JSON-LD).
- Para cambiar un texto o sumar un idioma: `content/` (copiar `es.ts`, traducir, y crear su carpeta en `app/` igual que `app/en/`).

## Dónde se edita cada cosa
- **Textos, servicios, portfolio, SEO:** `content/es.ts` (español) y `content/en.ts` (inglés). Mismo formato: si falta algo en uno, `npm run typecheck` avisa. `content/site.ts` guarda los datos comunes (URL, mail, Instagram, países).
- **Portfolio:** cada proyecto acepta `href` (link al sitio, vuelve clickeable la tarjeta). Si no están, no se muestran.
- **Contacto:** `lib/contact.ts` (lee las variables de entorno).
- **Eventos de conversión:** `lib/track.ts` y `components/seo/Analytics.tsx`.
- **Colores y tipografías:** `app/globals.css` (`@theme`).
- **Headers de seguridad y CSP:** `next.config.ts` (al sumar servicios externos, agregar sus dominios ahí).

## Estructura
```
app/(es)/       versión en español (ruta /): layout, page, imagen OG
app/en/         versión en inglés (ruta /en): layout, page, imagen OG
app/            robots, sitemap, ícono, estilos globales
components/     layout · pages · sections · ui · effects · motion · seo
content/        es.ts · en.ts (copy por idioma) · site.ts (datos comunes) · types.ts
lib/            contact, track, utilidades
public/images/  imágenes públicas (todo lo que está acá es público)
scripts/pack.sh genera builderz-landing-entrega.zip (`npm run pack`)
```

## Entregar la carpeta
`npm run pack` genera `builderz-landing-entrega.zip` sin `node_modules`, `.next`, `.env.local` ni archivos de sistema. Las dependencias se reinstalan con `npm ci`.
