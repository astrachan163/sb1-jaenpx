import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Scan, Camera, Upload } from 'lucide-react';

const QRCodePage: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scanner with simplified config
    if (scannerDivRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 2,
          videoConstraints: {
            facingMode: { ideal: "environment" }
          }
        },
        false
      );

      // Start scanning
      scannerRef.current.render(
        (decodedText) => {
          handleSuccess(decodedText);
        },
        (errorMessage) => {
          handleError(errorMessage);
        }
      );
    }

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear()
            .catch(() => {
              // If clear fails, manually remove scanner elements
              const scannerElement = document.getElementById('qr-reader');
              if (scannerElement) {
                while (scannerElement.firstChild) {
                  scannerElement.removeChild(scannerElement.firstChild);
                }
              }
            });
        } catch (error) {
          console.error('Scanner cleanup error:', error);
        }
      }
    };
  }, []);

  const handleSuccess = (decodedText: string) => {
    setResult(decodedText);
    setError(null);
    setScanning(false);
    
    if (scannerRef.current) {
      try {
        scannerRef.current.pause();
      } catch (error) {
        console.error('Error pausing scanner:', error);
      }
    }
  };

  const handleError = (errorMessage: string) => {
    if (errorMessage?.includes('NotFoundError')) {
      setError('Camera not found. Please ensure you have a camera connected or try uploading an image.');
      setScanning(false);
    } else if (errorMessage?.includes('NotAllowedError')) {
      setError('Camera permission denied. Please allow camera access or try uploading an image.');
      setScanning(false);
    } else if (!errorMessage?.includes('No QR code detected') && 
              !errorMessage?.includes('No MultiFormat Readers')) {
      setError(errorMessage);
      setScanning(false);
    } else {
      setScanning(true);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setScanning(true);

      const html5QrCode = new Html5Qrcode("qr-reader");
      const decodedText = await html5QrCode.scanFile(file, true);
      
      handleSuccess(decodedText);
      html5QrCode.clear();
    } catch (err) {
      setError('Could not read QR code from image. Please try another image or use the camera.');
      setScanning(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setScanning(false);
    
    if (scannerRef.current) {
      try {
        scannerRef.current.resume();
        scannerRef.current.render(
          (decodedText) => handleSuccess(decodedText),
          (errorMessage) => handleError(errorMessage)
        );
      } catch (error) {
        console.error('Error resetting scanner:', error);
        // If reset fails, reload the page
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            QR Code Scanner
          </span>
        </h1>

        <div className="max-w-md mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Scan className="text-cyan-400" size={24} />
              <h2 className="text-xl font-semibold">Scan QR Code</h2>
            </div>

            {!result && (
              <>
                <div className="mb-6">
                  <div id="qr-reader" ref={scannerDivRef} className="rounded-lg overflow-hidden"></div>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="hidden"
                    id="qr-file-input"
                  />
                  <label
                    htmlFor="qr-file-input"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <Upload size={18} className="text-cyan-400" />
                    <span>Upload QR Code Image</span>
                  </label>
                </div>
              </>
            )}

            {error && (
              <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {scanning && !error && !result && (
              <div className="p-4 mb-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center gap-2">
                <Camera className="text-cyan-400 animate-pulse" size={20} />
                <p className="text-cyan-400">Searching for QR code...</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h3 className="text-lg font-medium text-cyan-400 mb-2">Scanned Result:</h3>
                  <p className="text-gray-300 break-all">{result}</p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Scan Another Code
                </button>
              </div>
            )}

            {!result && !error && (
              <p className="mt-4 text-sm text-gray-400 text-center">
                Position the QR code within the frame to scan, or upload an image
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;