export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

const authConfig = (): JwtConfig => ({
  secret: process.env.JWT_SECRET ?? 'super-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN ?? '1d'
});

export default authConfig;
