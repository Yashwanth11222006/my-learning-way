import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Camera, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Download,
  Copy,
  Settings,
  Hand,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  Zap
} from 'lucide-react';

interface SignLanguageDetectorProps {
  onTextDetected?: (text: string) => void;
  onDetectionComplete?: (detection: any) => void;
}

interface DetectionResult {
  text: string;
  confidence: number;
  handLandmarks: any[];
  timestamp: Date;
  gesture: string;
}

const SignLanguageDetector = ({ onTextDetected, onDetectionComplete }: SignLanguageDetectorProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [currentGesture, setCurrentGesture] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    sensitivity: 0.7,
    language: 'asl',
    continuousMode: false,
    autoTranslate: true
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock gesture detection data (in real implementation, this would come from ML model)
  const mockGestureData = {
    'open_hand': { text: 'Hello', confidence: 0.9, gesture: 'Greeting' },
    'pointing_up': { text: 'Yes', confidence: 0.85, gesture: 'Affirmation' },
    'thumbs_up': { text: 'Good', confidence: 0.88, gesture: 'Positive' },
    'peace_sign': { text: 'Peace', confidence: 0.82, gesture: 'Peace' },
    'fist': { text: 'Stop', confidence: 0.87, gesture: 'Command' },
    'wave': { text: 'Goodbye', confidence: 0.91, gesture: 'Farewell' }
  };

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsDetecting(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
  };

  const startDetection = () => {
    if (!isCameraOn) {
      setError('Please start camera first');
      return;
    }

    setIsDetecting(true);
    setError(null);
    
    // Start continuous detection
    detectionIntervalRef.current = setInterval(() => {
      detectGesture();
    }, 1000); // Detect every second
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
  };

  const detectGesture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    
    // Simulate gesture detection (in real implementation, this would use ML model)
    setTimeout(() => {
      const gestures = Object.keys(mockGestureData);
      const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
      const gestureData = mockGestureData[randomGesture as keyof typeof mockGestureData];
      
      // Simulate confidence variation
      const confidenceVariation = Math.random() * 0.2 - 0.1;
      const finalConfidence = Math.max(0.5, Math.min(1.0, gestureData.confidence + confidenceVariation));
      
      if (finalConfidence > settings.sensitivity) {
        const detectionResult: DetectionResult = {
          text: gestureData.text,
          confidence: finalConfidence,
          handLandmarks: [],
          timestamp: new Date(),
          gesture: gestureData.gesture
        };

        setDetectedText(gestureData.text);
        setConfidence(finalConfidence);
        setCurrentGesture(gestureData.gesture);
        
        setDetectionHistory(prev => [detectionResult, ...prev.slice(0, 9)]);
        
        if (onTextDetected) {
          onTextDetected(gestureData.text);
        }
        
        if (onDetectionComplete) {
          onDetectionComplete(detectionResult);
        }
      }
      
      setIsProcessing(false);
    }, 500);
  }, [settings.sensitivity, onTextDetected, onDetectionComplete]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    return canvas.toDataURL('image/jpeg');
  };

  const copyDetectedText = () => {
    if (detectedText) {
      navigator.clipboard.writeText(detectedText);
    }
  };

  const downloadDetectionHistory = () => {
    const data = {
      detections: detectionHistory,
      settings: settings,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sign-detection-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetDetection = () => {
    setDetectedText('');
    setConfidence(0);
    setCurrentGesture('');
    setDetectionHistory([]);
    setError(null);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'bg-green-500';
    if (conf >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-6 w-6 text-primary" />
            <span>Sign Language Detector</span>
          </CardTitle>
          <CardDescription>
            Use your camera to detect sign language gestures and convert them to text in real-time
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Camera Section */}
      <Card>
        <CardHeader>
          <CardTitle>Camera Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            {/* Video Element */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
              />
              
              {/* Overlay for detection feedback */}
              {isDetecting && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Detecting gesture...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Hand className="h-6 w-6" />
                        <span>Ready to detect</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Detection indicator */}
              {currentGesture && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {currentGesture}
                </div>
              )}
            </div>
            
            {/* Hidden canvas for frame capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Camera Controls */}
          <div className="flex flex-wrap gap-3 justify-center">
            {!isCameraOn ? (
              <Button 
                onClick={startCamera}
                className="flex items-center space-x-2"
                variant="default"
              >
                <Camera className="h-4 w-4" />
                <span>Start Camera</span>
              </Button>
            ) : (
              <>
                <Button 
                  onClick={stopCamera}
                  className="flex items-center space-x-2"
                  variant="destructive"
                >
                  <VideoOff className="h-4 w-4" />
                  <span>Stop Camera</span>
                </Button>
                
                {!isDetecting ? (
                  <Button 
                    onClick={startDetection}
                    className="flex items-center space-x-2"
                    variant="default"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Detection</span>
                  </Button>
                ) : (
                  <Button 
                    onClick={stopDetection}
                    className="flex items-center space-x-2"
                    variant="secondary"
                  >
                    <Pause className="h-4 w-4" />
                    <span>Stop Detection</span>
                  </Button>
                )}
              </>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detection Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detection Results</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyDetectedText}
                disabled={!detectedText}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadDetectionHistory}
                disabled={detectionHistory.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDetection}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Detection */}
          {detectedText && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Detected Text:</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <div className={`w-3 h-3 rounded-full ${getConfidenceColor(confidence)}`} 
                       title={`${Math.round(confidence * 100)}%`} />
                </div>
              </div>
              <Input
                value={detectedText}
                onChange={(e) => setDetectedText(e.target.value)}
                className="text-lg font-medium"
                placeholder="No text detected yet..."
              />
              {currentGesture && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Gesture: {currentGesture}
                </div>
              )}
            </div>
          )}

          {/* Detection History */}
          {detectionHistory.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Detection History</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {detectionHistory.map((detection, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${getConfidenceColor(detection.confidence)}`} />
                      <span className="font-medium">{detection.text}</span>
                      <Badge variant="outline" className="text-xs">
                        {detection.gesture}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {detection.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Detection Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sensitivity</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={settings.sensitivity}
                  onChange={(e) => setSettings(prev => ({ ...prev, sensitivity: parseFloat(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">
                  {Math.round(settings.sensitivity * 100)}%
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sign Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              >
                <option value="asl">American Sign Language (ASL)</option>
                <option value="bsl">British Sign Language (BSL)</option>
                <option value="isl">Indian Sign Language (ISL)</option>
                <option value="auslan">Australian Sign Language</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Continuous Mode</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.continuousMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, continuousMode: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-muted-foreground">
                  Automatically detect gestures continuously
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Auto Translate</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.autoTranslate}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoTranslate: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-muted-foreground">
                  Automatically translate detected signs
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips and Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Tips for Better Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Camera Setup</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure good lighting conditions</li>
                <li>• Keep hands clearly visible in frame</li>
                <li>• Maintain steady hand positions</li>
                <li>• Use a plain background</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Gesture Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Make clear, deliberate movements</li>
                <li>• Hold gestures for 1-2 seconds</li>
                <li>• Keep fingers spread and visible</li>
                <li>• Face the camera directly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignLanguageDetector;
