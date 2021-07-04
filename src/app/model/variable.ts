import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Variable {
  nom: string;
  data: string[];
  type:string;
  seqNo:number;
}

