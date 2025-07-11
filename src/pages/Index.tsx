
import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { SummaryDisplay } from '@/components/SummaryDisplay';
import { FileText, Sparkles } from 'lucide-react';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';

const Index = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const documentUpload = useDocumentUpload();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await documentUpload.mutateAsync(file);
      setSummary(result.summary);
    } catch (error) {
      console.error('Upload failed:', error);
      // Error is handled by React Query
    }
  };

  const handleReset = () => {
    setSummary(null);
    documentUpload.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Document Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your documents into concise, intelligent summaries with the power of AI
          </p>
          
          <div className="flex justify-center items-center mt-6 text-gray-500">
            <Sparkles className="w-5 h-5 mr-2" />
            <span>Supports PDF, DOCX, and TXT files</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!summary && !documentUpload.isPending && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-8 shadow-xl">
              <FileUpload onFileUpload={handleFileUpload} isLoading={documentUpload.isPending} />
              
              {documentUpload.error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <p className="font-medium">Error:</p>
                  <p className="text-sm mt-1">{documentUpload.error.message}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-red-600">Technical details</summary>
                    <pre className="text-xs mt-1 bg-red-100 p-2 rounded overflow-auto">
                      {JSON.stringify({
                        message: documentUpload.error.message,
                        name: documentUpload.error.name,
                        stack: documentUpload.error.stack?.split('\n').slice(0, 3)
                      }, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          )}

          {documentUpload.isPending && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-12 shadow-xl text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-6"></div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Processing your document...</h3>
              <p className="text-gray-600">This may take a few moments</p>
            </div>
          )}

          {summary && (
            <SummaryDisplay summary={summary} onReset={handleReset} />
          )}
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">Support for PDF, DOCX, and TXT files</p>
          </div>
          
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered</h3>
            <p className="text-gray-600">Advanced algorithms for accurate summaries</p>
          </div>
          
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">Quick processing with consistent results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
