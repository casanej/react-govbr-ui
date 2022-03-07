export * from './alert';
export * from './avatar';
export * from './button';
export * from './checkbox';
export * from './checkbox-manager';
export * from './divider';
export * from './header';
export * from './input';
export * from './item';
export * from './loading';
export * from './menu';
export * from './menu-context';
export * from './modal';
export * from './pagination';
export * from './table';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, fab, faTwitter)