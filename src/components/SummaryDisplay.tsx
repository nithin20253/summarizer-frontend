
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SummaryDisplayProps {
  summary: string;
  onReset: () => void;
}

export const SummaryDisplay = ({ summary, onReset }: SummaryDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-8 shadow-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Document Summary</h2>
            <p className="text-gray-600">AI-generated summary of your document</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Summary Content */}
      <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center text-gray-500 text-sm">
          <FileText className="w-4 h-4 mr-2" />
          <span>Summary generated using AI technology</span>
        </div>
      </div>
    </div>
  );
};
