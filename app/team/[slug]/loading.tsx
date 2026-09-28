export default function TeamProfileLoading() {
  return (
    <main className="min-h-screen bg-background px-4 py-28 text-foreground sm:px-6 sm:py-36">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <div className="mx-auto size-56 rounded-full bg-muted lg:mx-0" />
          <div>
            <div className="h-6 w-48 rounded bg-muted" />
            <div className="mt-5 h-12 max-w-lg rounded bg-muted" />
            <div className="mt-6 h-20 max-w-3xl rounded bg-muted" />
          </div>
        </div>
      </div>
    </main>
  )
}
