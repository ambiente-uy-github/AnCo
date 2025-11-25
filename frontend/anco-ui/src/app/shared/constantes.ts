export const FORMATOS = [
    { label: 'CSV', icon: 'pi pi-file' },
    // { label: 'PDF', icon: 'pi pi-file-pdf' },
    // { label: 'XLSX', icon: 'pi pi-file-excel' }
];

export const ESTADOS_CONTRATO = [
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
];

export const FRECUENCIAS_ENVIO = [
    { label: '1 MINUTO', value: 1 },
    { label: '10 MINUTOS', value: 2 },
    { label: '1 HORA', value: 3 },
    { label: '24 HORAS', value: 4 },
    { label: '15 MINUTOS', value: 5 },
    { label: '30 MINUTOS', value: 6 },
];

export const TIPOS_DATO = [
    { label: 'Crudo', value: 1 },
    { label: 'Validado', value: 2 },
];

export const AMBIENTES = [
    { label: 'Pruebas', value: 1 },
    { label: 'Producción', value: 2 }
];

export type tipo_dato = typeof TIPOS_DATO[number]['value'];
export type TipoFrecuencia = typeof FRECUENCIAS_ENVIO[number]['value'];
export type TipoAmbiente = typeof AMBIENTES[number]['value'];