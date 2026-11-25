# Catálogo Oficial de Personajes Reutilizables (`studio-shared/assets/personajes/`)

Todos los personajes vectoriales 2D de **Un Dato Más** viven aquí para ser reutilizados y personalizados en cualquier producción sin perder jamás la identidad visual consolidada en los proyectos del 22 y 23 de noviembre (*El Chavo*, *Don Ramón* y *Cómo funcionan los ojos*).

## Reglas de Estilo Visual Compartido
- **Tinta negra uniforme:** `#0b0d10` (`4.4px`) con remates y uniones redondeadas (`inkProps()`).
- **Cabeza ovalada expresiva (ancho > alto):** `rx="58..64"`, `ry="49..54"` con orejas simétricas integradas y ojos sólidos circulares bien espaciados.
- **Animación viva IK:** Brazos y piernas articulados de 2 segmentos (`CartoonArmIK`, `CartoonLegIK`), 8 poses, 7 expresiones faciales, parpadeo determinista y *lip-sync*.

## Elenco Disponible (Importable desde `video-studio-2d/shared-art`)

| Componente | Archivo | Uso recomendado |
|---|---|---|
| **`PersonajeEditorialModular`** | `PersonajeEditorialModular.tsx` | **Generador universal reutilizable:** modifica `gender` (`femenino`/`masculino`), `hairStyle` (`corto`, `melena_ondulada`, `mono_alto`, `mono_clasico`, `coletas`, `sin_pelo`), `hairColor`, `skinColor`, `outfitStyle`, `colors`, `hat`, `facialHair`, `glasses`, `scarfColor` y `holdProp`. |
| **`Personaje1Base`** | `Personaje1Base.tsx` | Personaje adulto masculino base con 3 vestuarios (`base`, `vecindad`, `abrigo`), sombreros y bigotes. |
| **`Personaje2Nina`** | `Personaje2Nina.tsx` | Personaje infantil femenino con coletas, 3 vestidos (`base`, `vecindad`, `lluvia`) y lentes opcionales. |
| **`Personaje3Traje`** | `Personaje3Traje.tsx` | Personaje adulto alto en traje/fedora (`base`, `vecindad`, `escritor`) ideal para directores, narradores o personajes clásicos. |
| **`Personaje4Marinerito`** | `Personaje4Marinerito.tsx` | Personaje infantil masculino con 3 variantes (`base`, `vecindad`, `diario`). |
| **`DonMonchitoCartoon`** | `DonMonchitoCartoon.tsx` | Personaje del #1 *Don Ramón* con 4 vestuarios (`cotidiano`, `carpintero`, `chofer`, `sereno`) y props. |
| **`DonaAmigaCartoon`** | `DonaAmigaCartoon.tsx` | Personaje editorial femenino clásico (vestido + chal + sombrero opcional personalizable). |
| **`DoctoraIris`** | `DoctoraIris.tsx` | Científica / divulgadora con bata blanca, moño alto, gafas y puntero/lupa. |
