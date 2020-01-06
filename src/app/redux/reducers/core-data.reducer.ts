import {CoreStateModel} from "../models/core-state.model";
import {Action, createReducer, on} from "@ngrx/store";
import * as CoreActions from "../actions/core.actions"

const initialState: CoreStateModel = {
  dataTable: [],
  dataSetName: '',
  sorted: {}
};

const coreReducer = createReducer(
  initialState,
  on(CoreActions.fetchShopTableData, (state, {tabData}) => ({...state, dataTable: tabData})),
  on(CoreActions.fetchCounterpartyTableData, (state, {tabData}) => ({...state, dataTable: tabData})),
  on(CoreActions.addCounterpartyTableData, (state, {newCounterparty}) => ({
    ...state,
    dataTable: [...state.dataTable, newCounterparty]
  })),
  on(CoreActions.addShopTableData, (state, {newShop}) => ({
    ...state,
    dataTable: [...state.dataTable, newShop]
  })),
  on(CoreActions.editCounterpartyTableData, (state, {changedCounterparty}) => ({
    ...state, dataTable: [...state.dataTable.filter(c => {
      if (c.id === changedCounterparty.id) {
        c.name = changedCounterparty.name;
        c.active = changedCounterparty.active;
        c.version = changedCounterparty.version;
      }
    })]
  })),
  on(CoreActions.editShopTableData, (state, {changedShop}) => ({
    ...state, dataTable: [...state.dataTable.filter(s => {
      if (s.id === changedShop.id) {
        s.name = changedShop.name;
        s.counterparty = changedShop.counterparty;
        s.active = changedShop.active;
        s.version = changedShop.version;
      }
    })]
  })),
);

export function reducer(state: CoreStateModel | undefined, action: Action) {
  return coreReducer(state, action);
}
