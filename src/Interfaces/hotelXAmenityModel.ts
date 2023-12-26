import hotelModel from "./hotelModel";
import amenityModel from "./amenityModel";

export default interface hotelXAmenityModel {
  id: number;
  cityName: string;
  hotelId?: number;
  hotel?: hotelModel;
  amenityId?: number;
  amenity?: amenityModel;
}
