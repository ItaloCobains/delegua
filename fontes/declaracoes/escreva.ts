import { Construto } from "../construtos";
import { InterpretadorInterface, ResolvedorInterface } from "../interfaces";
import { Declaracao } from "./declaracao";


export class Escreva extends Declaracao {
    argumentos: Construto[];

    constructor(linha: number, hashArquivo: number, argumentos: Construto[]) {
        super(linha, hashArquivo);
        this.argumentos = argumentos;
    }

    aceitar(visitante: ResolvedorInterface | InterpretadorInterface): any {
        return visitante.visitarExpressaoEscreva(this);
    }
}
