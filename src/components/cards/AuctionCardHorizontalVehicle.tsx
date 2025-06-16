import { ArrowUpRight, Heart } from 'lucide-react'

interface AuctionCardHorizontalVehicleProps {
  brand: string
  model: string
  color: string
  year: string
  cityState: string
  price: string
  badge?: string
  tags?: string[]
  date?: string
  imageUrl: string
  isFavorited?: boolean
  onToggleFavorite?: () => void
  onLink?: () => void
  discount?: string
  isNew?: boolean
}

export function AuctionCardHorizontalVehicle({
  brand,
  model,
  color,
  year,
  cityState,
  price,
  badge,
  tags,
  date,
  imageUrl,
  isFavorited = false,
  onToggleFavorite,
  onLink,
  discount,
  isNew,
}: AuctionCardHorizontalVehicleProps) {
  // Split city and state for better display
  const [city, state] = cityState.split('/');

  return (
    <div className="group w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-4 cursor-pointer">
      <div className="flex gap-4 mb-4">
        <div className="relative h-16 w-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={imageUrl}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isNew && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold uppercase px-2 py-1 rounded-lg shadow-sm">
              Novo
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          {badge && (
            <span className="inline-block text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              {badge}
            </span>
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Brand and Model - Brand never truncates, Model can */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-gray-900 flex-shrink-0">
                  {brand}
                </h3>
                <span className="text-base font-bold text-gray-900 truncate">
                  {model}
                </span>
              </div>
              
              {/* Vehicle details */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="font-medium">{color}</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium">{year}</span>
                <span className="text-gray-300">•</span>
                <span className="truncate">{city}</span>
                <span className="text-gray-300">•</span>
                <span className="flex-shrink-0 font-medium">{state}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {price}
                </span>
                {discount && (
                  <span className="text-sm text-gray-500 line-through">
                    {discount}
                  </span>
                )}
              </div>
            </div>

            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite()
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorited
                      ? 'fill-blue-500 text-blue-500'
                      : 'text-gray-400 hover:text-blue-500'
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-4"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {date && (
            <div className="text-sm text-gray-500 font-medium">
              {date}
            </div>
          )}
          {onLink && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onLink()
              }}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}