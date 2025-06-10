import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl top-1/4 left-1/4"></div>
        <div className="absolute w-64 h-64 rounded-full blur-2xl bottom-1/4 right-1/4"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* 404 Large Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-black text-white font-semibold rounded-lg  shadow-md"
          >
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </div>
          </button>

          <button
            onClick={handleGoBack}
            className="px-8 py-4 bg-white border-2 border-gray-300 shadow-md"
          >
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </div>
          </button>

          <button
            onClick={handleRefresh}
            className="px-8 py-4 bg-white border-2 border-gray-300 shadow-md"
          >
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5" />
              <span>Refresh</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}