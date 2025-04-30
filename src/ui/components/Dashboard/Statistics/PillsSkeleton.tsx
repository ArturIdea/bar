export default function PillsSkeleton() {
  return (
    <div className="px-6">
      <div className="bg-gray-100 p-3 rounded-full flex gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white animate-pulse"
          >
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-20 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
