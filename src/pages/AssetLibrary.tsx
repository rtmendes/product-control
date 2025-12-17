export default function AssetLibrary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Asset Library</h1>
        <p className="text-slate-600 mt-2">Browse and manage your AI-generated assets</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Assets Yet</h3>
          <p className="text-slate-600 mb-6">
            Start creating products to generate AI-powered images, copy, and other marketing assets.
          </p>
          <a
            href="/create-product"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Create Your First Product
          </a>
        </div>
      </div>
    </div>
  );
}
