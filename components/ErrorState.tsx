export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded border p-6 text-center">
      <p className="mb-3 font-medium">Something went wrong.</p>
      <button onClick={onRetry} className="rounded border px-3 py-1 hover:bg-gray-100 dark:hover:bg-neutral-800">
        Retry
      </button>
    </div>
  );
}
