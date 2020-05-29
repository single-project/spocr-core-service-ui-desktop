export interface Data {
  surname?: any;
  name: string;
  patronymic?: any;
  gender: string;
  source?: any;
  qc: string;
}

export interface FioSuggestion {
  value: string;
  unrestricted_value: string;
  data: Data;
}

export interface SuggestionFioRoot {
  suggestions: FioSuggestion[];
}



