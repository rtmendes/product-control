import { RevenueGoalsTracker } from '@/components/revenue/RevenueGoalsTracker';

export default function RevenueTracker() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Revenue Goals</h1>
      <RevenueGoalsTracker />
    </div>
  );
}
