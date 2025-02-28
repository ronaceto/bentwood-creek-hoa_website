import type { APIRoute } from 'astro';
import { requireAuth } from '../../../utils/auth';
import { addDocument } from '../../../data/documents';

export const POST: APIRoute = async ({ request, redirect }) => {
  // Check authentication
  const user = requireAuth(request);
  if (user instanceof Response) {
    return user;
  }
  
  // Process form data
  const formData = await request.formData();
  const title = formData.get('title')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  let category = formData.get('category')?.toString() || '';
  const fileType = formData.get('fileType')?.toString() || '';
  const downloadUrl = formData.get('downloadUrl')?.toString() || '';
  
  // Check if it's a new category
  if (category === 'new') {
    const newCategory = formData.get('newCategory')?.toString();
    if (!newCategory) {
      return redirect('/admin/documents/new?error=New category name is required', 302);
    }
    category = newCategory;
  }
  
  // Create new document
  addDocument({
    title,
    description,
    category,
    fileType,
    downloadUrl
  });
  
  // Redirect back to documents list with success message
  return redirect('/admin/documents?success=Document added successfully', 302);
};