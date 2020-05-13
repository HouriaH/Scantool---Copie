import * as uuid from 'uuid';

export interface Article {
  id?: uuid;
  Code: string;
  product_name: string;
  countries: string;
  nutriscore_grade: string;
}
