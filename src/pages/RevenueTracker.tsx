import { RevenueTracker as RevenueTrackerComponent } from '@/components/revenue/RevenueTracker';

export default function RevenueTracker() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Revenue Tracker</h1>
        <p className="text-slate-600 mt-2">Monitor your revenue and track goals</p>
      </div>
      <RevenueTrackerComponent />
    </div>
  );
}
