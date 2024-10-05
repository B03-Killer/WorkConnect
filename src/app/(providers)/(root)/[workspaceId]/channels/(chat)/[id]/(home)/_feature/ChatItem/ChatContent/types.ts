import type { StrictNextImagePropsType } from '@/types/common';
import type { ComponentProps } from 'react';

type VideoTypes = Omit<ComponentProps<'video'>, 'width' | 'height'>;
type ImageTypes = Omit<ComponentProps<'img'>, 'width' | 'height'>;

export type ChatImageProps = Omit<StrictNextImagePropsType, 'alt'> & Partial<Pick<StrictNextImagePropsType, 'alt'>>;
export type ChatNoticeProps = ComponentProps<'div'> & { noticeUrl: string; content: string };
export type ChatVideoProps = VideoTypes & ImageTypes & Partial<Pick<StrictNextImagePropsType, 'width' | 'height'>>;
export type ChatTextProps = ComponentProps<'div'> & { content: string };
export type ChatFileProps = ComponentProps<'button'> & { name: string; href: string };
