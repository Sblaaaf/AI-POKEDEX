
import React from 'react';
// FIX: Import Pokemon instead of non-existent Item type.
import { Pokemon } from '../types';

interface ItemCardProps {
  // FIX: Use Pokemon type for the prop, and renamed it to `pokemon` for clarity.
  pokemon: Pokemon;
  onEdit: (pokemon: Pokemon) => void;
  onDelete: (id: number) => void;
}

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

// FIX: Renamed item prop to pokemon and updated component to display Pokemon data.
export const ItemCard: React.FC<ItemCardProps> = ({ pokemon, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="aspect-square w-full bg-slate-200 rounded-t-lg">
          <img src={pokemon.imageUrl} alt={`Image of ${pokemon.name}`} className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
           {/* FIX: Display pokemon.name and pokemon.prompt instead of item.title and item.description */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 capitalize">{pokemon.name}</h3>
          <p className="text-slate-600 mb-4 text-sm italic">"{pokemon.prompt}"</p>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-500 pt-4 border-t border-slate-200 mt-auto">
          <span>{new Date(pokemon.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEdit(pokemon)}
              className="text-sky-600 hover:text-sky-800 transition-colors"
              aria-label={`Edit ${pokemon.name}`}
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => pokemon.id && onDelete(pokemon.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label={`Delete ${pokemon.name}`}
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
