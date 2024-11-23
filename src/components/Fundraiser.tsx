import React from 'react';
import { ShoppingBag, ExternalLink, Package } from 'lucide-react';
import { useFundraiserStore } from '../store/fundraiserStore';

const Fundraiser: React.FC = () => {
  const { totalOrders, goalOrders } = useFundraiserStore();
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScKz6Z5iEpewR-z6dZ92j6QLnPrXJJm1y2sZ-iwfWxM2km-eA/viewform";
  
  const progressPercentage = Math.min((totalOrders / goalOrders) * 100, 100);

  const handleOrderClick = () => {
    // Open form in new tab
    window.open(formUrl, '_blank');
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80" 
                alt="3D Printed Christmas Ornaments" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Support Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Fundraiser</span>
            </h2>
            
            <p className="text-gray-300 text-lg">
              Help support our program by purchasing beautiful 3D printed Christmas ornaments. Each purchase directly contributes to our educational initiatives.
            </p>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Package size={16} className="text-cyan-400" />
                  Ornaments Ordered
                </span>
                <span className="text-cyan-400">{totalOrders} / {goalOrders}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              {progressPercentage >= 100 && (
                <p className="text-green-400 text-sm">Goal reached! Thank you for your support!</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOrderClick}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="group-hover:scale-110 transition-transform" />
                Order Now
                <ExternalLink size={16} className="opacity-75" />
              </button>

              <a 
                href="#fundraiser-details"
                className="px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div id="fundraiser-details" className="mt-20 bg-gray-800/50 rounded-lg p-8 border border-cyan-500/20">
          <h3 className="text-2xl font-bold mb-6">
            About Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Fundraiser</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-cyan-400">Custom Designs</h4>
              <p className="text-gray-300">
                Each ornament is uniquely designed and 3D printed with care. Choose from various designs or request a custom piece.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-cyan-400">Supporting Education</h4>
              <p className="text-gray-300">
                100% of proceeds go directly to supporting our educational programs and student initiatives.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-cyan-400">Sustainable Materials</h4>
              <p className="text-gray-300">
                We use eco-friendly PLA materials, making our ornaments both beautiful and environmentally conscious.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-cyan-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-1/2 w-px h-20 bg-gradient-to-t from-cyan-500 to-transparent opacity-50"></div>
    </section>
  );
};

export default Fundraiser;