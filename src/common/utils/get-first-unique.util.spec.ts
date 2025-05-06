import { getFirstUniqueLetter } from './get-first-unique.util';

describe('getFirstUniqueLetter', () => {
  it('deve retornar a primeira letra única em maiúsculo', () => {
    const result = getFirstUniqueLetter('gabriel');
    expect(result).toBe('G');
  });

  it('deve retornar "_" se não houver letra única', () => {
    const result = getFirstUniqueLetter('aabbcc');
    expect(result).toBe('_');
  });

  it('deve considerar letras repetidas independentemente da posição', () => {
    const result = getFirstUniqueLetter('aabbccdde');
    expect(result).toBe('E');
  });

  it('deve ser case-sensitive por padrão', () => {
    const result = getFirstUniqueLetter('aAbBcC');
    expect(result).toBe('A');
  });

  it('deve retornar "_" se string for vazia', () => {
    const result = getFirstUniqueLetter('');
    expect(result).toBe('_');
  });
});
