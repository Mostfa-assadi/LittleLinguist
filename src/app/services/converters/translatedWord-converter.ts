import { TranslatedWord } from "../../../shared/model/translated-word";


export const translatedWordConverter = {
    fromFirestore: (translatedWord : any) : TranslatedWord => {
        return new TranslatedWord(translatedWord['origin'], translatedWord['target']);
    },
    toFirestore: (translatedWord: TranslatedWord)   => {
        return {
            origin: translatedWord.origin,
            target: translatedWord.target
        };
    }
};