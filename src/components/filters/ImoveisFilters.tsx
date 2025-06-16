import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { FormatToggle } from "./FormatToggle"
import { MultiToggleGrid } from "./MultiToggleGrid"
import { getEstadosOptions, getMunicipiosOptions, fetchMunicipiosByEstado, Municipio } from "../../utils/ibgeApi"

interface ImoveisFiltersState {
  estado: string
  cidade: string
  area: [number, number]
  valor: [number, number]
  formato: string
  origem: string[]
  etapa: string[]
}

interface ImoveisFiltersProps {
  filters: ImoveisFiltersState
  onFiltersChange: (filters: Partial<ImoveisFiltersState>) => void
}

export const ImoveisFilters: React.FC<ImoveisFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const [municipios, setMunicipios] = React.useState<Municipio[]>([])
  const [loadingMunicipios, setLoadingMunicipios] = React.useState(false)

  // Carregar municípios quando o estado mudar
  React.useEffect(() => {
    if (filters.estado) {
      setLoadingMunicipios(true)
      fetchMunicipiosByEstado(filters.estado)
        .then(setMunicipios)
        .catch(error => {
          console.error('Erro ao carregar municípios:', error)
          setMunicipios([])
        })
        .finally(() => setLoadingMunicipios(false))
    } else {
      setMunicipios([])
    }
  }, [filters.estado])

  const estados = getEstadosOptions()
  const cidades = getMunicipiosOptions(municipios)

  const origemOptions = [
    { value: "judicial", label: "Judicial" },
    { value: "extrajudicial", label: "Extrajudicial" },
    { value: "particular", label: "Particular" },
    { value: "publico", label: "Público" }
  ]

  const etapaOptions = [
    { value: "praca-unica", label: "Praça única" },
    { value: "primeira", label: "1ª Praça" },
    { value: "segunda", label: "2ª Praça" },
    { value: "terceira", label: "3ª Praça" }
  ]

  const isVendaDireta = filters.formato === "venda-direta"

  return (
    <div className="space-y-6">
      {/* Localização */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Localização
        </label>
        <div className="grid grid-cols-1 gap-2">
          <ComboBoxSearch
            options={estados}
            value={filters.estado}
            onValueChange={(value) => {
              onFiltersChange({ 
                estado: value,
                cidade: "" // Reset cidade when estado changes
              })
            }}
            placeholder="Estado"
            searchPlaceholder="Buscar estado..."
          />
          <ComboBoxSearch
            options={cidades}
            value={filters.cidade}
            onValueChange={(value) => onFiltersChange({ cidade: value })}
            placeholder={
              !filters.estado 
                ? "Selecione um estado" 
                : loadingMunicipios 
                  ? "Carregando cidades..." 
                  : "Cidade"
            }
            searchPlaceholder="Buscar cidade..."
            disabled={!filters.estado || loadingMunicipios}
          />
        </div>
      </div>

      {/* Área */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Área
        </label>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={filters.area}
          onValueChange={(value) => onFiltersChange({ area: value })}
          suffix="m²"
        />
      </div>

      {/* Valor do lance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Valor do lance
        </label>
        <RangeSlider
          min={0}
          max={5000000}
          step={10000}
          value={filters.valor}
          onValueChange={(value) => onFiltersChange({ valor: value })}
          prefix="R$ "
        />
      </div>

      {/* Formato - New dedicated component */}
      <FormatToggle
        value={filters.formato}
        onValueChange={(value) => onFiltersChange({ formato: value })}
      />

      {/* Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Origem
        </label>
        <MultiToggleGrid
          options={origemOptions}
          value={filters.origem}
          onValueChange={(value) => onFiltersChange({ origem: value })}
        />
      </div>

      {/* Etapa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Etapa
        </label>
        <MultiToggleGrid
          options={etapaOptions}
          value={filters.etapa}
          onValueChange={(value) => onFiltersChange({ etapa: value })}
          disabled={isVendaDireta}
        />
        {/* Espaço reservado para mensagem condicional para evitar layout shift */}
        <div className="min-h-[16px] mt-2">
          {isVendaDireta && (
            <p className="text-xs text-gray-500">
              Etapas não se aplicam à venda direta
            </p>
          )}
        </div>
      </div>
    </div>
  )
}