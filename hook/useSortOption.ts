import { useState } from 'react';

export const useSortOption = (options: string[], defaultOption?: string) => {
  const [sortOption, setSortOption] = useState(defaultOption ?? options[0]);

  const handleSortOption = () => {
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = currentIndex >= options.length - 1 ? 0 : currentIndex + 1;
    setSortOption(options[nextIndex]);
  };

  return { sortOption, handleSortOption };
};
