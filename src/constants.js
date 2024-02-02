export const colors = {
    lunes: "#4299e1",
    martes: "#ed8936",
    miercoles: "#48bb78",
    jueves: "#f56565",
    viernes: "#ecc94b",
    sabado: "#9f7aea",
    domingo: "#4c51bf",
} 

export const ACCENT_DAYS_TO_NORMAL_DAYS = {
    "LUNES": "lunes",
    "MARTES": "martes",
    "MIÉRCOLES": "miercoles",
    "JUEVES": "jueves",
    "VIERNES": "viernes",
    "SÁBADO": "sabado",
    "DOMINGO": "domingo"
}

export function getColorFromDay(day) {
    let normalDay = ACCENT_DAYS_TO_NORMAL_DAYS[day];
    return colors[normalDay];
}