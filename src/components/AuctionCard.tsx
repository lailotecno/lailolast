import React, { useState } from 'react';
import { Auction, ViewMode } from '../types/auction';
import { AuctionCardHorizontalBase } from './cards/AuctionCardHorizontalBase';
import { AuctionCardHorizontalVehicle } from './cards/AuctionCardHorizontalVehicle';
import { AuctionCardVerticalBase } from './cards/AuctionCardVerticalBase';
import { AuctionCardVerticalVehicle } from './cards/AuctionCardVerticalVehicle';

interface AuctionCardProps {
  auction: Auction;
  viewMode: ViewMode;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, viewMode }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleLink = () => {
    // TODO: Navigate to auction details
    console.log('Navigate to auction:', auction.id);
  };

  // Extract vehicle information from title for vehicle-specific cards
  const extractVehicleInfo = (title: string) => {
    // Try to extract brand, model, and year from title
    // This is a simple extraction - you might want to improve this logic
    const parts = title.split(' ');
    const brand = parts[0] || '';
    const model = parts[1] || '';
    const yearMatch = title.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : '';
    
    return { brand, model, year };
  };

  const isVehicle = auction.category === 'Veículos';
  const vehicleInfo = isVehicle ? extractVehicleInfo(auction.title) : null;

  // Create tags array with only origem and etapa
  const tags = [];
  if (auction.origem) tags.push(auction.origem);
  if (auction.etapa) tags.push(auction.etapa);

  // Mock area for properties (this would come from database)
  const mockArea = isVehicle ? undefined : '85m²';

  // Common props for all card types
  const commonProps = {
    price: formatCurrency(auction.currentBid),
    imageUrl: auction.imageUrl,
    isFavorited,
    onToggleFavorite: handleToggleFavorite,
    onLink: handleLink,
    isNew: auction.isNew,
    date: formatTimeRemaining(auction.endDate),
    tags: tags,
  };

  if (viewMode === 'horizontal') {
    if (isVehicle && vehicleInfo) {
      return (
        <AuctionCardHorizontalVehicle
          {...commonProps}
          brand={vehicleInfo.brand}
          model={vehicleInfo.model}
          color={auction.color || "Prata"}
          year={auction.year || vehicleInfo.year}
          cityState={auction.location}
        />
      );
    } else {
      return (
        <AuctionCardHorizontalBase
          {...commonProps}
          titleLeft={auction.title}
          subtitle={`${auction.description} – ${auction.location}`}
          area={mockArea}
        />
      );
    }
  } else {
    if (isVehicle && vehicleInfo) {
      return (
        <AuctionCardVerticalVehicle
          {...commonProps}
          brand={vehicleInfo.brand}
          model={vehicleInfo.model}
          color={auction.color || "Prata"}
          year={auction.year || vehicleInfo.year}
          cityState={auction.location}
        />
      );
    } else {
      return (
        <AuctionCardVerticalBase
          {...commonProps}
          titleLeft={auction.title}
          subtitle={`${auction.description} – ${auction.location}`}
          area={mockArea}
        />
      );
    }
  }
};