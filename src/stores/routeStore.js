import { writable } from 'svelte/store';
import ROUTES from '../constants/routes';

const routeStore = writable(ROUTES.home);

export default routeStore;
