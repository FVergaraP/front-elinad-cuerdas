// =================================================================
// SCHEMA.ORG (JSON-LD)
//
// Se genera desde page_data.json + courses.json para que no vuelva a
// desincronizarse: antes el catálogo de servicios listaba 4 cursos
// que ya no existían. El cliente nunca ve schema.org — solo edita el
// contenido normal y esto se actualiza solo.
// =================================================================

import { contenido, type Curso } from '@/data/content';
import { SEO_TECNICO } from '@/data/seo';
import { absoluteUrl } from './url';

export function buildJsonLd(cursos: Curso[], site: URL | undefined) {
  const home = absoluteUrl('/', site);
  const redes = contenido.redes.map((r) => r.url);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${home}#person`,
        name: contenido.negocio.nombre,
        jobTitle: contenido.seo.profesion,
        description: contenido.sobreMi.parrafos[0],
        url: home,
        image: absoluteUrl(contenido.sobreMi.imagen, site),
        sameAs: redes,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${home}#business`,
        name: contenido.negocio.nombre,
        description: contenido.seo.descripcionNegocio,
        url: home,
        telephone: contenido.contacto.whatsappNumero,
        image: absoluteUrl(contenido.seo.imagenAlCompartir, site),
        address: {
          '@type': 'PostalAddress',
          addressLocality: contenido.negocio.ciudad,
          addressRegion: SEO_TECNICO.region,
          addressCountry: SEO_TECNICO.pais,
        },
        ...SEO_TECNICO.localBusiness,
        sameAs: redes,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: contenido.cursosSeccion.titulo,
          itemListElement: cursos.map((curso) => ({
            '@type': 'Offer',
            price: curso.precio,
            priceCurrency: curso.moneda,
            availability: 'https://schema.org/InStock',
            url: `${home}#cursos`,
            itemOffered: {
              '@type': 'Service',
              name: curso.titulo,
              description: curso.descripcion.split('\n')[0].trim(),
              serviceType: curso.modalidad,
              provider: { '@id': `${home}#person` },
            },
          })),
        },
      },
    ],
  };
}
