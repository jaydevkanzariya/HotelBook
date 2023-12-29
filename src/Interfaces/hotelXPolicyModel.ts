import hotelModel from "./hotelModel";
import policyModel from "./policyModel";

export default interface hotelXPolicyModel {
  id: number;
  cityName: string;
  hotelId?: number;
  hotel?: hotelModel;
  policyId?: number;
  policy?: policyModel;
}
