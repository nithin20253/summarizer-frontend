
import { useMutation } from '@tanstack/react-query';
import { uploadDocument, DocumentSummaryResponse } from '@/services/documentApi';

export const useDocumentUpload = () => {
  return useMutation<DocumentSummaryResponse, Error, File>({
    mutationFn: uploadDocument,
    retry: (failureCount, error) => {
      // Don't retry network errors
      if (error.message.includes('Cannot connect to the API server')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1000,
  });
};
