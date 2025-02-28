import type { APIRoute } from 'astro';
import { authenticateUser, generateToken } from '../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    let username = '';
    let password = '';

    // Log the content type for debugging
    const contentType = request.headers.get('content-type') || '';
    console.log('Request content type:', contentType);

    // Try to parse as JSON first
    if (contentType.includes('application/json')) {
      try {
        const body = await request.json();
        username = body.username || '';
        password = body.password || '';
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Invalid JSON format' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } else if (contentType.includes('application/x-www-form-urlencoded') || 
               contentType.includes('multipart/form-data')) {
      // Parse form data if the content type indicates form data
      try {
        const formData = await request.formData();
        username = formData.get('username')?.toString() || '';
        password = formData.get('password')?.toString() || '';
      } catch (error) {
        console.error('Error parsing form data:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Invalid form data' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } else {
      // If content type is not specified or not recognized, try to parse as JSON anyway
      // This handles cases where the content type header might be missing or incorrect
      try {
        console.log('Attempting to parse request as JSON despite content type...');
        const text = await request.text();
        console.log('Request body text:', text);
        
        if (text) {
          try {
            const body = JSON.parse(text);
            username = body.username || '';
            password = body.password || '';
            console.log('Successfully parsed JSON from request body');
          } catch (jsonError) {
            console.error('Failed to parse as JSON, trying URL params format:', jsonError);
            
            // Try parsing as URL-encoded form data
            const params = new URLSearchParams(text);
            username = params.get('username') || '';
            password = params.get('password') || '';
            
            if (username && password) {
              console.log('Successfully parsed as URL-encoded form data');
            } else {
              throw new Error('Could not parse request body in any format');
            }
          }
        } else {
          throw new Error('Empty request body');
        }
      } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Could not parse request data' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }
    
    // Log the received credentials (without the actual password)
    console.log(`Login attempt for username: ${username}, password provided: ${password ? 'yes' : 'no'}`);
    
    // If we still don't have credentials, return error
    if (!username || !password) {
      console.error('Missing credentials in request');
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing username or password' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Authenticate user
    const user = await authenticateUser(username, password);
    
    if (!user) {
      // Authentication failed
      console.log(`Authentication failed for user: ${username}`);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid username or password' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    console.log(`Authentication successful for user: ${username}`);
    
    // Return success response with auth token cookie
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Login successful'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};