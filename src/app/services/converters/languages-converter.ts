import { Language } from "../../../shared/model/language";

export const languageConverter = {
    fromFirestore: (language: string) : Language => {
        if (language === 'hebrew') return Language.Hebrew;
        else if (language === 'english') return Language.English;
        return Language.English
    },
    toFirestore: (language: Language): string => {
        if (language === Language.Hebrew) return 'hebrew';
        else if (language === Language.English) return 'english';
        return '';
    }
};