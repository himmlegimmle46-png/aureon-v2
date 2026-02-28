export default function AdminStockPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 grid gap-6">
      <h1 className="text-2xl font-semibold">Stock Admin</h1>

      <form action="/api/admin/stock" method="post" className="grid gap-3">
        <input
          name="adminKey"
          placeholder="Admin key"
          className="rounded-xl bg-white/5 border border-white/10 p-3"
        />
        <input
          name="sku"
          placeholder="SKU (e.g. rust-0-100)"
          className="rounded-xl bg-white/5 border border-white/10 p-3"
        />
        <textarea
          name="keys"
          placeholder="Paste keys or account info (one per line)"
          className="rounded-xl bg-white/5 border border-white/10 p-3 min-h-[200px]"
        />
        <button className="rounded-xl bg-white text-black font-semibold p-3">Add Stock</button>
      </form>

      <p className="text-white/60 text-sm">
        Tip: Keep this page private and set STOCK_ENCRYPTION_KEY for encrypted-at-rest stock.
      </p>
    </div>
  );
}