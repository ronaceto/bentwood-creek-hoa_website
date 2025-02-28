import type { APIRoute } from 'astro';
import { requireAuth } from '../../../utils/auth';
import { deleteDocument } from '../../../data/documents';

export const POST: APIRoute = async ({ request, redirect }) => {
  // Check authentication
  const user = requireAuth(request);
  if (user instanceof Response) {
    return user;
  }
  
  // Process form data
  const formData = await request.formData();
  const id = formData.get('id')?.toString() || '';
  
  // Delete document
  const success = deleteDocument(id);
  
  if (!success) {
    return redirect('/admin/documents?error=Document not found', 302);
  }
  
  // Redirect back to documents list with success message
  return redirect('/admin/documents?success=Document deleted successfully', 302);
};