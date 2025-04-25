import { useState } from 'react';
import { PencilIcon, CheckIcon, XIcon } from '@heroicons/react/outline';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    skillsOffered: user?.skillsOffered?.join(', ') || '',
    skillsWanted: user?.skillsWanted?.join(', ') || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Here you would typically call an API to update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
    
    // Convert comma-separated strings back to arrays
    const updatedUser = {
      ...formData,
      skillsOffered: formData.skillsOffered.split(',').map(skill => skill.trim()),
      skillsWanted: formData.skillsWanted.split(',').map(skill => skill.trim())
    };
    
    console.log('Formatted data for API:', updatedUser);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:text-green-800"
              title="Save"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-red-600 hover:text-red-800"
              title="Cancel"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Edit"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills I Offer</label>
            <input
              type="text"
              name="skillsOffered"
              value={formData.skillsOffered}
              onChange={handleChange}
              placeholder="Comma separated list (e.g., React, Node.js, Graphic Design)"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills I Want</label>
            <input
              type="text"
              name="skillsWanted"
              value={formData.skillsWanted}
              onChange={handleChange}
              placeholder="Comma separated list (e.g., Photography, Spanish, Cooking)"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
            {user?.bio && <p className="mt-1 text-gray-600">{user.bio}</p>}
          </div>
          
          {user?.skillsOffered?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Skills I Offer</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.skillsOffered.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {user?.skillsWanted?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Skills I Want</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.skillsWanted.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;