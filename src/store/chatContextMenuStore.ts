'use client';

import { create } from 'zustand';

const TOP_BAR_HEIGHT = 84;

export type OpenMenuProps = { targetElement: DOMRect } & Omit<MenuType, 'isOpen' | 'position'>;

export type MenuType = {
  isOpen: boolean;
  id: number | null;
  type: string | null;
  position: { y: number; isAtTop: boolean };
  text: string | null;
  isMe: boolean;
};

export type MenuStoreType = {
  openMenu: (props: OpenMenuProps) => void;
  closeMenu: () => void;
  menu: MenuType;
};

const defaultMenu: MenuType = {
  isOpen: false,
  id: null,
  type: null,
  position: { y: 0, isAtTop: false },
  text: null,
  isMe: false
};

const useChatContextMenuStore = create<MenuStoreType>((set) => ({
  menu: defaultMenu,
  openMenu: ({ targetElement: { bottom, top }, ...props }: OpenMenuProps) => {
    const adjustedBottom = bottom - TOP_BAR_HEIGHT;
    const adjustedTop = top - TOP_BAR_HEIGHT;
    const isAtTop = window.innerHeight - adjustedBottom >= 250;
    const positionY = isAtTop ? adjustedBottom + 10 : adjustedTop - 10;

    set((state) => ({
      menu: {
        ...state.menu,
        isOpen: true,
        position: { y: positionY, isAtTop },
        ...props
      }
    }));
  },
  closeMenu: () => set({ menu: defaultMenu })
}));

export default useChatContextMenuStore;
