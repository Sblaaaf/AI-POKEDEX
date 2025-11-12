import React from 'react';
import { Pokemon } from '../types';
import { rarityConfig } from '../config/rarityConfig';

interface TokenStatsProps {
    currentTokens: number;
    pokemons: Pokemon[];
    initialTokens: number;
}

const TokenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v.518l.983.504a.75.75 0 0 1 .375.652v7.698a.75.75 0 0 1-.375.652l-.983.504v.518a.75.75 0 0 1-1.5 0v-.518l-.983-.504a.75.75 0 0 1-.375-.652V5.174a.75.75 0 0 1 .375-.652l.983-.504V3a.75.75 0 0 1 .75-.75ZM10.125 4.81v5.69l-1.03 1.716a.75.75 0 0 0 .65 1.135h4.51a.75.75 0 0 0 .65-1.135l-1.03-1.716V4.81L12 3.75l-1.875 1.06Z" />
        <path d="M12 21.75a9.75 9.75 0 1 1 0-19.5 9.75 9.75 0 0 1 0 19.5Zm0-1.5a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5Z" />
    </svg>
);

const CollectionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.1 2.18a.99.99 0 0 1 .8.42l1.65 2.7c.08.12.19.23.32.3l2.96.78c.42.11.7.54.6.98l-.78 2.96c-.07.26-.07.54 0 .8l.78 2.96c.11.42-.18.87-.6.98l-2.96.78c-.13.04-.24.15-.32.28l-1.65 2.7a.99.99 0 0 1-.8.42h-4.2a.99.99 0 0 1-.8-.42l-1.65-2.7a.64.64 0 0 0-.32-.28l-2.96-.78a.99.99 0 0 1-.6-.98l.78-2.96c.07-.26.07-.54 0-.8l-.78-2.96a.99.99 0 0 1 .6-.98l2.96-.78c.13-.04.24-.15.32-.3L5.1 2.6a.99.99 0 0 1 .8-.42h4.2z"></path></svg>
);

const TrendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
);


export const TokenStats: React.FC<TokenStatsProps> = ({ currentTokens, pokemons, initialTokens }) => {
    const collectionValue = pokemons.reduce((sum, p) => {
        const config = rarityConfig[p.rarity] || rarityConfig.default;
        return sum + config.price;
    }, 0);
    
    const netResult = (currentTokens + collectionValue) - initialTokens;

    return (
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200 grid md:grid-cols-3 gap-3 w-full max-w-lg">
            <div className="flex-1 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                    <TokenIcon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-amber-700">Jetons Restants</p>
                    <p className="text-xl font-extrabold text-amber-900">{currentTokens}</p>
                </div>
            </div>
            <div className="flex-1 bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                    <CollectionIcon className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-sky-700">Valeur Collection</p>
                    <p className="text-xl font-extrabold text-sky-900">{collectionValue}</p>
                </div>
            </div>
            <div className={`flex-1 rounded-xl p-3 flex items-center gap-3 ${netResult >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="bg-white p-2 rounded-full">
                    <TrendIcon className={`w-6 h-6 ${netResult >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div>
                    <p className={`text-xs font-bold ${netResult >= 0 ? 'text-green-700' : 'text-red-700'}`}>Bilan Net</p>
                    <p className={`text-xl font-extrabold ${netResult >= 0 ? 'text-green-900' : 'text-red-900'}`}>{netResult >= 0 ? '+' : ''}{netResult}</p>
                </div>
            </div>
        </div>
    );
};