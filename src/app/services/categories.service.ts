import { categories } from './../../shared/data/categories';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { DocumentSnapshot, Firestore, QuerySnapshot, deleteDoc, addDoc, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { categoriesConverter } from './converters/categories-converter';
import { translatedWordConverter } from './converters/translatedWord-converter';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private firestoreService : Firestore){}

  async getCategories() : Promise<Map<string, Category>>{
    const collectionConnection = collection(this.firestoreService, 'categories').withConverter(categoriesConverter);

    const querySnapshot: QuerySnapshot<Category> = await getDocs(collectionConnection);

    const result: Map<string, Category> = new Map<string, Category>();

    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if(data){
        result.set(data.id, data);
      }
    });

    return result;
  }



  async list() : Promise<Category[]> {
    return this.getCategories().then((result: Map<string, Category>) => (Array.from(result.values())));
  }

  async get(id : string) : Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestoreService, 'categories', id).withConverter(categoriesConverter);
    return (await getDoc(categoryDocRef)).data();
  }

  async delete(id : string) {
    const categoryDocRef = doc(this.firestoreService, 'categories', id).withConverter(categoriesConverter);
    await deleteDoc(categoryDocRef)
  }

  async update(category : Category) {
    const categoryDocRef = doc(this.firestoreService, 'categories', category.id).withConverter(categoriesConverter);
    return await setDoc(categoryDocRef, category);
  }

  async add(category : Category) {
    await addDoc(collection(this.firestoreService, 'categories').withConverter(categoriesConverter), category).then((docRef) => {
      category.id = docRef.id;
    })

  }
}
