// Slugs oficiais de veículos
export const VEHICLE_TYPES = [
  'todos',
  'caminhoes',
  'carros',
  'embarcacoes',
  'maquinas',
  'motos',
  'onibus',
  'reboques',
  'recreativos',
  'sucata',
  'nao-informado'
] as const;

// Slugs oficiais de propriedades
export const PROPERTY_TYPES = [
  'todos',
  'apartamentos',
  'casas',
  'comerciais',
  'compactos',
  'condominios',
  'galpoes',
  'garagem',
  'hospedagem',
  'industriais',
  'mistos',
  'predios',
  'rurais',
  'terrenos',
  'nao-informado'
] as const;

export type VehicleType = typeof VEHICLE_TYPES[number];
export type PropertyType = typeof PROPERTY_TYPES[number];

/**
 * Normaliza o tipo de veículo para um dos slugs oficiais
 * Qualquer valor inválido retorna 'nao-informado'
 */
export function normalizeVehicleType(type: string | null | undefined): VehicleType {
  if (!type || typeof type !== 'string') {
    return 'nao-informado';
  }
  
  const normalizedType = type.toLowerCase().trim();
  
  if (VEHICLE_TYPES.includes(normalizedType as VehicleType)) {
    return normalizedType as VehicleType;
  }
  
  return 'nao-informado';
}

/**
 * Normaliza o tipo de propriedade para um dos slugs oficiais
 * Qualquer valor inválido retorna 'nao-informado'
 */
export function normalizePropertyType(type: string | null | undefined): PropertyType {
  if (!type || typeof type !== 'string') {
    return 'nao-informado';
  }
  
  const normalizedType = type.toLowerCase().trim();
  
  if (PROPERTY_TYPES.includes(normalizedType as PropertyType)) {
    return normalizedType as PropertyType;
  }
  
  return 'nao-informado';
}

/**
 * Valida se um tipo de veículo é válido
 */
export function isValidVehicleType(type: string): type is VehicleType {
  return VEHICLE_TYPES.includes(type as VehicleType);
}

/**
 * Valida se um tipo de propriedade é válido
 */
export function isValidPropertyType(type: string): type is PropertyType {
  return PROPERTY_TYPES.includes(type as PropertyType);
}

/**
 * Obtém o label amigável para um tipo de veículo
 */
export function getVehicleTypeLabel(type: VehicleType): string {
  const labels: Record<VehicleType, string> = {
    'todos': 'Todos',
    'caminhoes': 'Caminhões',
    'carros': 'Carros',
    'embarcacoes': 'Embarcações',
    'maquinas': 'Máquinas',
    'motos': 'Motos',
    'onibus': 'Ônibus',
    'reboques': 'Reboques',
    'recreativos': 'Recreativos',
    'sucata': 'Sucata',
    'nao-informado': 'Não Informado'
  };
  
  return labels[type];
}

/**
 * Obtém o label amigável para um tipo de propriedade
 */
export function getPropertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    'todos': 'Todos',
    'apartamentos': 'Apartamentos',
    'casas': 'Casas',
    'comerciais': 'Comerciais',
    'compactos': 'Compactos',
    'condominios': 'Condomínios',
    'galpoes': 'Galpões',
    'garagem': 'Garagem',
    'hospedagem': 'Hospedagem',
    'industriais': 'Industriais',
    'mistos': 'Mistos',
    'predios': 'Prédios',
    'rurais': 'Rurais',
    'terrenos': 'Terrenos',
    'nao-informado': 'Não Informado'
  };
  
  return labels[type];
}