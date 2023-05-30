export const colors = {
    lunes: "#227C9D",
    martes: "#17C3B2",
    miercoles: "#FFCB77",
    jueves: "#FEF9EF",
    viernes: "#FE6D73",
    sabado: "#E1F2FE",
    domingo: "#EDAFB8",
} 

const ICON = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
<svg fill="#000000" width="15px" height="15px" viewBox="-3.2 -3.2 38.40 38.40" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0">

<rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="19.2" fill="#ffffff" strokewidth="0"/>

</g>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"/> </g>

</svg>`;
let iconUrl = 'data:image/svg+xml;base64,' + btoa(ICON);

export let icon = L.icon({
    iconUrl: iconUrl,
});