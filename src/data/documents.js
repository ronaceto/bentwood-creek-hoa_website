// This file simulates a database for documents
// In a real application, this would be stored in a database

let documents = [
  {
    id: "1",
    title: "HOA Bylaws",
    description: "The official bylaws governing the Bentwood Creek Homeowners Association.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "January 15, 2025",
    category: "Governing Documents"
  },
  {
    id: "2",
    title: "Community Guidelines",
    description: "Rules and guidelines for maintaining property standards and community harmony.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "February 10, 2025",
    category: "Governing Documents"
  },
  {
    id: "3",
    title: "Architectural Review Form",
    description: "Form required for submitting property modifications for approval.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "March 5, 2025",
    category: "Forms"
  },
  {
    id: "4",
    title: "Pool Rules",
    description: "Rules and regulations for using the community pool facilities.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "April 1, 2025",
    category: "Guidelines"
  },
  {
    id: "5",
    title: "Q1 2025 Financial Statement",
    description: "Financial report for the first quarter of 2025.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "April 15, 2025",
    category: "Financial Documents"
  },
  {
    id: "6",
    title: "March 2025 Board Meeting Minutes",
    description: "Minutes from the March 2025 HOA board meeting.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "March 25, 2025",
    category: "Meeting Minutes"
  },
  {
    id: "7",
    title: "Landscaping Guidelines",
    description: "Guidelines for landscaping and yard maintenance.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "February 20, 2025",
    category: "Guidelines"
  },
  {
    id: "8",
    title: "New Resident Welcome Packet",
    description: "Information packet for new residents of Bentwood Creek.",
    fileType: "pdf",
    downloadUrl: "#",
    date: "January 30, 2025",
    category: "Information"
  }
];

export function getAllDocuments() {
  return [...documents];
}

export function getDocumentById(id) {
  return documents.find(doc => doc.id === id);
}

export function addDocument(document) {
  const newDocument = {
    id: String(documents.length + 1),
    ...document,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };
  
  documents.push(newDocument);
  return newDocument;
}

export function updateDocument(id, updatedDocument) {
  const index = documents.findIndex(doc => doc.id === id);
  
  if (index === -1) {
    return null;
  }
  
  documents[index] = {
    ...documents[index],
    ...updatedDocument,
    id // Ensure ID doesn't change
  };
  
  return documents[index];
}

export function deleteDocument(id) {
  const index = documents.findIndex(doc => doc.id === id);
  
  if (index === -1) {
    return false;
  }
  
  documents.splice(index, 1);
  return true;
}

export function getDocumentsByCategory() {
  const documentsByCategory = {};
  
  documents.forEach(doc => {
    if (!documentsByCategory[doc.category]) {
      documentsByCategory[doc.category] = [];
    }
    documentsByCategory[doc.category].push(doc);
  });
  
  return documentsByCategory;
}

// Add this function to generate static paths for dynamic routes
export function getDocumentPaths() {
  return documents.map(doc => ({
    params: { id: doc.id }
  }));
}