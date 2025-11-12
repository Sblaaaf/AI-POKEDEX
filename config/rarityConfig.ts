export const rarityConfig: { [key: string]: { class: string; price: number; label: string } } = {
    'F': { class: 'bg-gray-200 text-gray-800', price: 2, label: 'Common' },
    'E': { class: 'bg-gray-200 text-gray-800', price: 3, label: 'Common' },
    'D': { class: 'bg-green-200 text-green-800', price: 5, label: 'Uncommon' },
    'C': { class: 'bg-green-200 text-green-800', price: 7, label: 'Uncommon' },
    'B': { class: 'bg-blue-200 text-blue-800', price: 10, label: 'Rare' },
    'A': { class: 'bg-blue-200 text-blue-800', price: 15, label: 'Rare' },
    'S': { class: 'bg-purple-200 text-purple-800', price: 25, label: 'Epic' },
    'S+': { class: 'bg-amber-300 text-amber-900', price: 50, label: 'Legendary' },
    'default': { class: 'bg-gray-200 text-gray-800', price: 2, label: 'Common' }
};
