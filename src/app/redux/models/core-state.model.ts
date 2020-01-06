import {CounterpartyModel} from "../../core/models/counterparty.model";
import {ShopModel} from "../../core/models/shop.model";

export interface CoreStateModel {
  dataTable: any[];
  dataSetName?: string;
  sorted?: {};
}
