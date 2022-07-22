import { INameValueMapping } from "./INameValueMapping";

/**
 * Has to be corrected, if product or productSnapshot is changed.
 */
export interface ICompleteProduct {
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  image: string;
  websitename: string;
  additionalfields?: INameValueMapping[];
  price: number;
  available: boolean;
  availability: string;
}
