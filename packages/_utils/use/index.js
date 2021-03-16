import { useBEM } from './bem';
export function use(name) {
  name = 'fgo-' + name;
  return [useBEM(name)];
}