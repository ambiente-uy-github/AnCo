import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Contratos } from './contratos/contratos';
import { ContratoDetalle } from './contratos/contrato-detalle';
import { Empresas } from './empresas/empresas';
import { Plantas } from './plantas/plantas';
import { Emisores } from './emisores/emisores';
import { Parametros } from './parametros/parametros';
import { Frecuencias } from './frecuencias/frecuencias';
import { Unidades } from './unidades/unidades';

export default [
    { path: 'contratos/:id', component: ContratoDetalle },
    { path: 'contratos', component: Contratos },
    { path: 'empresas', component: Empresas },
    { path: 'plantas', component: Plantas },
    { path: 'emisores', component: Emisores },
    { path: 'parametros', component: Parametros },
    { path: 'frecuencia', component: Frecuencias },
    { path: 'unidades', component: Unidades },
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
