import countryModel from "./countryModel";
import stateModel from "./stateModel";
import cityModel from "./cityModel";

export default interface hotelModel {
  id: number;
  name: string;
  details: string;
  startingPrice: number;
  checkInTime: string;
  checkOutTime: string;
  countryId?: number;
  country?: countryModel;
  cityId?: number;
  city?: cityModel;
  stateId?: number;
  state?: stateModel;
  isActive?: boolean;
  mobileNumber: number;
  address: string;
  imageURL: string;
}
