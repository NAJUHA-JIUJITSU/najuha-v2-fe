import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { register } from './register';
import { auth } from './auth';
import { competition } from './competition';

export const queries = mergeQueryKeys(register, auth, competition);
