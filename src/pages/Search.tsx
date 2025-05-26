
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usersAPI } from '@/lib/api';
import { User } from '@/types';
import UserCard from '@/components/UserCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || 'all');
  const [industryFilter, setIndustryFilter] = useState(searchParams.get('industry') || 'all');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const performSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const filters = {
        role: roleFilter === 'all' ? undefined : roleFilter,
        industry: industryFilter === 'all' ? undefined : industryFilter,
      };
      
      const response = await usersAPI.searchUsers(query, filters);
      setResults(response.data.data);
      
      // Update URL params
      const params = new URLSearchParams();
      params.set('q', query);
      if (roleFilter !== 'all') params.set('role', roleFilter);
      if (industryFilter !== 'all') params.set('industry', industryFilter);
      setSearchParams(params);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  useEffect(() => {
    if (searchParams.get('q')) {
      performSearch();
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Find Your Perfect Collaborator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Search for talented artists and innovative companies to work with on your next project.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by name, skills, or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="artist">Artists</SelectItem>
                      <SelectItem value="company">Companies</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="visual-arts">Visual Arts</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button type="submit" disabled={loading || !query.trim()} className="px-8">
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search Results */}
        {query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Search Results for "{query}"
              </h2>
              <span className="text-slate-600">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {results.map((user) => (
                  <motion.div key={user.id} variants={itemVariants}>
                    <UserCard
                      user={user}
                      onClick={() => navigate(`/profile/${user.id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <SearchIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No results found</h3>
                <p className="text-slate-500">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Initial State */}
        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12"
          >
            <SearchIcon className="w-24 h-24 text-slate-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              Start Your Search
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Enter keywords, names, or skills to find the perfect collaborators for your next project.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
