
import React from 'react';
import type { ProductDetails } from '../types';
import { MagicWandIcon, SpinnerIcon } from './icons';

interface ProductInputFormProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const FormField: React.FC<{
  id: keyof ProductDetails;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}> = ({ id, label, placeholder, value, onChange, isTextArea = false }) => {
  const commonProps = {
    id,
    name: id,
    placeholder,
    value,
    onChange,
    className: "w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-200 outline-none"
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {isTextArea ? (
        <textarea {...commonProps} rows={3}></textarea>
      ) : (
        <input type="text" {...commonProps} />
      )}
    </div>
  );
};

export const ProductInputForm: React.FC<ProductInputFormProps> = ({
  productDetails,
  setProductDetails,
  onGenerate,
  isLoading,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <FormField
        id="productName"
        label="产品名称 (必填)"
        placeholder="例如：AI智能降噪耳机"
        value={productDetails.productName}
        onChange={handleChange}
      />
      <FormField
        id="targetAudience"
        label="目标用户 (必填)"
        placeholder="例如：经常需要开线上会议的职场人士"
        value={productDetails.targetAudience}
        onChange={handleChange}
      />
      <FormField
        id="keyFeatures"
        label="核心卖点 (必填)"
        placeholder="例如：一键消除背景噪音；30小时超长续航；佩戴舒适"
        value={productDetails.keyFeatures}
        onChange={handleChange}
        isTextArea
      />
      <FormField
        id="uniqueSellingProposition"
        label="独特优势 (选填)"
        placeholder="例如：市面上唯一一款支持方言识别的降噪耳机"
        value={productDetails.uniqueSellingProposition}
        onChange={handleChange}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-purple-600/30"
      >
        {isLoading ? (
          <>
            <SpinnerIcon className="w-5 h-5 animate-spin" />
            正在生成...
          </>
        ) : (
          <>
            <MagicWandIcon className="w-5 h-5" />
            生成爆款文案
          </>
        )}
      </button>
    </div>
  );
};
