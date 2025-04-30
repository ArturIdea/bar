export default function BenefitsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 flex justify-between bg-white animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="p-1 bg-gray-200 rounded-full mt-[6px]" />
            <div>
              <div className="w-64 h-5 bg-gray-200 rounded mb-2" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-gray-200 rounded" />
                <div className="border-r-2 h-3" />
                <div className="w-14 h-5 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-100 rounded-xl w-[87px] py-2 px-4">
            <div className="w-12 h-5 bg-gray-200 rounded mb-2" />
            <div className="w-12 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
