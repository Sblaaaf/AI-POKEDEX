import React, { useState, useEffect } from 'react';
import { Pokemon } from '../types';

interface PokemonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pokemonData: Pokemon) => void;
  pokemonToEdit: Pokemon | null;
}

export const PokemonFormModal: React.FC<PokemonFormModalProps> = ({ isOpen, onClose, onSubmit, pokemonToEdit }) => {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (pokemonToEdit) {
      setName(pokemonToEdit.name);
      setPrompt(pokemonToEdit.prompt);
    }
  }, [pokemonToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !prompt.trim() || !pokemonToEdit) return;

    onSubmit({ ...pokemonToEdit, name, prompt });
  };
  
  const handleClose = () => {
    onClose();
  }

  if (!isOpen || !pokemonToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 ease-in-out scale-95 animate-scale-in">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-800">Edit Pokémon</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              placeholder="e.g., Sparky"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">Prompt</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 h-28"
              required
              placeholder="e.g., A small, yellow electric mouse with red cheeks"
            />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Save Changes
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