import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '../app.state';
import { Page } from '../entity/Page';

export const ADD_COIN = 'ADD_COIN';
export const UPDATE_STORE = 'UPDATE_STORE';
export const UPDATE_COMPILED_DATA = 'UPDATE_COMPILED_DATA';
export const initialState: AppState = {
  taxStore: [],
  SelectedItem: {},
  compiledData: {},
  pageActive: 0,
  taxData: {},
};

// const _articleReducer = createReducer(
//   initialState,
//   on(ADD_COIN, (state) => {
//     return { taxStore: [], selectedItem: {}, compiledData: {} };
//   })
// );
// const _articleReducer = createReducer(
//   initialState,
//   on(ADD_COIN, (state) => {
//     return { taxStore: state, selectedItem: state, compiledData: state };
//   })
// );

export function addCoinReducer(state: any = [], action: any) {
  switch (action.type) {
    case ADD_COIN:
      // return [...state, Object.assign({}, action.payload)];

      return {
        taxStore: [
          ...(state?.taxStore || []),
          Object.assign({}, action?.payload?.storeData),
        ],
        selectedItem: action?.payload?.selectedItem,
        compiledData: action?.payload?.compiledData,
        taxData: action?.payload?.taxData,
      };

    case UPDATE_STORE:
      if (state?.taxStore) {
        let index = state?.taxStore.findIndex(
          (el: any) => el?.page == action?.payload?.storeData?.page
        );

        if (index > -1) {
          const dataState = [...state.taxStore];
          dataState.splice(index, 1);
          return {
            taxStore: [
              ...dataState,
              Object.assign({}, action?.payload?.storeData),
            ],
            pageActive: action?.payload?.pageActive,
            selectedItem: action?.payload?.selectedItem,
            compiledData: action?.payload?.compiledData,
            taxData: action?.payload?.taxData,
          };
        } else {
          return {
            taxStore: [
              ...(state?.taxStore || []),
              Object.assign({}, action?.payload?.storeData),
            ],
            pageActive: action?.payload?.pageActive,
            selectedItem: action?.payload?.selectedItem,
            compiledData: action?.payload?.compiledData,
            taxData: action?.payload?.taxData,
          };
        }
      } else {
        return {
          taxStore: [
            ...(state?.taxStore || []),
            Object.assign({}, action?.payload?.storeData),
          ],
          pageActive: action?.payload?.pageActive,
          selectedItem: action?.payload?.selectedItem,
          compiledData: action?.payload?.compiledData,
          taxData: action?.payload?.taxData,
        };
      }
      return state;
    case UPDATE_COMPILED_DATA:
      // if (state?.taxStore) {
      //   let index = state?.taxStore.findIndex(
      //     (el: any) => el?.page == action?.payload?.storeData?.page
      //   );

      //   if (index > -1) {
      //     const dataState = [...state.taxStore];
      //     dataState.splice(index, 1);
      //     return {
      //       taxStore: [
      //         ...dataState,
      //         Object.assign({}, action?.payload?.storeData),
      //       ],
      //       pageActive: action?.payload?.pageActive,
      //       selectedItem: action?.payload?.selectedItem,
      //       compiledData: action?.payload?.compiledData,
      //     };
      //   } else {
      //     return {
      //       taxStore: [
      //         ...(state?.taxStore || []),
      //         Object.assign({}, action?.payload?.storeData),
      //       ],
      //       pageActive: action?.payload?.pageActive,
      //       selectedItem: action?.payload?.selectedItem,
      //       compiledData: action?.payload?.compiledData,
      //     };
      //   }
      // } else {
      //   return {
      //     taxStore: [
      //       ...(state?.taxStore || []),
      //       Object.assign({}, action?.payload?.storeData),
      //     ],
      //     pageActive: action?.payload?.pageActive,
      //     selectedItem: action?.payload?.selectedItem,
      //     compiledData: action?.payload?.compiledData,
      //   };
      // }
      // return state;

      return {
        taxStore: state?.taxStore,
        pageActive: state?.pageActive,
        selectedItem: state?.selectedItem,
        compiledData: action?.payload,
        taxData: state?.taxData,
      };

    default:
      return state;
  }
}
