
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { templatesAPI } from '@/lib/api';
import { Template } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Copy, Calendar, User, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [cloneTitle, setCloneTitle] = useState('');
  const { toast } = useToast();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = categoryFilter === 'all' ? {} : { category: categoryFilter };
      const response = await templatesAPI.getTemplates(params);
      setTemplates(response.data.data.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load templates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [categoryFilter]);

  const handleCloneTemplate = async (templateId: string) => {
    if (!cloneTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the new contract.",
        variant: "destructive",
      });
      return;
    }

    try {
      await templatesAPI.cloneTemplate(templateId, cloneTitle);
      toast({
        title: "Success",
        description: "Template cloned successfully! Check your dashboard.",
      });
      setCloneTitle('');
      setSelectedTemplate(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clone template. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'music', label: 'Music & Audio' },
    { value: 'visual', label: 'Visual Arts' },
    { value: 'video', label: 'Video & Film' },
    { value: 'photography', label: 'Photography' },
    { value: 'writing', label: 'Writing & Content' },
    { value: 'general', label: 'General' },
  ];

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
            Contract Templates
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our collection of pre-made contract templates or create custom agreements for your projects.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 max-w-lg mx-auto"
        >
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
                  <div className="h-8 bg-slate-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {templates.map((template) => (
              <motion.div key={template.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2">
                        {template.title}
                      </CardTitle>
                      <Badge variant="outline" className="capitalize text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 flex flex-col h-full">
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Created by Admin</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
                          <DialogHeader>
                            <DialogTitle>{template.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                              <p className="text-sm text-slate-600">{template.description}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 mb-2">Template Content</h4>
                              <div className="bg-slate-50 p-4 rounded-lg">
                                <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                                  {template.content}
                                </pre>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Enter title for new contract..."
                                value={cloneTitle}
                                onChange={(e) => setCloneTitle(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                onClick={() => handleCloneTemplate(template.id)}
                                disabled={!cloneTitle.trim()}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Clone
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedTemplate(template);
                              setCloneTitle(template.title + ' - Copy');
                            }}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Clone
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Clone Template</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-slate-600">
                              Create a new contract based on "{template.title}" template.
                            </p>
                            <Input
                              placeholder="Enter title for new contract..."
                              value={cloneTitle}
                              onChange={(e) => setCloneTitle(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedTemplate(null);
                                  setCloneTitle('');
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleCloneTemplate(template.id)}
                                disabled={!cloneTitle.trim()}
                              >
                                Create Contract
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {templates.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Copy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No templates found</h3>
            <p className="text-slate-500">
              {categoryFilter === 'all' 
                ? 'No templates are available at the moment.'
                : 'No templates found in this category. Try selecting a different category.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Templates;
