import React from 'react';

interface TokenDisplayProps {
    balance: number;
}

const TokenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v.518l.983.504a.75.75 0 0 1 .375.652v7.698a.75.75 0 0 1-.375.652l-.983.504v.518a.75.75 0 0 1-1.5 0v-.518l-.983-.504a.75.75 0 0 1-.375-.652V5.174a.75.75 0 0 1 .375-.652l.983-.504V3a.75.75 0 0 1 .75-.75ZM10.125 4.81v5.69l-1.03 1.716a.75.75 0 0 0 .65 1.135h4.51a.75.75 0 0 0 .65-1.135l-1.03-1.716V4.81L12 3.75l-1.875 1.06Z" />
        <path d="M12 21.75a9.75 9.75 0 1 1 0-19.5 9.75 9.75 0 0 1 0 19.5Zm0-1.5a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5Z" />
    </svg>
);


export const TokenDisplay: React.FC<TokenDisplayProps> = ({ balance }) => {
    return (
        <div className="flex items-center justify-center space-x-3 bg-white px-5 py-2 rounded-full shadow-lg border border-gray-200">
            <TokenIcon className="w-7 h-7 text-amber-500" />
            <span className="text-2xl font-extrabold text-gray-700">{balance}</span>
            <span className="text-gray-500 font-bold text-base">Jetons</span>
        </div>
    );
};