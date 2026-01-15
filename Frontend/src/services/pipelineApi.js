// API service for pipeline operations

const API_BASE_URL = 'http://localhost:8000';

export const submitPipeline = async (nodes, edges) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting pipeline:', error);
    throw error;
  }
};