# Mi Agenda Remuzz — Nueva app móvil

Ruta GitHub Pages prevista: https://hernandezsergio411-spec.github.io/remuzz-agenda-nueva/

## Qué hace
- Autoreserva pública: servicios, día, hora disponible, nombre/teléfono + consentimiento. Guarda en la base como `solicitada`.
- Panel restringido: autenticación, consulta de citas y pacientes, gestión de estado, registro de pagos y servicios.
- Botón de WhatsApp manual para pacientes con consentimiento.
- Aplicación web progresiva (PWA): instalable en pantalla de inicio desde Safari/Chrome, conexión necesaria para agenda.
- Se usa la base de datos Supabase Cloud asociada con el proyecto existente `Agenda Estética Remuzz`: NO es un proyecto de base de datos independiente. No se copian pacientes ni se usan datos falsos.

## Pendiente para funcionamiento de producción
- Verificar que GitHub Pages esté habilitado y que el enlace HTTPS sea accesible públicamente.
- Autorizar a la propietaria de cuenta `dani1996reyesm@gmail.com`: el registro no asigna rol admin. Gestionar asignación con política segura y confirmación del correo, con permisos backend.
- Verificar disponibilidad, horarios, catálogo referencial y pruebas de reserva reales.
- Notificaciones: los avisos a `ntfy.sh` se envían de forma tentativa desde cliente después de guardar la reserva. El canal público se descubre inspeccionando el código y puede sufrir spam; NO es push seguro ni garantizado. Reemplazar por notificación server-side autenticada para despliegue definitivo.
- El panel revisa solicitudes cada 30 segundos mientras está abierto; requiere permiso de notificaciones del navegador para avisos visibles.
- Revisar RGPD/Ley 19.628 Chile y requisitos vigentes antes de manejo de pacientes reales.

## Despliegue en Vercel (alternativo)
Importar repositorio `hernandezsergio411-spec/hernandezsergio411-spec.github.io` y seleccionar directorio raíz `remuzz-agenda-nueva`, framework `Other`, sin paso de compilación. Vercel debe autorizar creación de proyectos en su panel; no fue posible mediante la conexión por error 403.
