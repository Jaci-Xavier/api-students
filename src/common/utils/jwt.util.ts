import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';


export function generateToken(payload: object): string {
    return jwt.sign(payload, jwtConstants.secret, { expiresIn: '4h' });
};

export function validateToken(token: string): string | jwt.JwtPayload {
    try {
        return jwt.verify(token, jwtConstants.secret) as string | jwt.JwtPayload;
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
}
