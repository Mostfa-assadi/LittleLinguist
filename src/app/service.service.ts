import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  idxCategory: Map<number, Category>;
  nextId: number;

  constructor(){      
    this.idxCategory = new Map<number, Category>();
    this.nextId = 0;

      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key !== null){
          let value = localStorage.getItem(key);
          if(value !== null){
            let id : number = JSON.parse(key);
            let c : Category = JSON.parse(value);
            this.idxCategory.set(id, c);
            if (c.category_id > this.nextId){
              this.nextId = c.category_id;
            }
              
          }
      }}
      this.nextId++;
    }
    
        
    add_word_to_category(category:Category, new_source_word: string, new_target_word:string){
      category.words_list.push(new synonym(new_source_word, new_target_word));
    }
    
    delete_word_from_category(category:Category, synonym: synonym){
      const index = category.words_list.indexOf(synonym, 0);
      if (index > -1) {
        category.words_list.splice(index, 1);
     }
    
    }

  add_category(category: Category): void {
    category.last_edit_date = new Date(Date.now());
    this.idxCategory.set(category.category_id, category);
    localStorage.setItem(JSON.stringify(category.category_id), JSON.stringify(category));

  }

  update_category(category: Category){
    category.last_edit_date = new Date(Date.now());
    if (this.idxCategory.has(category.category_id)){
      this.idxCategory.delete(category.category_id);
      localStorage.removeItem(JSON.stringify(category.category_id));
      localStorage.setItem(JSON.stringify(category.category_id), JSON.stringify(category));
      this.idxCategory.set(category.category_id, category);
  
    }


  } 
  open_new_category() : Category{
    let c : Category = new Category("", this.nextId, []);
    
    this.nextId++;
    
    return c;  
  }

  delete_category(id: number): void{
    if (this.idxCategory.has(id)){
      this.idxCategory.delete(id);
      localStorage.removeItem(JSON.stringify(id));
    }
  }

  edit_category(category: Category){
    if(this.idxCategory.has(category.category_id)){
      category.last_edit_date = new Date(Date.now());
      localStorage.removeItem(JSON.stringify(category.category_id));
      localStorage.setItem(JSON.stringify(category.category_id), JSON.stringify(category));
      this.idxCategory.set(category.category_id, category);


    }
  }
  get_categories(): Category[]{

    let res: Category[] = Array.from(this.idxCategory.values());
    res.sort((a:Category, b:Category) => b.category_name.localeCompare(a.category_name));
    return res;
  }
  get_category(id:number) : Category {
      if (this.idxCategory.has(id)) {
        return this.idxCategory.get(id)!;

      }
      else{
          throw  ("category does not exist with id: " + id)
        }
  }



}

export class synonym {
  Origin: string;
  Dest: string;
  constructor( Origin:string, Dest:string){
    this.Origin = Origin;
    this.Dest = Dest;
  }
}
export enum Language {English = 0, Hebrew = 1};

export class Category {
  category_name: string;
  category_id: number;
  last_edit_date: Date;
  source_language: Language;
  target_language: Language;
  words_list: synonym[];

  constructor(category_name: string, category_id:number, words:synonym[]){
      this.category_name = category_name;
      this.category_id = category_id;
      this.source_language = Language.English;
      this.target_language = Language.Hebrew;
      this.last_edit_date = new Date(Date.now());
      this.words_list = words;

      
  };
  get_words():synonym[]{
    return this.words_list;
  };


  add_word(word: string, meaning: string) : void{
    this.words_list.push(new synonym(word, meaning));
  };

};

