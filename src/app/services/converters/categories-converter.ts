import { QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { languageConverter } from "./languages-converter";
import { translatedWordConverter } from "./translatedWord-converter";
export const categoriesConverter = {
    
    toFirestore: (category : Category) => {
            
        return {
            name: category.name,
            origin: languageConverter.toFirestore(category.origin),
            target: languageConverter.toFirestore(category.target),
            lastUpdateDate: category.lastUpdateDate,
            words: category.words.forEach((word) => translatedWordConverter.toFirestore(word))
            
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) : Category=> {
        const data = snapshot.data(options);
        let category = new Category(
            snapshot.id, 
            data['name'],
            languageConverter.fromFirestore(data['origin']),
            languageConverter.fromFirestore(data['target'])
        );

        category.lastUpdateDate = data['lastUpdateDate'].toDate();
        category.words = data['words'].forEach((word : any) => translatedWordConverter.fromFirestore(word))
        return category;
        
    },

   };