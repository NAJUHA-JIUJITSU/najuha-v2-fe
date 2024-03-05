import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { register } from './register';
import { auth } from './auth';

export const queries = mergeQueryKeys(register, auth);
