import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { CS2Config } from '../types/config';
import { formatConfig, validateConfig, generateConfigFile } from '../lib/configParser';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface RawConfigEditorProps {
  config: CS2Config;
  onUpdate: (rawConfig: string) => void;
}

export function RawConfigEditor({ config, onUpdate }: RawConfigEditorProps) {
  const [content, setContent] = useState(config.rawConfig || '');
  const [validation, setValidation] = useState<{ valid: boolean; errors: string[] }>({
    valid: true,
    errors: [],
  });

  const handleEditorChange = (value: string | undefined) => {
    const newContent = value || '';
    setContent(newContent);
    onUpdate(newContent);

    const result = validateConfig(newContent);
    setValidation(result);
  };

  const handleFormat = () => {
    const formatted = formatConfig(content);
    setContent(formatted);
    onUpdate(formatted);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to the auto-generated config?')) {
      const generated = generateConfigFile(config);
      setContent(generated);
      onUpdate(generated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Raw .cfg Editor</h3>
        <div className="flex space-x-2">
          <button onClick={handleFormat} className="button button-secondary">
            <RefreshCw size={18} />
            <span>Format</span>
          </button>
          <button onClick={handleReset} className="button button-secondary">
            Reset to Generated
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {validation.valid ? (
            <div className="flex items-center space-x-1 text-green-500">
              <CheckCircle size={16} />
              <span className="text-sm">Valid config</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-red-500">
              <XCircle size={16} />
              <span className="text-sm">{validation.errors.length} error(s)</span>
            </div>
          )}
        </div>

        {!validation.valid && validation.errors.length > 0 && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-red-400 mb-2">Validation Errors:</h4>
            <ul className="space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index} className="text-xs text-red-300">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card">
        <Editor
          height="600px"
          language="plaintext"
          theme="vs-dark"
          value={content}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Tips</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Use <code className="px-2 py-1 bg-[#0f0f0f] rounded">bind "key" "command"</code> to create key binds</li>
          <li>• Lines starting with <code className="px-2 py-1 bg-[#0f0f0f] rounded">//</code> are comments</li>
          <li>• Use the Format button to clean up your config</li>
          <li>• Reset to Generated will overwrite your changes with auto-generated content</li>
          <li>• Changes here are reflected in all other tabs</li>
        </ul>
      </div>
    </div>
  );
}
