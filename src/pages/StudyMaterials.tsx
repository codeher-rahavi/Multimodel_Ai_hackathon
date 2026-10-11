import { useState } from 'react';
import {
  Upload,
  FileText,
  Presentation,
  Video,
  Trash2,
  Eye,
  FolderOpen,
  File,
  AlertCircle,
  CheckCircle,
  Loader2,
  Filter,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { demoStudyMaterials } from '@/data/demoData';
import type { StudyMaterial } from '@/types';

const typeConfig = {
  pdf: { icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', label: 'PDF Document' },
  slides: { icon: Presentation, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Presentation' },
  video: { icon: Video, color: 'text-brand-600', bg: 'bg-brand-50', label: 'Video Lecture' },
};

type FilterType = 'all' | 'pdf' | 'slides' | 'video';

export function StudyMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>(demoStudyMaterials);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done'>('idle');

  const filteredMaterials = filter === 'all' ? materials : materials.filter((m) => m.type === filter);

  const counts = {
    all: materials.length,
    pdf: materials.filter((m) => m.type === 'pdf').length,
    slides: materials.filter((m) => m.type === 'slides').length,
    video: materials.filter((m) => m.type === 'video').length,
  };

  const handleUpload = () => {
    // DEMO: Simulates an upload flow. No real file processing happens.
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('done');
      setTimeout(() => setUploadStatus('idle'), 2000);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const filterTabs: { id: FilterType; label: string; icon: typeof Filter }[] = [
    { id: 'all', label: 'All Files', icon: FolderOpen },
    { id: 'pdf', label: 'PDFs', icon: FileText },
    { id: 'slides', label: 'Slides', icon: Presentation },
    { id: 'video', label: 'Videos', icon: Video },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Demo notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/50">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Demo Mode</p>
          <p className="text-xs text-amber-700 mt-0.5">
            File upload is simulated. No files are actually uploaded, stored, or processed.
            This will be connected to real storage and document processing in the backend step.
          </p>
        </div>
      </div>

      {/* Upload zone */}
      <Card className="p-0 overflow-hidden">
        <div
          onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload(); }}
          className={`p-8 lg:p-12 text-center transition-all duration-200 ${
            isDragging ? 'bg-brand-50 border-2 border-dashed border-brand-400' : 'border-2 border-dashed border-slate-300'
          }`}
        >
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-colors ${
            isDragging ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400'
          }`}>
            {uploadStatus === 'uploading' ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : uploadStatus === 'done' ? (
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'done' ? 'Upload complete!' : 'Upload Study Materials'}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            {uploadStatus === 'idle'
              ? 'Drag and drop your files here, or click to browse'
              : uploadStatus === 'uploading'
              ? 'Processing your file...'
              : 'Your file has been added to your library'}
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge color="red" size="sm">PDF</Badge>
            <Badge color="amber" size="sm">PPTX</Badge>
            <Badge color="brand" size="sm">MP4</Badge>
          </div>
          <Button onClick={handleUpload} disabled={uploadStatus === 'uploading'} icon={<Upload className="w-4 h-4" />}>
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Browse Files'}
          </Button>
        </div>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {(['pdf', 'slides', 'video'] as const).map((type) => {
          const config = typeConfig[type];
          const Icon = config.icon;
          const count = counts[type];
          return (
            <Card key={type} className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 tabular-nums">{count}</p>
                <p className="text-xs text-slate-500">{config.label}s</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Materials list */}
      <Card>
        <CardHeader
          title="Your Library"
          subtitle={`${materials.length} files uploaded`}
          icon={<FolderOpen className="w-5 h-5" />}
          action={
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      filter === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{counts[tab.id]}</span>
                    <span className="hidden sm:inline text-slate-400">({counts[tab.id]})</span>
                  </button>
                );
              })}
            </div>
          }
        />
        <div className="divide-y divide-slate-100">
          {filteredMaterials.length === 0 ? (
            <div className="p-12 text-center">
              <File className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No files in this category</p>
            </div>
          ) : (
            filteredMaterials.map((material) => {
              const config = typeConfig[material.type];
              const Icon = config.icon;
              return (
                <div key={material.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors group">
                  <div className={`w-11 h-11 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{material.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge color="brand" size="sm">{material.topic}</Badge>
                      <span className="text-[11px] text-slate-400">{material.size}</span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-slate-400">{material.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
