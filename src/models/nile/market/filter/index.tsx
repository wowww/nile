export type NileMarketFilterCategory = {
  key?: string;
  name?: string;
  selected?: boolean;
  children?: NileMarketFilterCategory[];
};

export type NileMarketFilterDetail = {
  status?: string[],
  price?: {
    max?: number;
    min?: number;
    unit?: string;
  }
  sorting?: string;
}

export type NileMarketSearchFilter = {
  categories: NileMarketFilterCategory[];
  detail: NileMarketFilterDetail;
}
