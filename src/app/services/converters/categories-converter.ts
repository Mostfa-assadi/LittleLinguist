import { QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { languageConverter } from "./languages-converter";
export const categoriesConverter = {
    
    toFirestore: (category : Category) => {
        return {
            name: category.name,
            origin: languageConverter.toFirestore(category.origin),
            target: languageConverter.toFirestore(category.target)
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) : Category=> {
        const data = snapshot.data(options);
        return new Category(
            snapshot.id, 
            data['name'],
            languageConverter.fromFirestore(data['origin']),
            languageConverter.fromFirestore(data['target'])
        );
    },

   };