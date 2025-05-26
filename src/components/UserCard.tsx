
import { motion } from 'framer-motion';
import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300"
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-slate-900 truncate">
                {user.name}
              </h3>
              
              {user.industry && (
                <p className="text-sm text-slate-600 mb-2">{user.industry}</p>
              )}
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant={user.role === 'artist' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
                
                {user.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{user.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {user.bio && (
            <p className="mt-4 text-sm text-slate-600 line-clamp-2">
              {user.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserCard;
