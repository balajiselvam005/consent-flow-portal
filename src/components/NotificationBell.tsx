
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { consentsAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Consent } from '@/types';
import { useToast } from '@/hooks/use-toast';
import ConsentCard from './ConsentCard';

const NotificationBell = () => {
  const [pendingConsents, setPendingConsents] = useState<Consent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPendingConsents = async () => {
    if (!user) return;
    
    try {
      const response = await consentsAPI.getPendingConsentsForUser(user.id);
      setPendingConsents(response.data.data);
    } catch (error) {
      console.error('Error fetching pending consents:', error);
    }
  };

  useEffect(() => {
    fetchPendingConsents();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchPendingConsents, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleAccept = async (consentId: string) => {
    if (!user) return;
    
    try {
      await consentsAPI.acceptConsent(consentId, { userId: user.id });
      toast({
        title: "Success",
        description: "Collaboration invitation accepted!",
      });
      fetchPendingConsents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept invitation.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (consentId: string) => {
    if (!user) return;
    
    try {
      await consentsAPI.rejectConsent(consentId, { userId: user.id });
      toast({
        title: "Success",
        description: "Collaboration invitation rejected.",
      });
      fetchPendingConsents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject invitation.",
        variant: "destructive",
      });
    }
  };

  const unreadCount = pendingConsents.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Collaboration Invitations</h3>
          <p className="text-sm text-slate-600">
            {unreadCount} pending invitation{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {pendingConsents.length > 0 ? (
            <div className="p-2 space-y-2">
              {pendingConsents.map((consent) => (
                <ConsentCard
                  key={consent.id}
                  consent={consent}
                  showActions
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-500">
              No pending invitations
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
