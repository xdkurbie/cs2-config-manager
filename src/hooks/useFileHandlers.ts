import { useState } from 'react';

export function useFileHandlers() {
  const [isDragging, setIsDragging] = useState(false);

  const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, onFileRead: (content: string, filename: string) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(async (file) => {
      try {
        const content = await readFile(file);
        onFileRead(content, file.name);
      } catch (error) {
        console.error('Failed to read file:', error);
      }
    });
  };

  const importConfig = async (): Promise<{ content: string; filename: string } | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.cfg,.json';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            const content = await readFile(file);
            resolve({ content, filename: file.name });
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };

      input.click();
    });
  };

  return {
    isDragging,
    downloadFile,
    readFile,
    copyToClipboard,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    importConfig,
  };
}
