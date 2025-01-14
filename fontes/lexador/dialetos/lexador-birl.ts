import { LexadorInterface, SimboloInterface } from '../../interfaces';
import { RetornoLexador } from '../../interfaces/retornos';
import { ErroLexador } from '../erro-lexador';
import tiposDeSimbolos from '../../tipos-de-simbolos/birl';
import { Simbolo } from '../simbolo';
import { parse } from 'path';
import palavrasReservadas from '../palavras-reservadas';
import { LexadorBaseLinhaUnica } from '../lexador-base-linha-unica';

export class LexadorBirl extends LexadorBaseLinhaUnica {
    proximoIgualA(esperado: string): boolean {
        if (this.eFinalDoCodigo()) {
            return false;
        }

        if (this.codigo[this.atual] !== esperado) {
            return false;
        }

        this.atual += 1;
        return true;
    }

    analisarTexto(delimitador: string): void {
        // corre o array codigo ate encontrar o delimitador
        // setando na o endereço dele na this.atual
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }

        // se for o final do codigo gera um erro e faz o push no array de erros
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Caractere não finalizado',
            } as ErroLexador);
            return;
        }

        // caso o delimitador seja encontrado
        // faz a tratativa e adiciona no array de simbolos junto com o tipo dele.
        const valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(tiposDeSimbolos.FR, valor);
    }
    analisarNumero(): void {
        // trata numero
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }
        // trata numero flutuante
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();

            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        // faz a tratativa e salva nos simbolos
        const numeroCompleto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(tiposDeSimbolos.T, parseFloat(numeroCompleto));
    }
    identificarPalavraChave(): void {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }

        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual).toLowerCase();
        if (codigo in palavrasReservadas) {
            this.adicionarSimbolo(palavrasReservadas[codigo]);
        } else {
            this.adicionarSimbolo(tiposDeSimbolos.HORA_DO_SHOW, codigo);
        }
    }
    analisarToken(): void {
        const caractere = this.simboloAtual();

        switch (caractere) {
            case '(':
                this.adicionarSimbolo(tiposDeSimbolos.PARENTESE_ESQUERDO);
                break;
            case ')':
                this.adicionarSimbolo(tiposDeSimbolos.PARENTESE_DIREITO);
                break;
            case '=':
                this.adicionarSimbolo(this.proximoIgualA('=') ? tiposDeSimbolos.IGUAL_IGUAL : tiposDeSimbolos.IGUAL);
                break;
            case "'":
                this.analisarTexto("'");
                break;
            case '"':
                this.analisarTexto('"');
                break;
            case ';':
                this.adicionarSimbolo(tiposDeSimbolos.PONTO_E_VIRGULA);
                break;
            // case ' ':
            case '\0':
            case '\r':
            case '\t':
                this.avancar();
                break;
            default:
                this.analisaPalavraChave();
            // if (this.eDigito(caractere as string)) this.analisarNumero();
            // else if (this.eAlfabeto(caractere as string)) this.identificarPalavraChave();
            // else
            //     this.erros.push({
            //         linha: this.linha,
            //         caractere: caractere,
            //         mensagem: 'Caractere inesperado.',
            //     } as ErroLexador);
        }
    }

    analisaPalavraChave(): void {
        // Problemas aqui entra em um loop infinito.
        while (this.simboloAtual() !== '\n') {
            this.avancar();
        }

        const valor = this.codigo.substring(this.inicioSimbolo, this.atual - 1);
        switch (valor) {
            // case ' ':
            //     this.avancar();
            //     break;
            case 'HORA DO SHOW':
                this.adicionarSimbolo(tiposDeSimbolos.HORA_DO_SHOW);
                this.avancar();
                break;
            case 'BIRL':
                this.adicionarSimbolo(tiposDeSimbolos.BIRL);
                this.avancar();
                break;
            default:
                this.avancar();
                break;
        }
    }

    InjetaUmItemDentroDaLista(item: string, posicao: number): string[] {
        let codigoComeco: string[];
        let codigoPosPosição: string[];

        for (let i in this.codigo as any) {
            if (Number(i) === posicao) {
                let iterador: number = Number(i);
                while (iterador <= this.codigo.length) {
                    codigoPosPosição.push(this.codigo[iterador]);
                    iterador += 1;
                }
                break;
            }
            codigoComeco.push(this.codigo[i]);
        }

        return [...codigoComeco, ...codigoPosPosição];
    }

    formataCodigo(): void {
        let codigo: string;
        for (const i in this.codigo as any) {
            if (this.codigo[i] == 'BIRL') {
                this.codigo;
            }
        }
    }

    mapear(codigo: string[], hashArquivo: number = -1): RetornoLexador {
        // this.erros = [];
        // this.simbolos = [];
        // this.inicioSimbolo = 0;
        // this.atual = 0;
        // this.linha = 1;

        // Trabalhar com apenas 1 linha
        this.codigo = codigo.join('\n') || '';

        this.codigo += '\n';

        // this.formataCodigo();

        while (!this.eFinalDoCodigo()) {
            // this.formataCodigo();
            this.inicioSimbolo = this.atual;
            this.analisarToken(); // Meu erro ta acontecendo aqui pois a funcao analisar o token por meio da posição do atual ou seja ela pega apenas um char e eu preciso de um frase;
        }

        return {
            simbolos: this.simbolos,
            erros: this.erros,
        } as RetornoLexador;
    }
}
