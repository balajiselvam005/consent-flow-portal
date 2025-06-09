
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { consentsAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Consent } from '@/types';
import ConsentCard from '@/components/ConsentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SentInvitations = () => {
  const [sentInvitations, setSentInvitations] = useState<Consent[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSentInvitations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await consentsAPI.getSentInvitations(user.id);
      setSentInvitations(response.data.data);
    } catch (error) {
      console.error('Error fetching sent invitations:', error);
      toast({
        title: "Error",
        description: "Failed to load sent invitations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentInvitations();
  }, [user]);

  const handleDelete = async (consentId: string) => {
    try {
      await consentsAPI.deleteConsent(consentId);
      toast({
        title: "Success",
        description: "Invitation deleted successfully.",
      });
      fetchSentInvitations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete invitation.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sent Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Sent Invitations ({sentInvitations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {sentInvitations.length > 0 ? (
            <div className="space-y-4">
              {sentInvitations.map((consent) => (
                <div key={consent.id} className="relative">
                  <ConsentCard consent={consent} />
                  {consent.status === 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(consent.id)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">
              No sent invitations yet.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SentInvitations;
