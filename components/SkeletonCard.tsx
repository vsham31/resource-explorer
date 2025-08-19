export default function SkeletonCard() {
  return (
    <div className="flex gap-3 rounded border p-3 animate-pulse">
      <div className="h-20 w-20 rounded bg-gray-200 dark:bg-neutral-800" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-neutral-800" />
        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-neutral-800" />
        <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
