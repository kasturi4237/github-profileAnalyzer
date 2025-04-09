import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, ExternalLink, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

// Define TypeScript interfaces
interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface CommitData {
  date: string;
  commits: number;
}

const GitHubProfileAnalyzer: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchUserData = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setRepositories([]);
    setCommitData([]);

    try {
      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      
      if (!reposResponse.ok) {
        throw new Error(`GitHub API Error: ${reposResponse.status}`);
      }
      
      const repos = await reposResponse.json();
      setRepositories(repos);
      
      // Generate sample commit data (as we can't directly get commit data without multiple API calls)
      generateSampleCommitData();
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
    }
  };

  const generateSampleCommitData = () => {
    // Generate past 30 days of sample data
    const data: CommitData[] = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        commits: Math.floor(Math.random() * 12)
      });
    }
    
    setCommitData(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold text-slate-900">GitHub Profile Analyzer</h1>
          <p className="text-slate-500 mt-2">Analyze any GitHub user's repositories and activity</p>
        </header>
        
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="pl-10 pr-4 py-2 rounded-md border border-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Analyze'}
          </button>
        </form>
        
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {repositories.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4">Repositories ({repositories.length})</h2>
              <div className="space-y-4">
                {repositories.slice(0, 10).map((repo) => (
                  <div key={repo.id} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-blue-600">{repo.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">{repo.description || 'No description provided'}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">⭐ {repo.stargazers_count}</span>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">🍴 {repo.forks_count}</span>
                          {repo.language && (
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{repo.language}</span>
                          )}
                        </div>
                      </div>
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
                {repositories.length > 10 && (
                  <p className="text-sm text-center text-slate-500">
                    + {repositories.length - 10} more repositories
                  </p>
                )}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4">Daily Commits (Last 30 Days)</h2>
              <div className="h-64">
                {/* <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={commitData}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => date.substring(5)} 
                      interval={4}
                    />
                    <YAxis />
                    <Tooltip labelFormatter={(date) => `Date: ${date}`} />
                    <Line 
                      type="monotone" 
                      dataKey="commits" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer> */}
              </div>
              <p className="text-xs text-center text-slate-500 mt-4">
                Note: This is sample data. In a real application, actual commit data would be fetched from GitHub's API.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubProfileAnalyzer;