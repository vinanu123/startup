export interface Page {
  storeData: {
    page: number;
    title: string;
    stepName: string;
    typeOfPage: string;
    isValueField?: boolean;
    tax_data?: Object;
    subTitle?: string;
    description?: string;
    fields: String[] | any;
  };
  selectedItem: Object;
  compiledData: Object | {};
  pageActive: number;
  taxData: Object | {};
}
