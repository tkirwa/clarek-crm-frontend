// authUtils.ts
import jwt from 'jsonwebtoken';

// Function to decode the JWT token and extract user information
export const decodeToken = (token: string): { userId: string; username: string } | null => {
  try {
    // Replace 'your-secret-key' with the actual secret key used to sign the token
    const decoded = jwt.verify(token, 'your-secret-key') as { userId: string; username: string };
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
