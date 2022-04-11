import { Delegua } from "../../fontes/delegua";

describe('Interpretador (Égua Clássico)', () => {
    describe('interpretar()', () => {
        let delegua: Delegua;

        beforeEach(() => {
            delegua = new Delegua('egua');
        });

        describe('Cenários de sucesso', () => {
            describe('Atribuições', () => {
                it('Trivial', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = 1;"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });

                it('Vetor', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = [1, 2, 3];"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });

                it('Dicionário', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = {'a': 1, 'b': 2};"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });

            describe('Acesso a variáveis e objetos', () => {
                it('Acesso a elementos de vetor', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = [1, 2, 3];\nescreva(a[1]);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });

                it('Acesso a elementos de dicionário', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = {'a': 1, 'b': 2};\nescreva(a['b']);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });

            describe('escreva()', () => {
                it('Olá Mundo (escreva() e literal)', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva('Olá mundo');"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });

                it('nulo', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(nulo);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });

            describe('Operações matemáticas', () => {
                it('Operações matemáticas - Trivial', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(5 + 4 * 3 - 2 ** 1 / 6 % 10);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });

            describe('Operações lógicas', () => {
                it('Operações lógicas - ou', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(verdadeiro ou falso);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                }); 

                it('Operações lógicas - e', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(verdadeiro e falso);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                }); 

                it('Operações lógicas - em', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(2 em [1, 2, 3]);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                }); 
            });

            describe('Condicionais', () => {
                it('Condicionais - condição verdadeira', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (1 < 2) { escreva('Um menor que dois'); } senão { escreva('Nunca será executado'); }"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });

                it('Condicionais - condição falsa', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (1 > 2) { escreva('Nunca acontece'); } senão { escreva('Um não é maior que dois'); }"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });
            
            describe('Laços de repetição', () => {
                it('Laços de repetição - enquanto', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = 0;\nenquanto (a < 10) { a = a + 1; }"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
    
                it('Laços de repetição - fazer ... enquanto', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = 0;\nfazer { a = a + 1; } enquanto (a < 10)"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
    
                it('Laços de repetição - para', () => {
                    const retornoLexador = delegua.lexador.mapear(["para (var i = 0; i < 10; i = i + 1) { escreva(i); }"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });

            describe('Classes', () => {
                it('Trivial', () => {
                    const codigo = [
                        "classe Animal {",
                        "    correr() {",
                        "        escreva('Correndo Loucamente');",
                        "    }",
                        "}",
                        "classe Cachorro herda Animal {",
                        "    latir() {",
                        "        escreva('Au Au Au Au');",
                        "    }",
                        "}",
                        "var nomeDoCachorro = Cachorro();",
                        "nomeDoCachorro.correr();",
                        "nomeDoCachorro.latir();",
                        "escreva('Classe: OK!');"
                    ];
                    
                    const retornoLexador = delegua.lexador.mapear(codigo);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });

            describe('Declaração e chamada de funções', () => {
                it('Fibonacci', () => {
                    const codigo = [
                        "função fibonacci(n) {",
                        "    se (n == 0) {",
                        "      retorna(0);",
                        "    }",
                        "    se (n == 1) {",
                        "      retorna(1);",
                        "    }",
                        "    var n1 = n - 1;",
                        "    var n2 = n - 2;",
                        "    var f1 = fibonacci(n1);",
                        "    var f2 = fibonacci(n2);",
                        "    retorna(f1 + f2);",
                        "}",
                        "var a = fibonacci(0);",
                        "escreva(a);",
                        "a = fibonacci(1);",
                        "escreva(a);",
                        "a = fibonacci(2);",
                        "escreva(a);",
                        "a = fibonacci(3);",
                        "escreva(a);",
                        "a = fibonacci(4);",
                        "escreva(a);",
                        "a = fibonacci(5);",
                        "escreva(a);"
                    ];
                    const retornoLexador = delegua.lexador.mapear(codigo);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(false);
                });
            });
        });

        describe('Cenários de falha', () => {
            describe('Acesso a variáveis e objetos', () => {
                it('Acesso a elementos de vetor', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = [1, 2, 3];\nescreva(a[4]);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(true);
                });

                it.skip('Acesso a elementos de dicionário', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = {'a': 1, 'b': 2};\nescreva(a['c']);"]);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador.simbolos);
                    delegua.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
                    delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(delegua.teveErroEmTempoDeExecucao).toBe(true);
                });
            });
        });
    });
});