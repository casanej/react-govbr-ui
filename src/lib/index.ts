export * from './alert';
export * from './checkbox';
export * from './checkbox-manager';
export * from './button';
export * from './input';
export * from './loading';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, fab)