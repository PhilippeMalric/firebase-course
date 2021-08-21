import firebase from 'firebase/app';
import { Variable } from './variable';
import Timestamp = firebase.firestore.Timestamp;

export interface Dataset {
  id: string;
  description: string;
  url:string;
  longDescription: string;
  iconUrl: string;
  seqNo:number;
  categories: string[];
  variablesCount: number;
  rowsCount:number;
  startAt: Timestamp;
  variable:Variable[];
}

