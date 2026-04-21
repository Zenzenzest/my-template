export const ToastUpdate = ({
  onUpdate,
}: {
  onUpdate: () => void;
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[#101828] border border-gray-600 text-gray-300 p-4 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Update Available!</h3>
          </div>
         
        </div>

        <div className="mt-3 flex justify-end space-x-2">
          <button
            onClick={onUpdate}
            className="px-3 py-1.5 text-sm bg-[#1e314d] text-[#51a2ff] font-medium rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
};
