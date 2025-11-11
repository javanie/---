
import React, { useState, useCallback } from 'react';
import { ProductInputForm } from './components/ProductInputForm';
import { ScriptDisplay } from './components/ScriptDisplay';
import { generateViralScript } from './services/geminiService';
import type { ProductDetails } from './types';
import { MagicWandIcon } from './components/icons';

const App: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    productName: '',
    targetAudience: '',
    keyFeatures: '',
    uniqueSellingProposition: '',
  });
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScript = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript('');
    try {
      const script = await generateViralScript(productDetails);
      setGeneratedScript(script);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [productDetails]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <MagicWandIcon className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              爆款短视频文案生成器
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            输入您的产品信息，AI 将为您创作一个吸引客户留言询价的病毒式视频口播稿。
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
            <ProductInputForm
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              onGenerate={handleGenerateScript}
              isLoading={isLoading}
            />
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 min-h-[300px]">
            <ScriptDisplay
              script={generatedScript}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Viral Script Generator. Powered by AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
