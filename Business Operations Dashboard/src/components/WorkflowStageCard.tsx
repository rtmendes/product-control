import { useState } from 'react';
import { ChevronDown, ChevronUp, Link as LinkIcon, Upload, Plus, X, Tag, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { WorkflowStage, Resource, MediaFile } from '../App';

interface WorkflowStageCardProps {
  stage: WorkflowStage;
  onUpdate: (stage: WorkflowStage) => void;
}

const statusConfig = {
  'not-started': { label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-700' },
};

export function WorkflowStageCard({ stage, onUpdate }: WorkflowStageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newResourceUrl, setNewResourceUrl] = useState('');
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [newKnowledgeUrl, setNewKnowledgeUrl] = useState('');
  const [newKnowledgeTitle, setNewKnowledgeTitle] = useState('');
  const [showKnowledgeForm, setShowKnowledgeForm] = useState(false);

  const handleStatusChange = (status: WorkflowStage['status']) => {
    onUpdate({ ...stage, status });
  };

  const handleNotesChange = (notes: string) => {
    onUpdate({ ...stage, notes });
  };

  const addResource = () => {
    if (newResourceUrl.trim()) {
      const resource: Resource = {
        id: Date.now().toString(),
        url: newResourceUrl,
        title: newResourceTitle || newResourceUrl,
      };
      onUpdate({ ...stage, resources: [...stage.resources, resource] });
      setNewResourceUrl('');
      setNewResourceTitle('');
      setShowResourceForm(false);
    }
  };

  const removeResource = (id: string) => {
    onUpdate({ ...stage, resources: stage.resources.filter(r => r.id !== id) });
  };

  const addKnowledge = () => {
    if (newKnowledgeUrl.trim()) {
      const knowledge: Resource = {
        id: Date.now().toString(),
        url: newKnowledgeUrl,
        title: newKnowledgeTitle || newKnowledgeUrl,
      };
      onUpdate({ ...stage, knowledgeBase: [...stage.knowledgeBase, knowledge] });
      setNewKnowledgeUrl('');
      setNewKnowledgeTitle('');
      setShowKnowledgeForm(false);
    }
  };

  const removeKnowledge = (id: string) => {
    onUpdate({ ...stage, knowledgeBase: stage.knowledgeBase.filter(k => k.id !== id) });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: MediaFile[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      onUpdate({ ...stage, mediaFiles: [...stage.mediaFiles, ...newFiles] });
    }
  };

  const removeMediaFile = (id: string) => {
    onUpdate({ ...stage, mediaFiles: stage.mediaFiles.filter(f => f.id !== id) });
  };

  const addTag = () => {
    if (newTag.trim() && !stage.tags.includes(newTag.trim())) {
      onUpdate({ ...stage, tags: [...stage.tags, newTag.trim()] });
      setNewTag('');
      setShowTagForm(false);
    }
  };

  const removeTag = (tag: string) => {
    onUpdate({ ...stage, tags: stage.tags.filter(t => t !== tag) });
  };

  const statusInfo = statusConfig[stage.status];

  return (
    <Card className="border-l-4" style={{ borderLeftColor: stage.status === 'completed' ? '#22c55e' : stage.status === 'in-progress' ? '#3b82f6' : '#9ca3af' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
            <div className="flex-1">
              <h4>{stage.name}</h4>
            </div>
          </div>
          <Select value={stage.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Notes Section */}
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              placeholder="Add notes and ideas for this stage..."
              value={stage.notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={3}
            />
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Tags</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTagForm(!showTagForm)}
              >
                <Tag className="size-4 mr-2" />
                Add Tag
              </Button>
            </div>
            {showTagForm && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag}>Add</Button>
                <Button variant="outline" onClick={() => setShowTagForm(false)}>Cancel</Button>
              </div>
            )}
            {stage.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {stage.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Knowledge Base / SOPs Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <BookOpen className="size-4" />
                Knowledge Base & SOPs
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowKnowledgeForm(!showKnowledgeForm)}
              >
                <Plus className="size-4 mr-2" />
                Add SOP
              </Button>
            </div>
            {showKnowledgeForm && (
              <div className="space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Input
                  placeholder="SOP URL (Google Docs, Notion, etc.)..."
                  value={newKnowledgeUrl}
                  onChange={(e) => setNewKnowledgeUrl(e.target.value)}
                />
                <Input
                  placeholder="SOP title (e.g., 'How to setup Shopify store')..."
                  value={newKnowledgeTitle}
                  onChange={(e) => setNewKnowledgeTitle(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={addKnowledge}>Add to Knowledge Base</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowKnowledgeForm(false)}>Cancel</Button>
                </div>
              </div>
            )}
            {stage.knowledgeBase.length > 0 && (
              <div className="space-y-2">
                {stage.knowledgeBase.map((knowledge) => (
                  <div key={knowledge.id} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <BookOpen className="size-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <a
                        href={knowledge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline block truncate"
                      >
                        {knowledge.title}
                      </a>
                      <p className="text-xs text-gray-500 truncate">{knowledge.url}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKnowledge(knowledge.id)}
                    >
                      <X className="size-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Resources & Links</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResourceForm(!showResourceForm)}
              >
                <LinkIcon className="size-4 mr-2" />
                Add Link
              </Button>
            </div>
            {showResourceForm && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Resource URL..."
                  value={newResourceUrl}
                  onChange={(e) => setNewResourceUrl(e.target.value)}
                />
                <Input
                  placeholder="Resource title (optional)..."
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={addResource}>Add Resource</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowResourceForm(false)}>Cancel</Button>
                </div>
              </div>
            )}
            {stage.resources.length > 0 && (
              <div className="space-y-2">
                {stage.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <LinkIcon className="size-4 text-gray-500 flex-shrink-0" />
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-sm text-blue-600 hover:underline truncate"
                    >
                      {resource.title}
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeResource(resource.id)}
                    >
                      <X className="size-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Media Files Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Media Files</Label>
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Upload className="size-4 mr-2" />
                  Upload Files
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,video/*"
                  />
                </label>
              </Button>
            </div>
            {stage.mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stage.mediaFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Upload className="size-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeMediaFile(file.id)}
                    >
                      <X className="size-4" />
                    </Button>
                    <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}