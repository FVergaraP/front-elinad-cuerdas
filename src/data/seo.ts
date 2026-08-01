// =================================================================
// METADATOS TÉCNICOS DE SEO
//
// Todo lo de schema.org que el cliente NO debe editar vive aquí, no
// en page_data.json. Motivo: Pages CMS reescribe el JSON completo al
// guardar y puede eliminar claves que no estén declaradas en
// `.pages.yml`. Manteniendo esto en código, no hay nada que perder.
//
// Lo que sí es contenido (nombre, descripciones, teléfono, redes)
// se lee desde page_data.json — ver src/lib/seo.ts.
// =================================================================

export const SEO_TECNICO = {
  region: 'Región Metropolitana',
  pais: 'CL',
  localBusiness: {
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.4489,
      longitude: -70.6693,
    },
    priceRange: '$$',
    currenciesAccepted: 'CLP',
    paymentAccepted: 'Transferencia bancaria, efectivo',
    openingHours: 'Mo-Sa 09:00-21:00',
  },
} as const;
