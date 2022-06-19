import { Page } from './entity/Page';

export interface AppState {
  taxStore: Page[];
  pageActive: number;
  SelectedItem: Object;
  compiledData: Object | {};
  taxData: Object | {};
}
