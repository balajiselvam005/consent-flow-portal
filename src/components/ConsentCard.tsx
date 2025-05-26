
import { motion } from 'framer-motion';
import { Consent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';

interface ConsentCardProps {
  consent: Consent;
  showActions?: boolean;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onClick?: () => void;
}

const ConsentCard = ({ consent, showActions, onAccept, onReject, onClick }: ConsentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on-hold':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'waiting_acceptance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`hover:shadow-md transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1">
              {consent.title}
            </CardTitle>
            <Badge className={`${getStatusColor(consent.status)} capitalize text-xs`}>
              {consent.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-slate-600 line-clamp-2 mb-4">
            {consent.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{consent.involvedUsers.length} participants</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(consent.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {showActions && (consent.status === 'pending' || consent.status === 'waiting_acceptance') && (
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.(consent.id);
                }}
                className="flex-1"
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.(consent.id);
                }}
                className="flex-1"
              >
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConsentCard;
