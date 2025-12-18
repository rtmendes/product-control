import { AIPromptsTable } from '@/components/prompts/AIPromptsTable';

export default function AIPrompts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Image Prompts</h1>
        <p className="text-slate-600 mt-2">
          Create and manage AI-generated images for your print-on-demand products
        </p>
      </div>
      <AIPromptsTable />
    </div>
  );
}
