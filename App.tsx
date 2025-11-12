import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Pokemon } from './types';
import { indexedDbService as db } from './services/indexedDbService';
import { PokemonCard } from './components/PokemonCard';
import { PokemonFormModal } from './components/PokemonFormModal';
import { TokenStats } from './components/TokenStats';
import { pokemonApiService } from './services/pokemonApiServices';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [tokens, setTokens] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [pokemonToEdit, setPokemonToEdit] = useState<Pokemon | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState('date-desc');

  const INITIAL_TOKENS = 100;
  const CREATION_COST = 10;
  
  const rarityOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'S+'];

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const allPokemons = await db.getAllPokemons();
      setPokemons(allPokemons);
      
      let tokenBalance = await db.getTokenBalance();
      if (tokenBalance === undefined) {
          tokenBalance = INITIAL_TOKENS;
          await db.setTokenBalance(tokenBalance);
      }
      setTokens(tokenBalance);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch data from the database.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedPokemons = useMemo(() => {
    const pokemonsCopy = [...pokemons];
    switch (sortOrder) {
        case 'date-asc':
            return pokemonsCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'rarity-asc':
            return pokemonsCopy.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
        case 'rarity-desc':
            return pokemonsCopy.sort((a, b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity));
        case 'date-desc':
        default:
            // The default sort from the DB is already date-desc, but we do it again in case
            return pokemonsCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [pokemons, sortOrder]);
  
  const handleGeneratePokemon = async () => {
    if (tokens < CREATION_COST) {
        setError(`You need at least ${CREATION_COST} tokens.`);
        return;
    }
    setIsGenerating(true);
    setError(null);

    try {
        const newBalance = tokens - CREATION_COST;
        await db.setTokenBalance(newBalance);
        setTokens(newBalance);
        
        const newPokemonData = await pokemonApiService.generatePokemon();

        const addedPokemon = await db.addPokemon(newPokemonData);
        setPokemons(prevPokemons => [addedPokemon, ...prevPokemons]);
    } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred during Pokémon generation.';
        setError(errorMessage);
        // Rollback token change on error
        await db.setTokenBalance(tokens); 
        setTokens(tokens);
    } finally {
        setIsGenerating(false);
    }
  };


  const handleEditSubmit = async (pokemonData: Pokemon) => {
    try {
        await db.updatePokemon(pokemonData);
        setPokemons(prev => prev.map(p => p.id === pokemonData.id ? pokemonData : p));
        setIsFormOpen(false);
        setPokemonToEdit(null);
    } catch (err) {
        console.error(err);
        setError('Failed to save the pokémon.');
    }
  };

  const handleSell = async (id: number, sellPrice: number) => {
    if (window.confirm(`Voulez-vous vraiment vendre ce Pokémon pour ${sellPrice} jetons ?`)) {
        const originalTokens = tokens;
        try {
            const newBalance = tokens + sellPrice;
            await db.setTokenBalance(newBalance);
            setTokens(newBalance);

            await db.deletePokemon(id);
            setPokemons(prevPokemons => prevPokemons.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            setError('Impossible de vendre le Pokémon.');
            // Revert token change if deletion failed
            await db.setTokenBalance(originalTokens);
            setTokens(originalTokens);
        }
    }
  };

  const handleEdit = (pokemon: Pokemon) => {
    setPokemonToEdit(pokemon);
    setIsFormOpen(true);
  };
  
  const canCreatePokemon = tokens >= CREATION_COST && !isGenerating;

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-widest font-['Bangers']">
                    AI <span className="text-red-600">POKEDEX</span>
                  </h1>
                  <p className="text-gray-500 mt-2 text-lg">Créez et collectionnez des Pokémon uniques !</p>
              </div>
              {!isLoading && <TokenStats currentTokens={tokens} pokemons={pokemons} initialTokens={INITIAL_TOKENS} />}
          </div>
        </header>

        <main>
          <div className="flex justify-center my-10">
            <button
              onClick={handleGeneratePokemon}
              disabled={!canCreatePokemon}
              className="text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:transform-none bg-red-600 hover:bg-red-700 disabled:bg-gray-400 border-b-4 border-red-800 disabled:border-gray-500 active:border-b-0"
              title={!canCreatePokemon ? `Vous avez besoin de ${CREATION_COST} jetons` : 'Générer un nouveau Pokémon'}
            >
              {isGenerating ? 'Génération...' : `Générer un Pokémon ! (${CREATION_COST} Jetons)`}
            </button>
          </div>

          {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg mb-6 font-semibold">{error}</p>}
          
          {isLoading ? (
            <div className="text-center text-gray-500 text-lg">Chargement du Pokédex...</div>
          ) : pokemons.length > 0 ? (
            <>
              <div className="flex justify-end mb-6">
                <div className="flex items-center gap-2">
                    <label htmlFor="sort-order" className="text-sm font-medium text-gray-600">Trier par :</label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2"
                    >
                        <option value="date-desc">Plus récent</option>
                        <option value="date-asc">Plus ancien</option>
                        <option value="rarity-desc">Rareté (décroissante)</option>
                        <option value="rarity-asc">Rareté (croissante)</option>
                    </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedPokemons.map((pokemon) => (
                  pokemon.id ? <PokemonCard key={pokemon.id} pokemon={pokemon} onEdit={handleEdit} onSell={handleSell} /> : null
                ))}
              </div>
            </>
          ) : (
            <div className="text-center bg-white p-16 rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-700">Votre Pokédex est vide</h2>
                <p className="text-gray-500 mt-2">Cliquez sur le bouton rouge pour créer votre premier Pokémon !</p>
            </div>
          )}
        </main>
      </div>

      <PokemonFormModal 
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setPokemonToEdit(null); }}
        onSubmit={handleEditSubmit}
        pokemonToEdit={pokemonToEdit}
      />
    </>
  );
};

export default App;