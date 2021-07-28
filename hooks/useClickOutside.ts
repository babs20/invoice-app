import { useEffect, Dispatch, SetStateAction } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>
): void => {
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const navigation = document.querySelector('.navigation');

      if (state) {
        if (
          ref.current &&
          !ref.current.contains(e.target as HTMLElement) &&
          !navigation?.contains(e.target as HTMLElement)
        ) {
          setState(!state);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setState, state]);
};

export default useClickOutside;
