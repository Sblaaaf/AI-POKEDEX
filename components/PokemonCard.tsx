import React from 'react';
import { Pokemon } from '../types';
import { rarityConfig } from '../config/rarityConfig';


interface PokemonCardProps {
  pokemon: Pokemon;
  onEdit: (pokemon: Pokemon) => void;
  onSell: (id: number, price: number) => void;
}

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const SellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
    </svg>
);


export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onEdit, onSell }) => {
  const config = rarityConfig[pokemon.rarity] || rarityConfig.default;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200">
      <div className="relative aspect-square w-full bg-gray-200 rounded-t-2xl">
          <img src={pokemon.imageUrl} alt={`Image of ${pokemon.name}`} className="w-full h-full object-cover rounded-t-2xl" />
          <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${config.class}`}>
              {config.label}
          </span>
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{pokemon.name}</h3>
          <p className="text-gray-500 mb-4 text-sm italic">"{pokemon.prompt}"</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100 mt-auto">
          <span>{new Date(pokemon.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(pokemon)}
              className="p-2 rounded-full text-sky-600 hover:text-sky-800 hover:bg-sky-100 transition-colors"
              aria-label={`Edit ${pokemon.name}`}
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => pokemon.id && onSell(pokemon.id, config.price)}
              className="flex items-center space-x-1.5 py-1 px-3 rounded-full text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
              aria-label={`Sell ${pokemon.name} for ${config.price} tokens`}
            >
              <span className="font-bold text-sm">Vendre pour {config.price}</span>
              <SellIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};