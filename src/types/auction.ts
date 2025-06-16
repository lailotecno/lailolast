export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  minimumBid?: number;
  endDate: Date;
  imageUrl: string;
  location: string;
  site: string;
  category: string;
  isNew?: boolean;
  bidsCount: number;
  color?: string;
  year?: string;
  origem?: string;
  etapa?: string;
  vehicleType?: string;
  propertyType?: string;
}

export type ViewMode = 'horizontal' | 'vertical';
export type SortOption = 'newest' | 'lowest-bid' | 'highest-bid' | 'highest-discount' | 'nearest';
export type Category = 'veiculos' | 'imoveis';