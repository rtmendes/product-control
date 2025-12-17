import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Image as ImageIcon, Video } from 'lucide-react';

interface AssetSpec {
  name: string;
  dimensions: string;
  aspectRatio: string;
  fileFormats: string[];
  maxFileSize: string;
  notes?: string;
}

interface PlatformSpecs {
  platform: string;
  icon: React.ReactNode;
  color: string;
  images: AssetSpec[];
  videos: AssetSpec[];
}

const socialMediaSpecs: PlatformSpecs[] = [
  {
    platform: 'Facebook',
    icon: <Facebook className="size-4" />,
    color: 'bg-blue-600',
    images: [
      {
        name: 'Profile Picture',
        dimensions: '180 x 180px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '10MB',
        notes: 'Displays at 170x170 on desktop, 128x128 on mobile',
      },
      {
        name: 'Cover Photo',
        dimensions: '820 x 312px',
        aspectRatio: '2.7:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '10MB',
        notes: 'Displays at 820x312 on desktop, 640x360 on mobile',
      },
      {
        name: 'Shared Image',
        dimensions: '1200 x 630px',
        aspectRatio: '1.91:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '8MB',
        notes: 'Ideal for link previews and shared posts',
      },
      {
        name: 'Event Cover Photo',
        dimensions: '1920 x 1080px',
        aspectRatio: '16:9',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '10MB',
      },
      {
        name: 'Story',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '4MB',
        notes: '24-hour duration',
      },
    ],
    videos: [
      {
        name: 'Feed Video',
        dimensions: '1280 x 720px (min)',
        aspectRatio: '16:9, 9:16, 1:1, 4:5',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '10GB',
        notes: 'Max length: 240 min, Recommended: 1-3 min',
      },
      {
        name: 'Story Video',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '4GB',
        notes: 'Max length: 120 sec',
      },
      {
        name: 'Reel',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '4GB',
        notes: 'Max length: 90 sec',
      },
    ],
  },
  {
    platform: 'Instagram',
    icon: <Instagram className="size-4" />,
    color: 'bg-pink-600',
    images: [
      {
        name: 'Profile Picture',
        dimensions: '320 x 320px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '10MB',
        notes: 'Displays as 110x110',
      },
      {
        name: 'Feed Post (Square)',
        dimensions: '1080 x 1080px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '30MB',
        notes: 'Most popular format',
      },
      {
        name: 'Feed Post (Portrait)',
        dimensions: '1080 x 1350px',
        aspectRatio: '4:5',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '30MB',
        notes: 'Takes more screen space',
      },
      {
        name: 'Feed Post (Landscape)',
        dimensions: '1080 x 566px',
        aspectRatio: '1.91:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '30MB',
      },
      {
        name: 'Story / Reel',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '30MB',
        notes: 'Stories last 24 hours',
      },
      {
        name: 'Carousel',
        dimensions: '1080 x 1080px',
        aspectRatio: '1:1 recommended',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '30MB',
        notes: 'Up to 10 images per post',
      },
    ],
    videos: [
      {
        name: 'Feed Video',
        dimensions: '1080 x 1080px',
        aspectRatio: '1:1, 4:5, 16:9',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '4GB',
        notes: 'Min: 3 sec, Max: 60 min',
      },
      {
        name: 'Story Video',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '4GB',
        notes: 'Max length: 60 sec',
      },
      {
        name: 'Reel',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '4GB',
        notes: 'Max length: 90 sec, Min: 3 sec',
      },
      {
        name: 'IGTV',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16 or 16:9',
        fileFormats: ['MP4'],
        maxFileSize: '5.4GB',
        notes: 'Min: 60 sec, Max: 60 min',
      },
    ],
  },
  {
    platform: 'YouTube',
    icon: <Youtube className="size-4" />,
    color: 'bg-red-600',
    images: [
      {
        name: 'Channel Icon',
        dimensions: '800 x 800px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG', 'GIF'],
        maxFileSize: '4MB',
        notes: 'Displays at 98x98',
      },
      {
        name: 'Channel Banner',
        dimensions: '2560 x 1440px',
        aspectRatio: '16:9',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '6MB',
        notes: 'Safe area: 1546x423, Min: 2048x1152',
      },
      {
        name: 'Thumbnail',
        dimensions: '1280 x 720px',
        aspectRatio: '16:9',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '2MB',
        notes: 'Min width: 640px',
      },
      {
        name: 'Community Post',
        dimensions: '1200 x 900px',
        aspectRatio: '4:3',
        fileFormats: ['JPG', 'PNG', 'GIF'],
        maxFileSize: '16MB',
      },
      {
        name: 'Shorts Thumbnail',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '2MB',
      },
    ],
    videos: [
      {
        name: 'Standard Video',
        dimensions: '1920 x 1080px',
        aspectRatio: '16:9',
        fileFormats: ['MP4', 'MOV', 'AVI', 'FLV', 'WMV'],
        maxFileSize: '256GB',
        notes: 'Max length: 12 hours. 4K: 3840x2160, 8K: 7680x4320',
      },
      {
        name: 'YouTube Shorts',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '256GB',
        notes: 'Max length: 60 sec',
      },
      {
        name: 'Vertical Video',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '256GB',
      },
    ],
  },
  {
    platform: 'TikTok',
    icon: <ImageIcon className="size-4" />,
    color: 'bg-black',
    images: [
      {
        name: 'Profile Picture',
        dimensions: '200 x 200px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '20MB',
      },
      {
        name: 'Video Cover',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '20MB',
      },
    ],
    videos: [
      {
        name: 'TikTok Video',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '287.6MB (iOS), 72MB (Android)',
        notes: 'Max length: 10 min, Recommended: 21-34 sec',
      },
    ],
  },
  {
    platform: 'LinkedIn',
    icon: <Linkedin className="size-4" />,
    color: 'bg-blue-700',
    images: [
      {
        name: 'Profile Picture',
        dimensions: '400 x 400px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '8MB',
        notes: 'Min: 300x300',
      },
      {
        name: 'Background Photo',
        dimensions: '1584 x 396px',
        aspectRatio: '4:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '8MB',
      },
      {
        name: 'Company Logo',
        dimensions: '300 x 300px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '4MB',
      },
      {
        name: 'Company Cover Image',
        dimensions: '1128 x 191px',
        aspectRatio: '4:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '4MB',
      },
      {
        name: 'Shared Link Image',
        dimensions: '1200 x 627px',
        aspectRatio: '1.91:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '5MB',
      },
      {
        name: 'Blog Post Image',
        dimensions: '1200 x 627px',
        aspectRatio: '1.91:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '5MB',
      },
    ],
    videos: [
      {
        name: 'Feed Video',
        dimensions: '1920 x 1080px',
        aspectRatio: '16:9, 1:1, 9:16, 2:3',
        fileFormats: ['MP4', 'MOV', 'AVI'],
        maxFileSize: '5GB',
        notes: 'Min: 3 sec, Max: 30 min',
      },
      {
        name: 'LinkedIn Story',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '5GB',
        notes: 'Max length: 20 sec',
      },
    ],
  },
  {
    platform: 'Twitter/X',
    icon: <Twitter className="size-4" />,
    color: 'bg-sky-500',
    images: [
      {
        name: 'Profile Picture',
        dimensions: '400 x 400px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG', 'GIF'],
        maxFileSize: '10MB',
        notes: 'Min: 200x200',
      },
      {
        name: 'Header Photo',
        dimensions: '1500 x 500px',
        aspectRatio: '3:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '5MB',
      },
      {
        name: 'In-stream Photo',
        dimensions: '1600 x 900px',
        aspectRatio: '16:9',
        fileFormats: ['JPG', 'PNG', 'GIF', 'WEBP'],
        maxFileSize: '5MB',
        notes: 'Can use 2:1, 3:4, 16:9 ratios',
      },
      {
        name: 'Twitter Card',
        dimensions: '800 x 418px',
        aspectRatio: '1.91:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '5MB',
        notes: 'For link sharing',
      },
    ],
    videos: [
      {
        name: 'Tweet Video',
        dimensions: '1920 x 1080px',
        aspectRatio: '16:9, 1:1, 9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '512MB',
        notes: 'Max length: 2 min 20 sec',
      },
    ],
  },
  {
    platform: 'Pinterest',
    icon: <ImageIcon className="size-4" />,
    color: 'bg-red-600',
    images: [
      {
        name: 'Profile Picture',
        dimensions: '165 x 165px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '10MB',
      },
      {
        name: 'Standard Pin',
        dimensions: '1000 x 1500px',
        aspectRatio: '2:3',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '32MB',
        notes: 'Ideal aspect ratio for feed',
      },
      {
        name: 'Square Pin',
        dimensions: '1000 x 1000px',
        aspectRatio: '1:1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '32MB',
      },
      {
        name: 'Long Pin',
        dimensions: '1000 x 2100px',
        aspectRatio: '1:2.1',
        fileFormats: ['JPG', 'PNG'],
        maxFileSize: '32MB',
        notes: 'Max recommended height',
      },
    ],
    videos: [
      {
        name: 'Standard Video Pin',
        dimensions: '1000 x 1500px',
        aspectRatio: '2:3, 1:1, 9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '2GB',
        notes: 'Min: 4 sec, Max: 15 min',
      },
      {
        name: 'Idea Pin Video',
        dimensions: '1080 x 1920px',
        aspectRatio: '9:16',
        fileFormats: ['MP4', 'MOV'],
        maxFileSize: '2GB',
        notes: 'Max: 60 sec per page, up to 20 pages',
      },
    ],
  },
];

export function SocialMediaAssetSpecs() {
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook');

  const currentPlatform = socialMediaSpecs.find(p => p.platform === selectedPlatform);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="size-5" />
          Social Media Asset Specifications
        </CardTitle>
        <p className="text-sm text-gray-600">
          Complete reference guide for image and video specifications across all major social platforms
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2">
            {socialMediaSpecs.map((platform) => (
              <Button
                key={platform.platform}
                variant={selectedPlatform === platform.platform ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPlatform(platform.platform)}
                className="gap-2"
              >
                {platform.icon}
                {platform.platform}
              </Button>
            ))}
          </div>

          {/* Platform Content */}
          {currentPlatform && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg text-white ${currentPlatform.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  {currentPlatform.icon}
                  <h3 className="font-semibold text-lg">{currentPlatform.platform} Specifications</h3>
                </div>
                <p className="text-sm opacity-90">
                  {currentPlatform.images.length} image formats • {currentPlatform.videos.length} video formats
                </p>
              </div>

              <Tabs defaultValue="images">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="images" className="gap-2">
                    <ImageIcon className="size-4" />
                    Images ({currentPlatform.images.length})
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="gap-2">
                    <Video className="size-4" />
                    Videos ({currentPlatform.videos.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="images" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {currentPlatform.images.map((spec, index) => (
                        <Card key={index} className="border-2">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-lg">{spec.name}</h4>
                                <Badge variant="secondary">{spec.aspectRatio}</Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-600">Dimensions:</span>
                                  <p className="font-medium">{spec.dimensions}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Aspect Ratio:</span>
                                  <p className="font-medium">{spec.aspectRatio}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">File Formats:</span>
                                  <div className="flex gap-1 mt-1">
                                    {spec.fileFormats.map(format => (
                                      <Badge key={format} variant="outline" className="text-xs">
                                        {format}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Max File Size:</span>
                                  <p className="font-medium">{spec.maxFileSize}</p>
                                </div>
                              </div>

                              {spec.notes && (
                                <div className="p-2 bg-blue-50 rounded text-sm text-blue-900">
                                  💡 {spec.notes}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="videos" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {currentPlatform.videos.map((spec, index) => (
                        <Card key={index} className="border-2">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-lg">{spec.name}</h4>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                  VIDEO
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-600">Dimensions:</span>
                                  <p className="font-medium">{spec.dimensions}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Aspect Ratio:</span>
                                  <p className="font-medium">{spec.aspectRatio}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">File Formats:</span>
                                  <div className="flex gap-1 mt-1 flex-wrap">
                                    {spec.fileFormats.map(format => (
                                      <Badge key={format} variant="outline" className="text-xs">
                                        {format}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Max File Size:</span>
                                  <p className="font-medium">{spec.maxFileSize}</p>
                                </div>
                              </div>

                              {spec.notes && (
                                <div className="p-2 bg-purple-50 rounded text-sm text-purple-900">
                                  🎬 {spec.notes}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Quick Reference Card */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2">
            <CardContent className="pt-4">
              <h4 className="font-medium mb-3">📋 Quick Tips for Asset Creation</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Always create assets at the <strong>maximum recommended size</strong> for best quality</li>
                <li>✓ Use <strong>PNG for graphics/logos</strong> (transparency), <strong>JPG for photos</strong></li>
                <li>✓ Export videos in <strong>H.264 codec</strong> for best compatibility</li>
                <li>✓ Keep text readable: minimum <strong>14pt font</strong> for mobile viewing</li>
                <li>✓ Leave <strong>safe margins</strong> - avoid placing important content at edges</li>
                <li>✓ Test on mobile devices - most social media traffic is mobile</li>
                <li>✓ Optimize file sizes without sacrificing quality (use compression tools)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
