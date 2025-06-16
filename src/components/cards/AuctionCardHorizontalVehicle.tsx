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
  // Formatar cidade e estado: "São Paulo/SP" -> "São Paulo, SP"
  const formatCityState = (location: string) => {
    return location.replace('/', ', ');
  };

  return (
    <div className="group w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-3 md:p-4 cursor-pointer">
      <div className="flex gap-3 md:gap-4 mb-3">
        <div className="relative h-[62px] md:h-[70px] w-20 md:w-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={imageUrl}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badge "Novo" sempre presente no DOM, mas controlado por visibilidade */}
          <div className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md shadow-sm transition-opacity duration-200 ${
            isNew ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            Novo
          </div>
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          {badge && (
            <span className="inline-block text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}

          <div className="flex items-start justify-between gap-2">
            {/* Área de texto com altura mínima fixa para evitar layout shift */}
            <div className="flex-1 min-w-0 min-h-[52px] flex flex-col justify-start">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-[13px] md:text-sm font-bold text-gray-900 leading-tight flex-shrink-0">
                  {brand}
                </h3>
                <span className="text-[13px] md:text-sm font-bold text-gray-900 leading-tight truncate">
                  {model}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-gray-600 mb-2">
                <span className="font-normal">{color}</span>
                <span className="text-gray-300">•</span>
                <span className="font-normal">{year}</span>
                <span className="text-gray-300">•</span>
                <span className="truncate font-normal">{formatCityState(cityState)}</span>
              </div>

              <div className="flex items-baseline gap-1.5 mt-auto">
                <span className="text-[15px] md:text-lg font-bold text-gray-900 leading-tight">
                  {price}
                </span>
                {discount && (
                  <span className="text-[10px] md:text-xs text-gray-500 line-through">
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
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
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

      <div className="h-px bg-gray-100 mb-3"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-[10px] md:text-xs bg-gray-50 text-gray-700 px-2 py-1 md:px-2.5 md:py-1 rounded-md font-medium border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {date && (
            <div className="text-[10px] md:text-xs text-gray-500 font-medium">
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
  )
}