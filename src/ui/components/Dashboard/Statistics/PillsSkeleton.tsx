export default function PillsSkeleton() {
  return (
    <div className="px-6">
      <div className="bg-[#ADD9F4] p-2 rounded-full flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="group relative inline-block">
            <div className="flex items-center space-x-2 px-4 py-3 rounded-full bg-white min-w-[150px] animate-pulse">
              {/* dot */}
              <div className="w-4 h-4 bg-gray-200 rounded-full" />
              {/* text */}
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
