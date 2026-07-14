import { jwtVerify, SignJWT } from 'jose';

interface UserJwtPayload {
  jti: string;
  iat: number;
  userId: string;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    return "default_secret_key_for_development_only";
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new Error('Your token has expired.');
  }
};

export const signToken = async (userId: string) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  return token;
};
