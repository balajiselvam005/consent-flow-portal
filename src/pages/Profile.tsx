import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { usersAPI, consentsAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { User, Consent } from '@/types';
import ConsentCard from '@/components/ConsentCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Mail, Calendar, MapPin, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CollaborationModal from '@/components/CollaborationModal';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);
  const { toast } = useToast();

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const userResponse = await usersAPI.getUserProfile(id);
        setUser(userResponse.data.data);

        if (isOwnProfile) {
          const dashboardResponse = await usersAPI.getUserDashboard(id);
          setDashboardData(dashboardResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, isOwnProfile]);

  const handleAcceptConsent = async (consentId: string) => {
    try {
      await consentsAPI.acceptConsent(consentId);
      toast({
        title: "Success",
        description: "Consent accepted successfully.",
      });
      
      // Refresh dashboard data
      if (id) {
        const dashboardResponse = await usersAPI.getUserDashboard(id);
        setDashboardData(dashboardResponse.data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept consent.",
        variant: "destructive",
      });
    }
  };

  const handleRejectConsent = async (consentId: string) => {
    try {
      await consentsAPI.rejectConsent(consentId);
      toast({
        title: "Success",
        description: "Consent rejected successfully.",
      });
      
      // Refresh dashboard data
      if (id) {
        const dashboardResponse = await usersAPI.getUserDashboard(id);
        setDashboardData(dashboardResponse.data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject consent.",
        variant: "destructive",
      });
    }
  };

  const handleInviteToCollaborate = () => {
    setShowCollaborationModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="bg-slate-200 h-32 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-200 h-64 rounded-lg"></div>
              <div className="lg:col-span-2 bg-slate-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">User Not Found</h1>
          <p className="text-slate-600">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.name}</h1>
                      <div className="flex items-center space-x-4 text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={user.role === 'artist' ? 'default' : 'secondary'}
                        className="capitalize text-sm px-3 py-1"
                      >
                        {user.role}
                      </Badge>
                      {user.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{user.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {user.industry && (
                    <div className="flex items-center space-x-1 text-slate-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{user.industry}</span>
                    </div>
                  )}
                  
                  {user.bio && (
                    <p className="text-slate-700 leading-relaxed mb-4">{user.bio}</p>
                  )}

                  {/* Invite to Collaborate Button */}
                  {!isOwnProfile && currentUser && (
                    <Button
                      onClick={handleInviteToCollaborate}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite to Collaborate
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dashboard (only for own profile) */}
        {isOwnProfile && dashboardData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Your Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ongoing" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="ongoing">
                      Ongoing ({dashboardData.ongoingContracts?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="pending">
                      Pending ({dashboardData.contractsToAccept?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="waiting">
                      Waiting ({dashboardData.waitingForAcceptance?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="hold">
                      On Hold ({dashboardData.onHoldContracts?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed ({dashboardData.completedContracts?.length || 0})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ongoing" className="space-y-4">
                    {dashboardData.ongoingContracts?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.ongoingContracts.map((consent: Consent) => (
                          <ConsentCard key={consent.id} consent={consent} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center py-8">No ongoing contracts</p>
                    )}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4">
                    {dashboardData.contractsToAccept?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.contractsToAccept.map((consent: Consent) => (
                          <ConsentCard
                            key={consent.id}
                            consent={consent}
                            showActions
                            onAccept={handleAcceptConsent}
                            onReject={handleRejectConsent}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center py-8">No pending contracts to review</p>
                    )}
                  </TabsContent>

                  <TabsContent value="waiting" className="space-y-4">
                    {dashboardData.waitingForAcceptance?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.waitingForAcceptance.map((consent: Consent) => (
                          <ConsentCard key={consent.id} consent={consent} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center py-8">No contracts waiting for acceptance</p>
                    )}
                  </TabsContent>

                  <TabsContent value="hold" className="space-y-4">
                    {dashboardData.onHoldContracts?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.onHoldContracts.map((consent: Consent) => (
                          <ConsentCard key={consent.id} consent={consent} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center py-8">No contracts on hold</p>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4">
                    {dashboardData.completedContracts?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.completedContracts.map((consent: Consent) => (
                          <ConsentCard key={consent.id} consent={consent} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center py-8">No completed contracts</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Public Profile View */}
        {!isOwnProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              {user.role === 'artist' ? 'Artist' : 'Company'} Profile
            </h2>
            <p className="text-slate-500">
              Connect with {user.name} to start collaborating on amazing projects.
            </p>
          </motion.div>
        )}

        {/* Collaboration Modal */}
        {showCollaborationModal && user && (
          <CollaborationModal
            isOpen={showCollaborationModal}
            onClose={() => setShowCollaborationModal(false)}
            targetUser={user}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
