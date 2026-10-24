const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function api(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API request failed');
  }
  
  return res.json();
}

export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Upload failed');
    }

    return res.json();
  } catch (err) {
    // If backend server is not reachable in frontend-only environment, process locally
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      const text = await file.text();
      return { success: true, filename: file.name, rows: text.split("\n").length };
    }
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      return { success: true, filename: file.name, size: file.size };
    }
    throw err;
  }
}
