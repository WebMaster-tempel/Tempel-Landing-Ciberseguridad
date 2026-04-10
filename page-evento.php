<?php /* Template Name: Pagina React Evento */ ?>
<?php get_header(); ?>

<style>
    /* 0. PROTECCIÓN HEADER JUPITER */
    #mk-header-1 a, .mk-header a,
    .mk-main-navigation a, .mk-responsive-nav a,
    .mk-header-toolbar a {
        color: inherit !important;
        text-decoration: none !important;
        font-size: revert !important;
        font-weight: revert !important;
        font-family: revert !important;
        letter-spacing: revert !important;
        text-transform: revert !important;
        background-color: revert !important;
    }

    #mk-header-1 ul, .mk-header ul,
    .mk-main-navigation ul, .mk-responsive-nav ul {
        list-style: revert !important;
        margin: revert !important;
        padding: revert !important;
    }

    #mk-header-1 h1, #mk-header-1 h2,
    #mk-header-1 h3, #mk-header-1 h4,
    #mk-page-introduce h1, #mk-page-introduce h2 {
        font-size: revert !important;
        font-weight: revert !important;
        font-family: revert !important;
        text-transform: revert !important;
        letter-spacing: revert !important;
        color: revert !important;
    }

    #mk-header-1 button, .mk-header button,
    #mk-header-1 input, .mk-header input {
        font: revert !important;
        background-color: revert !important;
        border-radius: revert !important;
        letter-spacing: revert !important;
        opacity: revert !important;
    }

    #mk-header-1 svg, .mk-header svg {
        display: revert !important;
        vertical-align: revert !important;
    }

    #mk-header-1 img, .mk-header img {
        max-width: revert !important;
        height: revert !important;
        display: revert !important;
    }

    /* 2. CONFIGURACIÓN DEL ROOT Y OCULTAR NAV/FOOTER DE REACT */
    #root {
        width: 100% !important;
        display: block !important;
    }

    /* Ocultamos el Nav y Footer inyectados por React */
    #root nav, #root footer {
        display: none !important;
    }

    /* 3. ESPACIADOS GENERALES */
    #root section#hero { padding-top: 10% !important; }
    #root section#hero img {background-color: transparent}
    #root section {
        padding-top: 1% !important;
        padding-bottom: 1% !important;
        border-style: solid !important;
        box-sizing: border-box !important;
    }

    /* 4. REFUERZO DE CLASES TAILWIND */
    #root .p-8 { padding: 2rem !important; }
    #root .p-6 { padding: 1.5rem !important; }
    #root .space-y-10 > :not([hidden]) ~ :not([hidden]) {
        margin-top: 2.5rem !important;
    }

    /* 5. FIX DE CENTRADO Y GRID */
    #root .max-w-5xl, #root .xl\:max-w-6xl, #root .mx-auto {
        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-bottom: 2.5% !important;
        float: none !important;
    }

    #root .grid {
        display: grid !important;
    }

    /* 6. AJUSTE ESPECÍFICO DE LOGOS (HOMOGENEIDAD) */
    #root .flex.flex-wrap.justify-center.items-center.gap-20 img {
        height: 60px !important;
        width: auto !important;
        max-width: 250px !important;
        object-contain: contain !important;
    }

    /* Espacio extra entre bloques de la sección de logos */
    #root .text-center.mb-10 {
        margin-top: 5% !important;
    }

    /* 7. TIPOGRAFÍA */
    #root * { font-family: 'Open Sans', sans-serif !important; }

    /* 8. BOX SIZING GLOBAL */
    #root *, #root *::before, #root *::after {
        box-sizing: border-box !important;
    }

    #root .flex.flex-col.sm\:flex-row.gap-4.md\:gap-6 {
        padding-top: 5% !important;
    }

    /* 9. BORDES EN LAS CARTAS DEL GRID (Servicios/Características) */
    #root .grid.lg\:grid-cols-3 > div {
        border: 0.5px solid rgba(0, 0, 0, 0.2) !important;
        border-style: solid !important;
    }

    /* 10. ALINEACIÓN CENTRADA EN "SOBRE EL EVENTO" */
    #root .grid.lg\:grid-cols-2.items-start {
        align-items: center !important;
    }

    /* 11. DIFERENCIACIÓN DE HILERAS EN LA AGENDA */
    #root .divide-y > div {
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        margin-bottom: 12px !important;
        padding: 20px !important;
        background-color: rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    #root .divide-y > div:hover {
        background-color: rgba(0, 0, 0, 0.04);
        border-color: rgba(0, 0, 0, 0.2) !important;
    }

    #root .divide-y {
        border-top: none !important;
    }
    #root .divide-y > :not([hidden]) ~ :not([hidden]) {
        border-top-width: 0px !important;
    }

    /* 12. PADDING BOTTOM EN "Evento organizado por" */
    #root h2.text-sm.md\:text-xl {
        margin-bottom: 5% !important;
    }

    /* 13. TÍTULOS H2 — MAYÚSCULAS, NEGRITA, TAMAÑO MODERADO */
    #root h2.text-3xl.md\:text-5xl.xl\:text-6xl,
    #root h2.text-3xl.md\:text-5xl,
    #root h2.text-4xl.md\:text-6xl.xl\:text-6xl,
    #root h2.text-4xl.md\:text-5xl.xl\:text-6xl {
        font-weight: 700 !important;
        text-transform: uppercase !important;
        font-size: clamp(1.6rem, 3vw, 2.8rem) !important;
        letter-spacing: 0.02em !important;
    }

    /* 14. TÍTULOS H3 DE LAS CARDS EN NEGRITA Y TAMAÑO REDUCIDO */
    #root .grid.md\:grid-cols-2.lg\:grid-cols-3 h3,
    #root .grid.lg\:grid-cols-3 h3 {
        font-weight: 700 !important;
        font-size: 0.95rem !important;
    }

    /* 14b. CARDS DEL GRID — MISMA ALTURA */
    #root .grid.md\:grid-cols-2.lg\:grid-cols-3 {
        align-items: stretch !important;
    }
    #root .grid.md\:grid-cols-2.lg\:grid-cols-3 > div {
        height: 100% !important;
    }

    /* 15. PONENTES — Tarjetas con border 0.5 e imagen uniforme */
    #root section#speakers {
        display: none;
    }

    #root section#speakers .grid > div,
    #root [id*="speaker"] .grid > div,
    #root [id*="ponente"] .grid > div {
        text-align: center !important;
        border: 0.5px solid rgba(0, 0, 0, 0.2) !important;
        border-radius: 4px !important;
        overflow: hidden !important;
    }

    /* Imagen de ponente: altura fija y object-fit cover para uniformidad */
    #root section#speakers .grid > div img,
    #root [id*="speaker"] .grid > div img,
    #root [id*="ponente"] .grid > div img {
        width: 100% !important;
        height: 260px !important;
        object-fit: cover !important;
        object-position: top center !important;
        display: block !important;
    }

    /* 16. AGENDA — Títulos de los ítems más pequeños */
    #root .divide-y h3.text-base,
    #root .divide-y h3.md\:text-lg {
        font-size: 0.8rem !important;
        line-height: 1.3 !important;
        font-weight: 600 !important;
    }

    /* 17. INFORMACIÓN PRÁCTICA — Mayor espacio entre elementos (excepto h3 y su siguiente) */
    #root .p-6.md\:p-10.flex.flex-col.justify-center.space-y-6 > div,
    #root .p-6.md\:p-10.flex.flex-col.justify-center.space-y-6 > a {
        margin-top: 1.4rem !important;
    }

    /* El h3 y el div inmediatamente siguiente conservan su spacing original */
    #root .p-6.md\:p-10.flex.flex-col.justify-center.space-y-6 > h3,
    #root .p-6.md\:p-10.flex.flex-col.justify-center.space-y-6 > h3 + div {
        margin-top: 0 !important;
    }

    /* 18. BOTÓN "RESERVAR PLAZA" — estilo sólido igual al del formulario */
    #root a[href$="#register"].border.border-primary {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0.5rem !important;
        background-color: var(--color-primary, #1a1a1a) !important;
        color: var(--color-secondary, #ffffff) !important;
        border: 1px solid var(--color-primary, #1a1a1a) !important;
        padding: 0.75rem 2rem !important;
        font-size: 0.85rem !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.3em !important;
        transition: opacity 0.2s ease !important;
        text-decoration: none !important;
    }

    #root a[href$="#register"].border.border-primary:hover {
        opacity: 0.85 !important;
    }

    .tracking-\[0\.4em\] {
        letter-spacing: 0 !important;
    }

    /* 19. SECCIÓN ORGANIZADO POR / PARTNERS — menos padding vertical */
    #root section.py-24.md\:py-10 {
        padding-top: 2rem !important;
        padding-bottom: 2rem !important;
    }
    #root section.py-24.md\:py-10 .text-center.mb-10 {
        margin-bottom: 1.5rem !important;
    }
    #root section.py-24.md\:py-10 .flex.justify-center.items-center.mb-8 {
        margin-bottom: 1rem !important;
    }

    /* 20. BADGES "PLAZAS LIMITADAS" / "ASIGNACIÓN DE PLAZA" */
    #root .flex.flex-col.gap-2.mt-4 {
        gap: 0.6rem !important;
        margin-top: 1.5rem !important;
    }
    #root .flex.flex-col.gap-2.mt-4 .inline-flex {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.65rem !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        font-size: 0.68rem !important;
        letter-spacing: 0.18em !important;
        color: #727272 !important;
        font-weight: 600 !important;
    }
    #root .flex.flex-col.gap-2.mt-4 .inline-flex span.rounded-full {
        width: 18px !important;
        height: 1px !important;
        border-radius: 0 !important;
        background: currentColor !important;
        flex-shrink: 0 !important;
        opacity: 0.6 !important;
    }

    /* =====================================================
       RESPONSIVE — ADAPTACIÓN A TODOS LOS TAMAÑOS
       ===================================================== */

    /* --- MÓVIL (< 640px) --- */
    @media (max-width: 639px) {
        #root section#hero { 
            padding-top: 40% !important; 
        }

        #root section#hero img {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: 280px !important;
            object-fit: contain !important;
        }

        #root section#hero [class*="max-w-"] {
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
        }

        #root section#hero h1 {
            font-size: clamp(1.8rem, 8vw, 2.5rem) !important;
            line-height: 1.1 !important;
        }

        #root section#hero .flex.flex-col {
            flex-direction: column !important;
        }

        /* Márgenes laterales en móvil */
        #root section,
        #root .max-w-5xl,
        #root .xl\:max-w-6xl,
        #root .mx-auto {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
        }

        #root section#speakers .grid {
            grid-template-columns: 1fr !important;
        }

        #root img[alt="Espacio DOBBLE Madrid"] {
            height: 180px !important;
        }

        #root .grid.sm\:grid-cols-2 {
            grid-template-columns: 1fr !important;
        }
    }

    /* --- TABLET y LAPTOP PEQUEÑA (640px - 1080px) ← RANGO PRINCIPAL */
    @media (min-width: 640px) and (max-width: 1080px) {
        #root section#hero { 
            padding-top: 20% !important; 
        }

        #root section#hero img {
            width: 100% !important;
            max-width: 480px !important;
            height: auto !important;
            object-fit: contain !important;
            margin: 0 auto !important;
        }

        #root section#hero h1 {
            font-size: clamp(2rem, 5vw, 3rem) !important;
        }

        /* === MARGEN LATERAL CLARO EN ESTE RANGO === */
        #root section,
        #root .max-w-5xl,
        #root .xl\:max-w-6xl,
        #root .mx-auto {
            padding-left: 3rem !important;   /* 48px - margen cómodo */
            padding-right: 3rem !important;
        }

        /* Ponentes: 2 columnas */
        #root section#speakers .grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }

        /* Temáticas: 2 columnas */
        #root .grid.md\:grid-cols-2.lg\:grid-cols-3 {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }

    /* --- LAPTOP MEDIA (1081px - 1279px) */
    @media (min-width: 1081px) and (max-width: 1279px) {
        #root section#hero { 
            padding-top: 20% !important; 
        }

        #root section#hero img {
            width: 100% !important;
            max-width: 420px !important;
            height: auto !important;
            max-height: 420px !important;
            object-fit: contain !important;
        }

        #root section#hero h1 {
            font-size: clamp(2.2rem, 4vw, 3.2rem) !important;
        }

        /* Margen lateral un poco más amplio */
        #root section,
        #root .max-w-5xl,
        #root .xl\:max-w-6xl,
        #root .mx-auto {
            padding-left: 4rem !important;   /* 64px */
            padding-right: 4rem !important;
        }

        #root section#speakers .grid {
            grid-template-columns: repeat(4, 1fr) !important;
        }
    }

    /* --- DESKTOP GRANDE (1280px en adelante) */
    @media (min-width: 1280px) {
        #root section#hero { 
            padding-top: 15% !important; 
        }

        #root section#hero img {
            width: 100% !important;
            max-width: 500px !important;
            height: auto !important;
            max-height: 480px !important;
            object-fit: contain !important;
            display: block !important;
            margin-left: auto !important;
        }

        #root section#hero h1 {
            font-size: clamp(2.5rem, 3.5vw, 3.8rem) !important;
            line-height: 1.05 !important;
        }

        /* Margen amplio en desktop */
        #root section,
        #root .max-w-5xl,
        #root .xl\:max-w-6xl,
        #root .mx-auto {
            padding-left: 5rem !important;   /* ~80px */
            padding-right: 5rem !important;
        }

        #root section#speakers .grid {
            grid-template-columns: repeat(4, 1fr) !important;
        }

        #root .grid.md\:grid-cols-2.lg\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
        }

        #root .max-w-5xl { max-width: 64rem !important; }
        #root .xl\:max-w-6xl { max-width: 72rem !important; }
    }

    /* --- PANTALLAS MUY GRANDES (> 1536px) --- */
    @media (min-width: 1536px) {
        #root section#hero img {
            max-width: 560px !important;
            max-height: 540px !important;
        }

        #root section#hero h1 {
            font-size: 4rem !important;
        }

        #root section,
        #root .max-w-5xl,
        #root .xl\:max-w-6xl,
        #root .mx-auto {
            padding-left: 6rem !important;
            padding-right: 6rem !important;
        }
    }

</style>

<div id="root"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    // Mapa de reemplazo de imágenes (React Hash -> WP URL)
    const mapaImagenes = {
        // Logotipos Partners
        "logo-cci-pos-es-Jg4a3SCF.png": "https://www.tempelgroup.com/wp-content/uploads/2026/04/logo-cci-pos-es.png",
        "Moxa_Logo_CMYK-B8aIeNki.png": "https://www.tempelgroup.com/wp-content/uploads/2017/07/partner_moxa_logo.png",

        // Logo Principal
        "logotipo_tempelgroup-DvuSwwJA.png": "https://www.tempelgroup.com/wp-content/uploads/2017/10/logo_cabecero_tempel.png",

        // Hero Image
        "Tempel-Group_Evento_Ciberseguridad_Industrial-Ck60JXgr.png": "https://www.tempelgroup.com/wp-content/uploads/2026/04/tempel-group_evento_ciberseguridad_industrial.png",

        // Ponentes
        "gemma_garces-D8Clx226.jpeg": "https://www.tempelgroup.com/wp-content/uploads/2026/04/gemma_garces-scaled.jpeg",
        "jose_valiente-D9WThLY4.png": "https://www.tempelgroup.com/wp-content/uploads/2026/04/jose_valiente.png",
        "alvaro_borges-lAbApRNB.png": "https://www.tempelgroup.com/wp-content/uploads/2017/07/partner_moxa_logo.png",

        // Sala Dobble
        "foto-sala-dobble.jpg": "https://www.tempelgroup.com/wp-content/uploads/2026/04/foto-sala-dobble.jpg"
    };

    const reemplazarImagenes = () => {
        const imagenes = document.querySelectorAll('#root img');
        imagenes.forEach(img => {
            for (let nombreArchivo in mapaImagenes) {
                if (img.src.includes(nombreArchivo)) {
                    img.src = mapaImagenes[nombreArchivo];
                }
            }
            // Reemplazo por alt para la sala Dobble (ruta relativa de React)
            if (img.alt === "Espacio DOBBLE Madrid") {
                img.src = "https://www.tempelgroup.com/wp-content/uploads/2026/04/foto-sala-dobble.jpg";
            }
        });
    };

    // Estilos para tarjetas de ponentes (fallback JS)
    const estilizarPonentes = () => {
        const secciones = document.querySelectorAll(
            '#root section#speakers, #root section#ponentes, #root [id*="speaker"], #root [id*="ponente"]'
        );
        secciones.forEach(seccion => {
            const tarjetas = seccion.querySelectorAll('.grid > div');
            tarjetas.forEach(tarjeta => {
                tarjeta.style.textAlign = 'center';
                tarjeta.style.border = '0.5px solid rgba(0,0,0,0.2)';
                tarjeta.style.borderRadius = '4px';
                tarjeta.style.overflow = 'hidden';

                const img = tarjeta.querySelector('img');
                if (img) {
                    img.style.width = '100%';
                    img.style.height = '260px';
                    img.style.objectFit = 'cover';
                    img.style.objectPosition = 'top center';
                    img.style.display = 'block';
                }
            });
        });
    };

    // Espaciado en columna de Información Práctica (fallback JS)
    const estilizarInfoPractica = () => {
        const imgDobble = document.querySelector('#root img[alt="Espacio DOBBLE Madrid"]');
        if (!imgDobble) return;

        const gridPadre = imgDobble.closest('.grid');
        if (gridPadre) {
            gridPadre.style.border = '0.5px solid rgba(0,0,0,0.2)';
            gridPadre.style.borderRadius = '4px';
            gridPadre.style.overflow = 'hidden';
        }

        // Columna de texto: buscar el div hermano que contiene el h3 "Madrid"
        const colTexto = gridPadre ? gridPadre.querySelector('.flex.flex-col.justify-center') : null;
        if (colTexto) {
            const hijos = Array.from(colTexto.children);
            hijos.forEach((hijo, i) => {
                // Saltamos el h3 (índice 0) y el primer div tras él (índice 1)
                if (i > 1) {
                    hijo.style.marginTop = '1.4rem';
                }
            });
        }
    };

    // Reducir tamaño de títulos h3 en la agenda (fallback JS)
    const estilizarAgenda = () => {
        const agendaItems = document.querySelectorAll('#root .divide-y h3');
        agendaItems.forEach(h3 => {
            h3.style.fontSize = '0.8rem';
            h3.style.lineHeight = '1.3';
            h3.style.fontWeight = '600';
        });
    };

    // Eliminar nombres de Francisco Herrero y Aisha Inam de la agenda
    const limpiarNombresAgenda = () => {
        const parrafos = document.querySelectorAll('#root section#agenda p');
        parrafos.forEach(p => {
            if (
                p.textContent.includes('Francisco Herrero') ||
                p.textContent.includes('Aisha Inam')
            ) {
                p.remove();
            }
        });
    };

    const estilizarBotonReserva = () => {
        const enlace = document.querySelector('#root a[href$="#register"]');
        if (!enlace || enlace.dataset.estilizado) return;

        // Limpiar texto y añadir flecha SVG
        enlace.textContent = 'Reservar Plaza';
        const svgFlecha = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgFlecha.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgFlecha.setAttribute('width', '16');
        svgFlecha.setAttribute('height', '16');
        svgFlecha.setAttribute('viewBox', '0 0 24 24');
        svgFlecha.setAttribute('fill', 'none');
        svgFlecha.setAttribute('stroke', 'currentColor');
        svgFlecha.setAttribute('stroke-width', '2');
        svgFlecha.setAttribute('stroke-linecap', 'round');
        svgFlecha.setAttribute('stroke-linejoin', 'round');
        svgFlecha.setAttribute('aria-hidden', 'true');
        svgFlecha.style.marginLeft = '0.4rem';
        svgFlecha.innerHTML = '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>';
        enlace.appendChild(svgFlecha);

        enlace.dataset.estilizado = 'true';
    };

    // Observador para detectar cuándo React renderiza el contenido
    const observer = new MutationObserver(() => {
        reemplazarImagenes();
        estilizarPonentes();
        estilizarInfoPractica();
        estilizarAgenda();
        estilizarBotonReserva();
        limpiarNombresAgenda();
    });

    const targetNode = document.getElementById('root');
    if (targetNode) {
        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
    }

    // Ejecución inicial
    reemplazarImagenes();
    estilizarPonentes();
    estilizarInfoPractica();
    estilizarAgenda();
    estilizarBotonReserva();
    limpiarNombresAgenda();
});
</script>

<?php get_footer(); ?>