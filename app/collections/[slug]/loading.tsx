export default function Loading() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl animate-pulse px-6 pb-24 pt-28 md:pt-32 lg:px-10">
        <div className="mb-6 h-4 w-32 rounded-full bg-slate-100" />
        <div className="h-3 w-20 rounded-full bg-slate-100" />
        <div className="mt-4 h-12 w-2/3 max-w-xl rounded bg-slate-100" />
        <div className="mt-5 h-5 w-3/4 max-w-2xl rounded bg-slate-100" />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-square w-full rounded-2xl bg-slate-100" />
              <div className="mt-4 h-3 w-16 rounded-full bg-slate-100" />
              <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />
              <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
              <div className="mt-3 h-5 w-24 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
