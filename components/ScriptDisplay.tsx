
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, WarningIcon, LightBulbIcon } from './icons';

interface ScriptDisplayProps {
  script: string;
  isLoading: boolean;
  error: string | null;
}

export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (script) {
      navigator.clipboard.writeText(script);
      setCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
          <p className="mt-4 text-lg">AI 正在奋笔疾书...</p>
          <p className="text-sm">请稍候片刻</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 bg-red-900/20 p-4 rounded-lg">
          <WarningIcon className="w-12 h-12 mb-4"/>
          <p className="font-semibold text-lg">生成出错了</p>
          <p className="text-sm text-center">{error}</p>
        </div>
      );
    }
    if (script) {
      return (
        <div className="relative h-full">
            <button
                onClick={handleCopy}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Copy script"
            >
                {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
            <div className="h-full overflow-y-auto pr-8">
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {script}
                </p>
            </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <LightBulbIcon className="w-12 h-12 mb-4" />
        <p className="text-lg">您的文案将在这里出现</p>
        <p className="text-sm text-center">请在左侧填写产品信息并点击生成按钮。 </p>
      </div>
    );
  };

  return <div className="h-full">{renderContent()}</div>;
};
