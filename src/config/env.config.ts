export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || "";

// JWT_SECRET is required, throw an error if it's not set
export const JWT_SECRET =
  Bun.env.JWT_SECRET ||
  (() => {
    throw new Error("JWT_SECRET is required");
  })();
