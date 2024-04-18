/* eslint-disable @typescript-eslint/no-extraneous-class */
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export type AppPayload = {
  id: string;
  role: string;
} & jwt.JwtPayload;
// CREAMOS UN TYPE CON LAS PROPIEDADES QUE NOS INTERESAN CON EL MISMO NOMBRE DE NUESTRO TIPO Y LE AÑADIMOS LAS PROPIEDADES POR DEFECTO DEL TYPE PAYLOAD DE BCRYPT

export class Auth {
  static secret = process.env.SECRET_JWT;
  // CREAMOS UNA CONSTANTE PARA PODER ACCEDER AL ARCHIVO .ENV, A TRAVES DE PROCESS, PORQUE AHI ES DONDE SE VAN A GUARDAR LAS CONTRASEÑAS DE LOS USUARIOS

  static async makeHash(value: string) {
    return hash(value, 10);
    // RECIBE UN VALOR QUE VA A SER LA PASSWORD QUE INDIQUE EL USUARIO Y UTILIZAMOS EL METODO HASH DE BCRYPT PARA ENCRIPTARLA, EL 10 ES UN VALOR POR DEFECTO QUE ESPERA HASH
  }

  static async compare(value: string, hash: string) {
    return compare(value, hash);
  }
  // RECIBE DOS VALORES, VALUE(CONTRASEÑA) QUE ES EL QUE INDICA EL USUARIO Y OTRO(CONTRASEÑA ENCRIPTADA) HASHEADO QUE ES EL ENCRIPTADO Y LOS COMPARA CON EL METODO COMPARE DE BCRYPT
  // PARA COMPROBAR SI COINCIDEN O NO

  static signJwt(payload: AppPayload) {
    if (!Auth.secret) {
      throw new Error('JWT secret not set');
    }

    return jwt.sign(payload, Auth.secret);
  }
  // CREAMOS UN METODO PARA LOGGEARSE QUE RECIBE UN PARAMETRO DEL TIPO QUE CREAMOS ANTES
  // DESCARTAMOS LA POSIBILIDAD DE QUE SIN LA CONTRASEÑA SE PUEDA ACCEDER
  // Y DEVOLVEMOS A TRAVES DEL METODO SIGN DE BCRYPT EL PAYLOAD Y LA CONTRASEÑA A TRAVES DE LA CONSTANTE QUE CREAMOS ANTES

  static verifyJwt(token: string) {
    if (!Auth.secret) {
      throw new Error('JWT secret not set');
    }

    return jwt.verify(token, Auth.secret) as AppPayload;
  }
  // CREAMOS UN METODO PARA VERIFICAR A TRAVES DE UN PARAMETRO TOKEN
  // HACEMOS LA GUARDA COMO EN EL METODO SIGN
  // DEVOLVEMOS EL TOKEN Y LA CONTRASEÑA A TRAVES DEL METODO VERIFY DE BCRYPT Y LA TIPAMOS CON EL TYPE QUE CREAMOS ANTES
}
