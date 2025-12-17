import { Rocket, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onBackToDashboard: () => void;
  showBack: boolean;
}

export function Header({ onBackToDashboard, showBack }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
        {showBack && (
          <Button variant="ghost" size="sm" onClick={onBackToDashboard}>
            <ArrowLeft className="size-4 mr-2" />
            Dashboard
          </Button>
        )}
        <div className="flex items-center gap-3">
          <div className="size-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Rocket className="size-6 text-white" />
          </div>
          <div>
            <h1>LaunchFlow</h1>
            <p className="text-sm text-gray-600">Product Launch Workflow Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
