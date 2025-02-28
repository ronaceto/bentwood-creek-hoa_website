import type { APIRoute } from 'astro';
import { requireAuth } from '../../../utils/auth';
import { updateDocument } from '../../../data/documents';

export const POST: APIRoute = async ({ request, redirect }) => {
  // Check authentication
  const user = requireAuth(request);
  if (user instanceof Response) {
    return user;
  }
  
  // Process form data
  const formData = await request.formData();
  const id = formData.get('id')?.toString() || '';
  const title = formData.get('title')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  let category = formData.get('category')?.toString() || '';
  const fileType = formData.get('fileType')?.toString() || '';
  const downloadUrl = formData.get('downloadUrl')?.toString() || '';
  
  // Check if it's a new category
  if (category === 'new') {
    const newCategory = formData.get('newCategory')?.toString();
    if (!newCategory) {
      return redirect(`/admin/documents/edit/${id}?error=New category name is required`, 302);
    }
    category = newCategory;
  }
  
  // Update document
  const updatedDocument = updateDocument(id, {
    title,
    description,
    category,
    fileType,
    downloadUrl
  });
  
  if (!updatedDocument) {
    return redirect('/admin/documents?error=Document not found', 302);
  }
  
  // Redirect back to documents list with success message
  return redirect('/admin/documents?success=Document updated successfully', 302);
};