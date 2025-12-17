import { RevenueGoalsTracker } from '@/components/revenue/RevenueGoalsTracker';

export default function RevenueTracker() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Revenue Goals</h1>
        <RevenueGoalsTracker />
      </div>
    </div>
  );
}
