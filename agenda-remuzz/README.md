# Agenda Remuzz móvil · versión inicial (13/11/2026)

App PWA para pacientes y profesionales. Instalación por Safari/Chrome (Agregar a pantalla de inicio).

## URL de publicación prevista
https://hernandezsergio411-spec.github.io/agenda-remuzz/
Si no está publicada, activar GitHub Pages del repositorio con rama main y carpeta /(root). Los archivos se encuentran bajo `agenda-remuzz/`; el sitio principal del repositorio no se modificó.

## Arquitectura
- Frontend estático: index.html, app.js, manifest.webmanifest, sw.js e icon.svg.
- Base central: Supabase Lovable Cloud perteneciente al proyecto **Agenda Estética Remuzz** (Lovable project ID: 679670cf-026c-4346-a8bb-ba53187e6d44).
- Clave embebida: `sb_publishable_...` (clave pública para navegador). **Nunca** incluir una clave secret ni service_role.
- Disponibilidad y registro públicos: funciones RPC `public_services`, `public_availability`, `public_request_booking` en base de datos. Solicitudes quedan con estado `solicitada`.
- Panel de administración: acceso con Supabase Auth y RLS; cita, paciente, tratamientos y pagos.
- Sincronización del panel: consultas cada ~25 s cuando está abierto.
- Avisos para nuevas solicitudes: solicitud HTTP a ntfy.sh desde el navegador público después de un registro exitoso; canal con nombre largo aleatorio y mensaje sin datos personales. Es un aviso **best effort**: la solicitud puede guardarse aunque el aviso falle. **No hay webhook del servidor ni push nativo propia todavía**.

## Configuración pendiente para uso de producción
1. Verificar publicación GitHub Pages y disponibilidad de API desde navegadores reales.
2. **Activar rol del propietario**: no existen cuentas de personal con rol en la base. El alta en Auth por sí sola no concede admin. Asignar rol `admin` a propietario verificado desde operación de base de datos con privilegios, sin exponer acceso a cualquier visitante. Probar acceso y permisos de roles.
3. Vincular al profesional los horarios verdaderos y revisar tratamientos de ejemplo; están precargados precios de referencia.
4. Reemplazar aviso ntfy desde cliente por notificación enviada desde backend con servicio push/trigger autenticado, para evitar avisos falsos y lograr mayor fiabilidad.
5. Probar una solicitud real con consentimiento, confirmar que aparece en el panel administrativo y que notificación llega al teléfono. No insertar pacientes falsos.
6. Revisar política de privacidad, términos de uso, respaldos, requisitos regulatorios y controles anti-bots para publicar ampliamente.

## Recepción de notificaciones de pruebas
Instalar app ntfy en Android o iOS. Crear suscripción al tema `remuzz-book-f0fb039717e22097dc9d2d912691768f` y permitir notificaciones del sistema. TEMA POTENCIALMENTE VISIBLE EN CÓDIGO FUENTE PÚBLICO; no usar para datos personales. No es un canal seguro para historiales clínicos.

## Seguridad
- No se almacenan diagnósticos, fotos o fichas clínicas en esta versión.
- No se publican nombres ni teléfonos de pacientes en GitHub.
- Las tablas de datos de pacientes tienen RLS y solo aceptan lecturas autenticadas autorizadas.
- La página pública solo utiliza funciones RPC.
