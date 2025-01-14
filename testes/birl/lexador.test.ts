import { Delegua } from '../../fontes/delegua';

describe('Lexador Birl', () => {
    let delegua: Delegua;

    beforeEach(() => {
        delegua = new Delegua('birl');
    });
    it('Arquivo vazio.', () => {
        const resultado = delegua.lexador.mapear([''], -1);

        expect(resultado).toBeTruthy();
        expect(resultado.simbolos).toHaveLength(0);
    });
    it('Programa vazio', () => {
        const resultado = delegua.lexador.mapear(['HORA DO SHOW \n', 'BIRL \n'], -1);

        expect(resultado).toBeTruthy();
        expect(resultado.simbolos).toHaveLength(2);
    });
});
