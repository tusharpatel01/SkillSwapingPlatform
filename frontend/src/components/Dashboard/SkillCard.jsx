import { ClockIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const SkillCard = ({ swap }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {swap.skillOffered} for {swap.skillWanted}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            swap.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : swap.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-blue-100 text-blue-800'
          }`}>
            {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
          </span>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
          <span>With: {swap.user2.name}</span>
        </div>
        
        {swap.scheduledDate && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
            <span>
              Scheduled: {new Date(swap.scheduledDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            View Details
          </button>
          <button className="px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;