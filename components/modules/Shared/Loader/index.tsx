import { Loader2Icon } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
        <Loader2Icon className="animate-spin h-6 w-6 mr-2" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
