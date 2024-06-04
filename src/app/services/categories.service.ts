import { categories } from './../../shared/data/categories';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { DocumentSnapshot, Firestore, QuerySnapshot, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { categoriesConverter } from './converters/categories-converter';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly NEXT_ID_KEY = 'nextId';

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

  get(id : number) : Category | undefined {
    return this.getCategories().get(id);
  }

  delete(id : number) : void {
    let categoriesMap = this.getCategories();
    categoriesMap.delete(id);
    this.setCategories(categoriesMap);
  }

  update(category : Category) : void {
    let categoriesMap = this.getCategories();

    category.lastUpdateDate = new Date();
    categoriesMap.set(category.id, category);

    this.setCategories(categoriesMap);
  }

  async add(category : Category) {
    await addDoc(collection(this.firestoreService, 'categories').withConverter(categoriesConverter), category);

  }
}
