import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Statistique {
  categorie: string;
  count: number;
}

