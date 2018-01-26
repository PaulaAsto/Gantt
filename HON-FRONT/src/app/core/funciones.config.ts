import { ConstantesConfig } from '../core/constantes.config'
export class FuncionesConfig{
    public diferenciaEntreDiasEnDias(a: Date, b: Date)
    {
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        return Math.floor((utc2 - utc1) / ConstantesConfig.MILISENGUNDOS_POR_DIA);
    }
}