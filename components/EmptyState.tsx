export default function EmptyState({ title = 'No results', hint }: { title?: string; hint?: string }) {
  return (
    <div className="rounded border p-8 text-center">
      <p className="text-lg font-medium">{title}</p>
      {hint && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
}
