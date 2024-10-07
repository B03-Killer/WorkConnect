'use client';

import { create } from 'zustand';

const TOP_BAR_HEIGHT = 84;

export type OpenMenuProps = { targetElement: DOMRect } & Omit<MenuType, 'isOpen' | 'position'>;

export type MenuType = {
  isOpen: boolean;
  id: number | null;
  type: string | null;
  position: { y: number; isAtTop: boolean };
  content: string | null;
  isMe: boolean;
};

export type MenuStoreType = {
  openMenu: (props: OpenMenuProps2) => void;
  closeMenu: () => void;
  menu: MenuType;
};

export type OpenMenuProps2 = {
  event: React.TouchEvent;
} & Pick<MenuType, 'type' | 'content' | 'id' | 'isMe'>;

const defaultMenu: MenuType = {
  isOpen: false,
  id: null,
  type: null,
  position: { y: 0, isAtTop: false },
  content: null,
  isMe: false
};

const useChatContextMenuStore = create<MenuStoreType>((set) => ({
  menu: defaultMenu,
  openMenu: ({ event, ...props }: OpenMenuProps2) => {
    event.preventDefault?.();

    const { bottom, top } = (event.target as HTMLElement)
      ?.closest('[data-target="message"]')
      ?.getBoundingClientRect() ?? { bottom: 0, top: 0 };

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
