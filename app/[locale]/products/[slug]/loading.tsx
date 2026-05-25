export default function Loading() {
  return (
    <main>
      <div className="mx-auto max-w-7xl animate-pulse px-6 pt-28 md:pt-32 lg:px-10">
        <div className="mb-6 h-4 w-48 rounded-full bg-slate-100" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-10 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="aspect-square w-full rounded-2xl bg-slate-100" />
            <div className="mt-4 flex gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 w-20 rounded-xl bg-slate-100 md:h-24 md:w-24" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-3 w-16 rounded-full bg-slate-100" />
            <div className="mt-4 h-10 w-3/4 rounded bg-slate-100" />
            <div className="mt-3 h-10 w-1/2 rounded bg-slate-100" />
            <div className="mt-6 flex items-baseline gap-3">
              <div className="h-10 w-32 rounded bg-slate-100" />
              <div className="h-5 w-20 rounded bg-slate-100" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-3 w-32 rounded-full bg-slate-100" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 rounded-xl bg-slate-100" />
                <div className="h-24 rounded-xl bg-slate-100" />
              </div>
            </div>
            <div className="mt-8 h-14 rounded-full bg-slate-100" />
            <div className="mt-3 h-12 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
