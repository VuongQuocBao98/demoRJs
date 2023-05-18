type IQuantity = {
  total: number;
  percent: number;
  series: number[];
};

//revenue
type IDataRevenue = {
  name: string;
  data: number[]
}

type IRevenueSerie = {
  year: string;
  data: IDataRevenue[]
}

type IRevenue = {
  percent: number;
  series: IRevenueSerie[];
};

//top exam area
type ITopExamArea = {
  province: string;
  quantity: number;
};

export type IOverview = {
  totalActiveUser: IQuantity;
  totalPass: IQuantity;
  totalFail: IQuantity;
  revenue: IRevenue;
  topExamArea: ITopExamArea;
};

// ----------------------------------------------------------------------

export type IOverviewState = {
  isLoading: boolean;
  error: Error | string | null;
  overview: IOverview | null;
};
