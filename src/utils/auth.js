import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// In a real application, this would be stored in a database
// For this demo, we'll use a hardcoded admin user
const ADMIN_USER = {
  username: 'admin',
  // This is a hashed version of 'password123'
  passwordHash: '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T2TloO1MYj52',
  role: 'admin'
};

// Secret key for JWT signing - in production, use an environment variable
const JWT_SECRET = 'bentwood-creek-hoa-secret-key';

export function generateToken(user) {
  // Create a JWT token that expires in 24 hours
  return jwt.sign(
    { 
      username: user.username,
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
}

export async function authenticateUser(username, password) {
  console.log(`Authenticating user: ${username}`);
  
  // In a real app, you would look up the user in a database
  if (username !== ADMIN_USER.username) {
    console.log('Username not found');
    return null;
  }

  try {
    // Compare the provided password with the stored hash
    console.log('Comparing password hash...');
    const passwordMatch = await bcrypt.compare(password, ADMIN_USER.passwordHash);
    
    if (!passwordMatch) {
      console.log('Password does not match');
      return null;
    }

    console.log('Authentication successful');
    // Return user without the password hash
    return {
      username: ADMIN_USER.username,
      role: ADMIN_USER.role
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function isAuthenticated(request) {
  const cookies = request.headers.get('cookie');
  if (!cookies) {
    return null;
  }

  const tokenCookie = cookies
    .split(';')
    .find(cookie => cookie.trim().startsWith('token='));

  if (!tokenCookie) {
    return null;
  }

  const token = tokenCookie.split('=')[1];
  return verifyToken(token);
}

export function requireAuth(request) {
  const user = isAuthenticated(request);
  if (!user) {
    return new Response('Unauthorized', {
      status: 302,
      headers: {
        'Location': '/admin/login'
      }
    });
  }
  return user;
}