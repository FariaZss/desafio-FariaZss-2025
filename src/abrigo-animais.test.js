import { AbrigoAnimais } from "./abrigo-animais";


describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });
  
  test('Deve encontrar pessoa para um animal', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
    'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  /*TESTES PRÓPRIOS*/
  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,CHIP', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedos duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO,RATO', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animais duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Rex,Rex,Fofo,Mimi');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar a adoção do Loco caso não tenha outros animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,NOVELO', 'SKATE,RATO', 'Loco');
    expect(resultado.erro).toBe('Jabuti precisa de mais um animal para adoção');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar a adoção de gatos caso divida os brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA,LASER', 'Zero,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Zero - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Rejeita a adoção de novos animais caso P1 ou P2 atinja limite de 3 adoções', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,RATO,BOLA,CAIXA,NOVELO,SKATE', 'BOLA,LASER,SKATE,NOVELO', 'Rex,Mimi,Bola,Bebe,Loco');
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Bola - pessoa 1');
    expect(resultado.lista[2]).toBe('Loco - abrigo');
    expect(resultado.lista[3]).toBe('Mimi - pessoa 2');
    expect(resultado.lista[4]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBe('Pessoa não pode adotar mais de 3 animais');
    expect(resultado.lista).toBeNull();
  });


});