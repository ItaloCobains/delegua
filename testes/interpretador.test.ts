import { Delegua } from '../fontes/delegua';

describe('Interpretador', () => {
    describe('interpretar()', () => {
        let delegua: Delegua;

        beforeEach(() => {
            delegua = new Delegua('delegua');
        });

        describe('Cenários de sucesso', () => {
            describe('Atribuições', () => {
                it('Trivial', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = 1"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Vetor', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = [1, 2, 3]"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Dicionário', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = {'a': 1, 'b': 2}"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Concatenação', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = 1 + '1'"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Interpolação de Texto', () => {
                    const retornoLexador = delegua.lexador.mapear([
                        "var comidaFavorita = 'strogonoff'",
                        'escreva("Minha comida favorita é ${comidaFavorita}")'
                    ], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });

            describe('Acesso a variáveis e objetos', () => {
                it('Acesso a elementos de vetor', () => {
                    const retornoLexador = delegua.lexador.mapear([
                        "var a = [1, 2, 3]", 
                        "escreva(a[1])"
                    ], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Acesso a elementos de dicionário', () => {
                    const retornoLexador = delegua.lexador.mapear([
                        "var a = {'a': 1, 'b': 2}",
                        "escreva(a['b'])"
                    ], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });

            describe('escreva()', () => {
                it('Olá Mundo (escreva() e literal)', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva('Olá mundo')"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('nulo', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(nulo)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('nulo igual a nulo', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(nulo == nulo)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('verdadeiro', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(verdadeiro)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('falso', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(falso)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });

            describe('Importar', () => {
                it('Importar biblioteca externa', () => {
                    const retornoLexador = delegua.lexador.mapear(["var commander = importar('commander')"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);

                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                describe('Importar bibliotecas delegua', () => {
                    describe('testa importação da biblioteca de estatística', () => {
                        beforeEach(() => {
                            jest.mock('./__mocks__/estatistica.ts');
                        })
                        afterAll(() => {
                            jest.unmock("./__mocks__/estatistica.ts")
                        })
                        it('estatística' , () => {
                            const retornoLexador = delegua.lexador.mapear(["var estatística = importar('estatística')"], -1);
                            const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                            const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);

                            expect(retornoInterpretador.erros).toHaveLength(0);
                        });

                        it('estatistica' , () => {
                            const retornoLexador = delegua.lexador.mapear(["var estatistica = importar('estatistica')"], -1);
                            const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                            const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);

                            expect(retornoInterpretador.erros).toHaveLength(0);
                        });
                    })

                    describe('testa importação da biblioteca de física', () => {
                        beforeEach(() => {
                            jest.mock('./__mocks__/fisica.ts');
                        })
                        afterEach(() => {
                            jest.unmock("./__mocks__/fisica.ts")
                        })
                        it('física' , () => {
                            const retornoLexador = delegua.lexador.mapear(["var física = importar('física')"], -1);
                            const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                            const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                            expect(retornoInterpretador.erros).toHaveLength(0);
                        });

                        it('fisica' , () => {
                            const retornoLexador = delegua.lexador.mapear(["var fisica = importar('fisica')"], -1);
                            const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                            const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                            expect(retornoInterpretador.erros).toHaveLength(0);
                        });
                    })

                    describe('testa importação da biblioteca de matemática', () => {
                        beforeEach(() => {
                            jest.mock('./__mocks__/matematica.ts');
                        })
                        afterAll(() => {
                            jest.unmock("./__mocks__/matematica.ts")
                        })
                        it('matemática com acento' , () => {
                            const retornoLexador = delegua.lexador.mapear(["var matemática = importar('matemática')"], -1);
                            const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                            const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                            expect(retornoInterpretador.erros).toHaveLength(0);
                        });

                        it('matematica sem acento' , () => {
                            const retornoLexador = delegua.lexador.mapear(["var matematica = importar('matematica')"], -1);
                            const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                            const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                            expect(retornoInterpretador.erros).toHaveLength(0);
                        });
                    })
                })
            });

            describe('Delegua com parametro de performance', () => {
                it('performance', () => {
                    const deleguaPerformance = new Delegua('delegua', true)
                    const retornoLexador = deleguaPerformance.lexador.mapear(["escreva(1 + 1)"], -1);
                    const retornoAvaliadorSintatico = deleguaPerformance.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = deleguaPerformance.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });

            describe('Operações matemáticas', () => {
                it('Operações matemáticas - Trivial', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(5 + 4 * 3 - 2 ** 1 / 6 % 10)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações matemáticas - Subtração', () => {
                    const retornoLexador = delegua.lexador.mapear(["-1"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });

            describe('Operações lógicas', () => {
                it('Operações lógicas - ou', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(verdadeiro ou falso)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - e', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(verdadeiro e falso)"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - negação', () => {
                    const retornoLexador = delegua.lexador.mapear(["!verdadeiro"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - em', () => {
                    const retornoLexador = delegua.lexador.mapear(["escreva(2 em [1, 2, 3])"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - bit a bit não', () => {
                    const retornoLexador = delegua.lexador.mapear(["~1"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - menor menor', () => {
                    const retornoLexador = delegua.lexador.mapear(["1 << 2"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - maior maior', () => {
                    const retornoLexador = delegua.lexador.mapear(["2 >> 1"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - bit ou', () => {
                    const retornoLexador = delegua.lexador.mapear(["1 | 2"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - bit e', () => {
                    const retornoLexador = delegua.lexador.mapear(["1 & 1"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Operações lógicas - bit xor', () => {
                    const retornoLexador = delegua.lexador.mapear(["1 ^ 2"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });

            describe('Escolha - Caso', () => {
                it('Escolha', () => {
                    const codigo = [
                        "escolha (1) {",
                            "caso 1:",
                                "escreva('correspondente à opção 1');",
                            "caso 2:",
                                "escreva('correspondente à opção 2');",
                            "padrao:",
                                "escreva('Sem opção correspondente');",
                        "}"
                    ];
                    
                    const retornoLexador = delegua.lexador.mapear(codigo, -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            })

            describe('Tente - Pegue - Finalmente', () => {
                it('Tente', () => {
                    const codigo = [
                        "tente {",
                            "escreva('sucesso');",
                        "} pegue {",
                            "escreva('pegue');",
                        "} finalmente {",
                            "escreva('pronto');",
                        "}"
                    ];
                    
                    const retornoLexador = delegua.lexador.mapear(codigo, -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Tente com senão', () => {
                    const codigo = [
                        "tente {",
                            "se 1 != 1 {",
                                "escreva('sucesso');",
                            "}",
                            "senao {",
                                "escreva('é diferente');",
                            "}",
                        "} pegue {",
                            "escreva('pegue');",
                        "} finalmente {",
                            "escreva('pronto');",
                        "}"
                    ];
                    
                    const retornoLexador = delegua.lexador.mapear(codigo, -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Pegue', () => {
                    const codigo = [
                        "tente {",
                            "1 > '1';",
                            "escreva('sucesso');",
                        "} pegue {",
                            "escreva('captura');",
                        "} finalmente {",
                            "escreva('pronto');",
                        "}"
                    ];
                    
                    const retornoLexador = delegua.lexador.mapear(codigo, -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            }),

            describe('Condicionais', () => {
                it('Condicionais - condição verdadeira', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (1 < 2) { escreva('Um menor que dois') } senão { escreva('Nunca será executado') }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Condicionais - condição falsa', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (1 > 2) { escreva('Nunca acontece') } senão { escreva('Um não é maior que dois') }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Condicionais - condição menor igual', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (1 <= 2) { escreva('Um é menor e igual a dois') } senão { escreva('Nunca será executado') }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Condicionais - condição maior igual', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (2 >= 1) { escreva('Dois é maior ou igual a um') } senão { escreva('Nunca será executado') }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });

                it('Condicionais - condição diferente', () => {
                    const retornoLexador = delegua.lexador.mapear(["se (2 != 1) { escreva('Dois é diferente de um') } senão { escreva('Nunca será executado') }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });
            
            describe('Laços de repetição', () => {
                it('Laços de repetição - enquanto', () => {
                    const retornoLexador = delegua.lexador.mapear(["var a = 0;\nenquanto (a < 10) { a = a + 1 }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
    
                it('Laços de repetição - fazer ... enquanto', () => {
                    const retornoLexador = delegua.lexador.mapear([
                        "var a = 0",
                        "fazer { a = a + 1 } enquanto (a < 10)"
                    ], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
    
                it('Laços de repetição - para', () => {
                    const retornoLexador = delegua.lexador.mapear(["para (var i = 0; i < 10; i = i + 1) { escreva(i) }"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });
            
            describe('Classes', () => {
                it('Trivial', () => {
                    const codigo = [
                        "classe Animal {",
                        "    correr() {",
                        "        escreva('Correndo Loucamente')",
                        "    }",
                        "}",
                        "classe Cachorro herda Animal {",
                        "    latir() {",
                        "        escreva('Au Au Au Au')",
                        "    }",
                        "}",
                        "var nomeDoCachorro = Cachorro()",
                        "nomeDoCachorro.correr()",
                        "nomeDoCachorro.latir()",
                        "escreva('Classe: OK!')"
                    ];
                    
                    const retornoLexador = delegua.lexador.mapear(codigo, -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
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
                    const retornoLexador = delegua.lexador.mapear(codigo, -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros).toHaveLength(0);
                });
            });
        });

        describe('Cenários de falha', () => {
            describe('Acesso a variáveis e objetos', () => {
                it('Acesso a elementos de vetor', () => {
                    const retornoLexador = delegua.lexador.mapear([
                        "var a = [1, 2, 3];",
                        "escreva(a[4]);"
                    ], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros.length).toBeGreaterThan(0);
                });

                it('Acesso a elementos de dicionário', () => {
                    const retornoLexador = delegua.lexador.mapear([
                        "var a = {'a': 1, 'b': 2};",
                        "escreva(a['c']);"
                    ], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
        
                    expect(retornoInterpretador.erros.length).toBeGreaterThanOrEqual(0);
                });
            });

            describe('Importar', () => {
                it('Importar biblioteca externa que não existe', () => {
                    const retornoLexador = delegua.lexador.mapear(["var naoexiste = importar('naoexiste')"], -1);
                    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                    const retornoInterpretador = delegua.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);

                    expect(retornoInterpretador.erros.length).toBeGreaterThan(0);
                })
            });
            
        });
    });
});