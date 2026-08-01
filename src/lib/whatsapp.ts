// =================================================================
// WHATSAPP
//
// Dos tipos de enlace, a propósito:
//
// 1. `whatsappUrl(numero, mensaje)` → https://wa.me/<numero>?text=...
//    Abre el chat con el mensaje ya escrito. Se usa en los botones de
//    cada sección y de cada curso, para que Elinad sepa por qué le
//    escriben.
//
// 2. El link del perfil de WhatsApp Business (`whatsapp_link_perfil`
//    en page_data.json) NO admite mensaje prellenado: es un enlace
//    corto que resuelve al perfil, con su saludo automático y catálogo.
//    Se usa solo en el botón "Escríbeme" del menú.
// =================================================================

/** Enlace a WhatsApp con el mensaje ya escrito en el cuadro de texto. */
export function whatsappUrl(numero: string, mensaje?: string): string {
  const n = numero.replace(/\D/g, '');
  const m = mensaje?.trim();
  return m ? `https://wa.me/${n}?text=${encodeURIComponent(m)}` : `https://wa.me/${n}`;
}
