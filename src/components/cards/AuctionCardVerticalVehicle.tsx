import { ArrowUpRight, Heart } from 'lucide-react'

interface AuctionCardVerticalVehicleProps {
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

export function AuctionCardVerticalVehicle({
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
}: AuctionCardVerticalVehicleProps) {
  // Formatar cidade e estado: "São Paulo/SP" -> "São Paulo, SP"
  const formatCityState = (location: string) => {
    return location.replace('/', ', ');
  };

  return (
    <div className="group w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-4 cursor-pointer">
      <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={imageUrl}
          alt={`${brand} ${model}`}
          className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge "Novo" sempre presente no DOM, mas controlado por visibilidade */}
        <div className={`absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold uppercase px-2.5 py-1 rounded-lg shadow-sm transition-opacity duration-200 ${
          isNew ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          Novo
        </div>
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl transition-all duration-200 active:scale-95"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited
                  ? 'fill-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            />
          </button>
        )}
      </div>

      <div className="space-y-1 min-h-[75px] flex flex-col">
        {badge && (
          <span className="inline-block text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            {badge}
          </span>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-0">
            <h3 className="text-lg md:text-base font-bold text-gray-900 flex-shrink-0">
              {brand}
            </h3>
            <span className="text-lg md:text-base font-bold text-gray-900 truncate">
              {model}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm md:text-xs text-gray-600 mb-2">
            <span className="font-normal">{color}</span>
            <span className="text-gray-300">•</span>
            <span className="font-normal">{year}</span>
            <span className="text-gray-300">•</span>
            <span className="truncate font-normal">{formatCityState(cityState)}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-3 mt-auto">
            <span className="text-xl md:text-lg font-bold text-gray-900">
              {price}
            </span>
            {discount && (
              <span className="text-sm md:text-xs text-gray-500 line-through">
                {discount}
              </span>
            )}
          </div>
        </div>

        <div className="h-px bg-gray-100"></div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-wrap gap-1.5">
            {tags && tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg font-medium border border-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {date && (
              <div className="text-xs text-gray-500 font-medium">
                {date}
              </div>
            )}
            {onLink && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLink()
                }}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}