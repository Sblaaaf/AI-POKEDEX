
import React, { useState, useEffect } from 'react';
// FIX: Import Pokemon instead of non-existent Item type.
import { Pokemon } from '../types';

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX: Use Pokemon type for onSubmit and renamed itemToEdit prop.
  onSubmit: (item: Pick<Pokemon, 'name' | 'prompt'> | Pokemon) => void;
  pokemonToEdit?: Pokemon | null;
}

export const ItemFormModal: React.FC<ItemFormModalProps> = ({ isOpen, onClose, onSubmit, pokemonToEdit }) => {
  // FIX: Rename state variables from title/description to name/prompt to match Pokemon type.
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (pokemonToEdit) {
      // FIX: Set state from pokemonToEdit prop.
      setName(pokemonToEdit.name);
      setPrompt(pokemonToEdit.prompt);
    } else {
      setName('');
      setPrompt('');
    }
  }, [pokemonToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FIX: Check for name and prompt.
    if (!name.trim() || !prompt.trim()) return;

    if (pokemonToEdit) {
        // FIX: Submit updated Pokemon data.
        onSubmit({ ...pokemonToEdit, name, prompt });
    } else {
        // FIX: Submit new Pokemon data.
        onSubmit({ name, prompt });
    }
  };
  
  const handleClose = () => {
    setName('');
    setPrompt('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 ease-in-out scale-95 animate-scale-in">
        {/* FIX: Update modal title. */}
        <h2 className="text-2xl font-bold mb-6 text-slate-800">{pokemonToEdit ? 'Edit Pokémon' : 'Add New Pokémon'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* FIX: Update form field for Pokemon name. */}
            <label htmlFor="name" className="block text-slate-700 text-sm font-bold mb-2">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              placeholder="e.g., Sparky"
            />
          </div>
          <div className="mb-6">
            {/* FIX: Update form field for Pokemon prompt. */}
            <label htmlFor="prompt" className="block text-slate-700 text-sm font-bold mb-2">Prompt</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 h-28"
              required
              placeholder="e.g., A small, yellow electric mouse with red cheeks"
            />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              {/* FIX: Update button text. */}
              {pokemonToEdit ? 'Save Changes' : 'Add Pokémon'}
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
