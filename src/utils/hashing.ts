export const hashPassword = async (password: string): Promise<string> => {
  const hashed = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 12,
  });
  return hashed;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await Bun.password.verify(password, hashedPassword);
  return isMatch;
};
