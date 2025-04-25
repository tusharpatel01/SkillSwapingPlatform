import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

import { getSkillSwaps } from '../services/Skill.js';
import SkillCard from '../components/Dashboard/SkillCard.jsx';
import Profile from '../components/Dashboard/Profile.jsx';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [skillSwaps, setSkillSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    const fetchSkillSwaps = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getSkillSwaps(token);
        setSkillSwaps(response.data);
      } catch (error) {
        console.error('Error fetching skill swaps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillSwaps();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <Profile user={user} />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Navigation</h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'skills' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    My Skill Swaps
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Edit Profile
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'skills' ? (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Skill Swaps</h2>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    New Skill Swap
                  </button>
                </div>
                
                {skillSwaps.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No skill swaps yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new skill swap.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {skillSwaps.map((swap) => (
                      <SkillCard key={swap._id} swap={swap} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
                {/* Profile edit form would go here */}
                <p className="text-gray-500">Profile editing functionality coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;