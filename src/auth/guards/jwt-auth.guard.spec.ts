import { JwtAuthGuard } from './jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('deve lançar UnauthorizedException se o token estiver expirado', () => {
    const err = null;
    const user = null;
    const info = { name: 'TokenExpiredError', message: 'jwt expired' };

    expect(() => guard.handleRequest(err, user, info)).toThrowError(
      new UnauthorizedException('Token inválido ou expirado'),
    );
  });

  it('deve lançar UnauthorizedException se não houver usuário', () => {
    const err = null;
    const user = null;
    const info = { message: 'No user found' };

    expect(() => guard.handleRequest(err, user, info)).toThrowError(
      new UnauthorizedException('Token inválido ou expirado'),
    );
  });

  it('deve retornar o usuário se estiver autenticado corretamente', () => {
    const err = null;
    const user = { id: 1, name: 'Gabriel' };
    const info = null;

    const result = guard.handleRequest(err, user, info);
    expect(result).toEqual(user);
  });
});
