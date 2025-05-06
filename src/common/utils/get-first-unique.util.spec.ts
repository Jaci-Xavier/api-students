import { getFirstUniqueLetter } from './get-first-unique.util';

describe('getFirstUniqueLetter', () => {
  it('deve retornar a primeira letra única em minúsculo quando possível', () => {
    const result = getFirstUniqueLetter('gabriel');
    expect(result).toBe('G');
  });

  it('deve retornar "_" se não houver letra única', () => {
    const result = getFirstUniqueLetter('aabbcc');
    expect(result).toBe('_');
  });

  it('deve retornar "_" quando todas as letras do nome se repetirem', () => {
    const result = getFirstUniqueLetter('anna');
    expect(result).toBe('_');
  });

  it('deve considerar a letra única da primeira posição corretamente, mesmo que em letras maiúsculas', () => {
    const result = getFirstUniqueLetter('Gabriel');
    expect(result).toBe('G');
  });

  it('deve retornar "_" se a string for vazia', () => {
    const result = getFirstUniqueLetter('');
    expect(result).toBe('_');
  });

  it('deve tratar corretamente nomes com números ou caracteres especiais', () => {
    const result = getFirstUniqueLetter('123#123');
    expect(result).toBe('#');
  });

  it('deve retornar a primeira letra maiúscula em uma string com todas as letras únicas', () => {
    const result = getFirstUniqueLetter('abcdef');
    expect(result).toBe('A');
  });
});
