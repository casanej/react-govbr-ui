export * from './alert';
export * from './button';
export * from './checkbox';
export * from './checkbox-manager';
export * from './divider';
export * from './input';
export * from './item';
export * from './loading';
export * from './menu';
export * from './table';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, fab, faTwitter)