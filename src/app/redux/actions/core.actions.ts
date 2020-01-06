import {createAction, props} from "@ngrx/store";
import {ShopModel} from "../../core/models/shop.model";
import {CounterpartyModel} from "../../core/models/counterparty.model";


export const fetchShopTableData = createAction('[General] Core Table Data', props<{ tabData: ShopModel[] }>());
export const fetchCounterpartyTableData = createAction('[General] Core Table Data', props<{ tabData: CounterpartyModel[] }>());
export const editShopTableData = createAction('[General] Edit Shops Entity', props<{ changedShop: ShopModel }>());
export const editCounterpartyTableData = createAction('[General] Edit Counterparties Entity', props<{ changedCounterparty: CounterpartyModel }>());
export const addShopTableData = createAction('[General] Create New Shops Entity', props<{ newShop: ShopModel }>());
export const addCounterpartyTableData = createAction('[General] Create New Shops Entity', props<{ newCounterparty: CounterpartyModel }>());
