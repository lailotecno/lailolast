import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { FormatToggle } from "./FormatToggle"
import { MultiToggleGrid } from "./MultiToggleGrid"
import { getEstadosOptions, getMunicipiosOptions, fetchMunicipiosByEstado, Municipio } from "../../utils/ibgeApi"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface VeiculosFiltersState {
  estado: string
  cidade: string
  marca: string
  modelo: string
  cor: string
  ano: [number, number]
  preco: [number, number]
  formato: string
  origem: string[]
  etapa: string[]
}

interface VeiculosFiltersProps {
  filters: VeiculosFiltersState
  onFiltersChange: (filters: Partial<VeiculosFiltersState>) => void
  currentVehicleType?: string // Novo prop para receber o tipo atual
}

export const VeiculosFilters: React.FC<VeiculosFiltersProps> = ({
  filters,
  onFiltersChange,
  currentVehicleType = 'todos'
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

  const marcas = [
    { value: "", label: "Todas as marcas" },
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "ford", label: "Ford" },
    { value: "chevrolet", label: "Chevrolet" },
  ]

  const getModelos = (marca: string) => {
    const modelosPorMarca: Record<string, Array<{ value: string; label: string }>> = {
      toyota: [
        { value: "", label: "Todos os modelos" },
        { value: "corolla", label: "Corolla" },
        { value: "camry", label: "Camry" },
        { value: "hilux", label: "Hilux" },
      ],
      honda: [
        { value: "", label: "Todos os modelos" },
        { value: "civic", label: "Civic" },
        { value: "accord", label: "Accord" },
        { value: "cr-v", label: "CR-V" },
      ],
    }
    
    return modelosPorMarca[marca] || [{ value: "", label: "Todos os modelos" }]
  }

  const cores = [
    "Todas as cores",
    "Amarelo",
    "Azul", 
    "Bege",
    "Branco",
    "Bronze",
    "Cinza",
    "Dourado",
    "Grafite",
    "Laranja",
    "Marrom",
    "Prata",
    "Preto",
    "Rosa",
    "Roxo",
    "Verde",
    "Vermelho",
    "Vinho"
  ]

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
  
  // Verificar se deve mostrar os filtros de marca e modelo
  const shouldShowBrandModelFilters = currentVehicleType !== 'todos' && currentVehicleType !== 'nao-informado'

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

      {/* Marca e Modelo - Só exibir se não for 'todos' ou 'nao-informado' */}
      {shouldShowBrandModelFilters && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Marca e Modelo
          </label>
          <div className="grid grid-cols-1 gap-2">
            <ComboBoxSearch
              options={marcas}
              value={filters.marca}
              onValueChange={(value) => {
                onFiltersChange({ 
                  marca: value,
                  modelo: "" // Reset modelo when marca changes
                })
              }}
              placeholder="Marca"
              searchPlaceholder="Buscar marca..."
            />
            <ComboBoxSearch
              options={getModelos(filters.marca)}
              value={filters.modelo}
              onValueChange={(value) => onFiltersChange({ modelo: value })}
              placeholder="Modelo"
              searchPlaceholder="Buscar modelo..."
              disabled={!filters.marca}
            />
          </div>
        </div>
      )}

      {/* Cor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Cor
        </label>
        <Select value={filters.cor} onValueChange={(value) => onFiltersChange({ cor: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Cor" />
          </SelectTrigger>
          <SelectContent>
            {cores.map((cor, index) => (
              <SelectItem key={index} value={cor.toLowerCase()}>
                {cor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ano */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ano
        </label>
        <RangeSlider
          min={1990}
          max={2024}
          step={1}
          value={filters.ano}
          onValueChange={(value) => onFiltersChange({ ano: value })}
        />
      </div>

      {/* Faixa de preço */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Faixa de preço
        </label>
        <RangeSlider
          min={0}
          max={500000}
          step={5000}
          value={filters.preco}
          onValueChange={(value) => onFiltersChange({ preco: value })}
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