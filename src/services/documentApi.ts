
export interface DocumentSummaryResponse {
  summary: string;
}

export const uploadDocument = async (file: File): Promise<DocumentSummaryResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

  try {
    const response = await fetch('https://summarizer-backend-vwaw.onrender.com/api/file', {
      method: 'POST',
      body: formData,
      mode: 'cors',
      credentials: 'omit',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Received data:', data);

    if (!data.summary) {
      throw new Error('No summary field in response');
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to the API server. Please ensure the server is running on https://summarizer-backend-vwaw.onrender.com/api/file');
    }
    
    throw error;
  }
};
