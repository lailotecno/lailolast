import { Auction } from '../types/auction';
import { normalizeVehicleType, normalizePropertyType } from '../utils/typeNormalization';

// Generate more mock data to demonstrate pagination
const generateMockVeiculos = (): Auction[] => {
  const baseVeiculos = [
    {
      id: '1',
      title: 'BMW X5 2018',
      description: 'Estado de Conservação Excelente',
      currentBid: 180000,
      minimumBid: 150000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'São Paulo/SP',
      site: 'SuperLeilões',
      category: 'Veículos',
      isNew: true,
      bidsCount: 23,
      color: 'Preto',
      year: '2018',
      origem: 'Judicial',
      etapa: '1ª Praça',
      vehicleType: normalizeVehicleType('carros')
    },
    {
      id: '2',
      title: 'Honda Civic 2020',
      description: 'Único Dono',
      currentBid: 95000,
      minimumBid: 85000,
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Brasília/DF',
      site: 'Leilões Online',
      category: 'Veículos',
      bidsCount: 41,
      color: 'Prata',
      year: '2020',
      origem: 'Extrajudicial',
      etapa: '2ª Praça',
      vehicleType: normalizeVehicleType('carros')
    },
    {
      id: '3',
      title: 'Toyota Corolla 2019',
      description: 'Automático',
      currentBid: 78000,
      minimumBid: 70000,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Rio de Janeiro/RJ',
      site: 'Lance Certo',
      category: 'Veículos',
      isNew: true,
      bidsCount: 56,
      color: 'Branco',
      year: '2019',
      origem: 'Particular',
      etapa: 'Praça única',
      vehicleType: normalizeVehicleType('carros')
    },
    {
      id: '4',
      title: 'Volkswagen Tiguan 2017',
      description: 'SUV Completo',
      currentBid: 125000,
      minimumBid: 110000,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Curitiba/PR',
      site: 'Mega Leilões',
      category: 'Veículos',
      bidsCount: 34,
      color: 'Azul',
      year: '2017',
      origem: 'Público',
      etapa: '3ª Praça',
      vehicleType: normalizeVehicleType('carros')
    }
  ];

  // Generate additional vehicles to reach 100+ items
  const additionalVeiculos: Auction[] = [];
  const carBrands = ['Toyota', 'Honda', 'Volkswagen', 'Ford', 'Chevrolet', 'Hyundai', 'Nissan', 'Fiat', 'Renault', 'Peugeot'];
  const carModels = ['Sedan', 'Hatch', 'SUV', 'Pickup', 'Crossover'];
  const colors = ['Preto', 'Branco', 'Prata', 'Azul', 'Vermelho', 'Cinza'];
  const locations = ['São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Brasília/DF', 'Curitiba/PR', 'Porto Alegre/RS'];
  const sites = ['SuperLeilões', 'Leilões Online', 'Lance Certo', 'Mega Leilões', 'Sodré Santoro', 'Frazão Leilões'];
  const origens = ['Judicial', 'Extrajudicial', 'Particular', 'Público'];
  const etapas = ['Praça única', '1ª Praça', '2ª Praça', '3ª Praça'];
  const vehicleTypes = ['carros', 'motos', 'caminhoes', 'embarcacoes', 'maquinas', 'onibus'];
  const images = [
    'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  for (let i = 5; i <= 100; i++) {
    const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const model = carModels[Math.floor(Math.random() * carModels.length)];
    const year = (2015 + Math.floor(Math.random() * 9)).toString();
    const color = colors[Math.floor(Math.random() * colors.length)];
    const price = 30000 + Math.floor(Math.random() * 200000);
    const km = 10000 + Math.floor(Math.random() * 100000);
    const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    
    additionalVeiculos.push({
      id: i.toString(),
      title: `${brand} ${model} ${year}`,
      description: `${km.toLocaleString('pt-BR')} km`,
      currentBid: price,
      minimumBid: Math.floor(price * 0.8),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
      imageUrl: images[Math.floor(Math.random() * images.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      site: sites[Math.floor(Math.random() * sites.length)],
      category: 'Veículos',
      isNew: Math.random() > 0.8,
      bidsCount: Math.floor(Math.random() * 100) + 1,
      color,
      year,
      origem: origens[Math.floor(Math.random() * origens.length)],
      etapa: etapas[Math.floor(Math.random() * etapas.length)],
      vehicleType: normalizeVehicleType(vehicleType)
    });
  }

  return [...baseVeiculos, ...additionalVeiculos];
};

const generateMockImoveis = (): Auction[] => {
  const baseImoveis = [
    {
      id: '101',
      title: 'Apartamento 3 Quartos',
      description: 'Vista Mar Copacabana',
      currentBid: 850000,
      minimumBid: 800000,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Rio de Janeiro/RJ',
      site: 'Leilões BR',
      category: 'Imóveis',
      bidsCount: 45,
      origem: 'Judicial',
      etapa: '1ª Praça',
      propertyType: normalizePropertyType('apartamentos')
    },
    {
      id: '102',
      title: 'Casa 4 Quartos',
      description: 'Condomínio Fechado Alphaville',
      currentBid: 1200000,
      minimumBid: 1100000,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'São Paulo/SP',
      site: 'Sodré Santoro',
      category: 'Imóveis',
      isNew: true,
      bidsCount: 67,
      origem: 'Extrajudicial',
      etapa: '2ª Praça',
      propertyType: normalizePropertyType('casas')
    },
    {
      id: '103',
      title: 'Cobertura Duplex',
      description: 'Barra da Tijuca',
      currentBid: 1800000,
      minimumBid: 1600000,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Rio de Janeiro/RJ',
      site: 'Frazão Leilões',
      category: 'Imóveis',
      bidsCount: 89,
      origem: 'Particular',
      etapa: 'Praça única',
      propertyType: normalizePropertyType('apartamentos')
    },
    {
      id: '104',
      title: 'Apartamento Studio',
      description: 'Vila Madalena',
      currentBid: 420000,
      minimumBid: 380000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'São Paulo/SP',
      site: 'Zukerman',
      category: 'Imóveis',
      isNew: true,
      bidsCount: 23,
      origem: 'Público',
      etapa: '3ª Praça',
      propertyType: normalizePropertyType('compactos')
    }
  ];

  // Generate additional properties
  const additionalImoveis: Auction[] = [];
  const propertyTypes = ['apartamentos', 'casas', 'comerciais', 'compactos', 'condominios', 'galpoes', 'terrenos'];
  const neighborhoods = ['Copacabana', 'Ipanema', 'Vila Madalena', 'Moema', 'Leblon', 'Barra da Tijuca', 'Alphaville', 'Jardins'];
  const locations = ['São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Brasília/DF', 'Curitiba/PR', 'Porto Alegre/RS'];
  const sites = ['Leilões BR', 'Sodré Santoro', 'Frazão Leilões', 'Zukerman', 'SuperLeilões', 'Mega Leilões'];
  const origens = ['Judicial', 'Extrajudicial', 'Particular', 'Público'];
  const etapas = ['Praça única', '1ª Praça', '2ª Praça', '3ª Praça'];
  const images = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  for (let i = 105; i <= 200; i++) {
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const rooms = Math.floor(Math.random() * 4) + 1;
    const price = 200000 + Math.floor(Math.random() * 2000000);
    const area = 40 + Math.floor(Math.random() * 200);
    
    additionalImoveis.push({
      id: i.toString(),
      title: `${propertyType === 'apartamentos' ? 'Apartamento' : propertyType === 'casas' ? 'Casa' : 'Imóvel'} ${rooms} Quartos`,
      description: `${neighborhood}`,
      currentBid: price,
      minimumBid: Math.floor(price * 0.85),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
      imageUrl: images[Math.floor(Math.random() * images.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      site: sites[Math.floor(Math.random() * sites.length)],
      category: 'Imóveis',
      isNew: Math.random() > 0.8,
      bidsCount: Math.floor(Math.random() * 100) + 1,
      origem: origens[Math.floor(Math.random() * origens.length)],
      etapa: etapas[Math.floor(Math.random() * etapas.length)],
      propertyType: normalizePropertyType(propertyType)
    });
  }

  return [...baseImoveis, ...additionalImoveis];
};

export const mockVeiculos = generateMockVeiculos();
export const mockImoveis = generateMockImoveis();

export const getAuctionsByCategory = (category: 'veiculos' | 'imoveis', type?: string): Auction[] => {
  const auctions = category === 'veiculos' ? mockVeiculos : mockImoveis;
  
  // Se não especificar tipo ou for 'todos', retorna todos
  if (!type || type === 'todos') {
    return auctions;
  }
  
  // Filtrar por tipo específico
  if (category === 'veiculos') {
    const normalizedType = type;
    return auctions.filter(auction => auction.vehicleType === normalizedType);
  } else {
    const normalizedType = type;
    return auctions.filter(auction => auction.propertyType === normalizedType);
  }
};