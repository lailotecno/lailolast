export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

export interface Municipio {
  id: number;
  nome: string;
}

// Estados fixos do Brasil
export const ESTADOS_BRASIL: Estado[] = [
  { id: 12, sigla: 'AC', nome: 'Acre' },
  { id: 27, sigla: 'AL', nome: 'Alagoas' },
  { id: 16, sigla: 'AP', nome: 'Amapá' },
  { id: 13, sigla: 'AM', nome: 'Amazonas' },
  { id: 29, sigla: 'BA', nome: 'Bahia' },
  { id: 23, sigla: 'CE', nome: 'Ceará' },
  { id: 53, sigla: 'DF', nome: 'Distrito Federal' },
  { id: 32, sigla: 'ES', nome: 'Espírito Santo' },
  { id: 52, sigla: 'GO', nome: 'Goiás' },
  { id: 21, sigla: 'MA', nome: 'Maranhão' },
  { id: 51, sigla: 'MT', nome: 'Mato Grosso' },
  { id: 50, sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { id: 31, sigla: 'MG', nome: 'Minas Gerais' },
  { id: 15, sigla: 'PA', nome: 'Pará' },
  { id: 25, sigla: 'PB', nome: 'Paraíba' },
  { id: 41, sigla: 'PR', nome: 'Paraná' },
  { id: 26, sigla: 'PE', nome: 'Pernambuco' },
  { id: 22, sigla: 'PI', nome: 'Piauí' },
  { id: 33, sigla: 'RJ', nome: 'Rio de Janeiro' },
  { id: 24, sigla: 'RN', nome: 'Rio Grande do Norte' },
  { id: 43, sigla: 'RS', nome: 'Rio Grande do Sul' },
  { id: 11, sigla: 'RO', nome: 'Rondônia' },
  { id: 14, sigla: 'RR', nome: 'Roraima' },
  { id: 42, sigla: 'SC', nome: 'Santa Catarina' },
  { id: 35, sigla: 'SP', nome: 'São Paulo' },
  { id: 28, sigla: 'SE', nome: 'Sergipe' },
  { id: 17, sigla: 'TO', nome: 'Tocantins' }
];

/**
 * Busca os municípios de um estado específico via API do IBGE
 */
export async function fetchMunicipiosByEstado(uf: string): Promise<Municipio[]> {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar municípios: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Mapear para o formato esperado e ordenar alfabeticamente
    return data
      .map((municipio: any) => ({
        id: municipio.id,
        nome: municipio.nome
      }))
      .sort((a: Municipio, b: Municipio) => a.nome.localeCompare(b.nome));
      
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
    return [];
  }
}

/**
 * Converte lista de estados para formato do ComboBox
 */
export function getEstadosOptions() {
  return [
    { value: "", label: "Todos os estados" },
    ...ESTADOS_BRASIL.map(estado => ({
      value: estado.sigla,
      label: `${estado.nome} (${estado.sigla})`
    }))
  ];
}

/**
 * Converte lista de municípios para formato do ComboBox
 */
export function getMunicipiosOptions(municipios: Municipio[]) {
  return [
    { value: "", label: "Todas as cidades" },
    ...municipios.map(municipio => ({
      value: municipio.nome,
      label: municipio.nome
    }))
  ];
}