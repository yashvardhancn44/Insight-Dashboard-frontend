export type InsightSummaryType = {
  total_queries: number;
  successful_queries: number;
  failed_queries: number;
  average_response_time: number;
};

export type CategoryDistributionType = {
  small_talk: number;
  tech_support: number;
  sales_inq: number;
  customer_service: number;
};

export type ResponseTimeType = {
  day_wise: { date: string; average_time: number }[];
  week_wise: { week: string; average_time: number }[];
};

export type UserSatisfactionType = {
  ratings: { rating: number; count: number }[];
};

export type UsageStatisticsType = {
  by_platform: {
    iOS: number;
    Android: number;
    Web: number;
  };
  by_country: {
    USA: number;
    India: number;
    Germany: number;
    Japan: number;
    Brazil: number;
  };
};

export type AIDATA = {
  insight_summary: InsightSummaryType;
  category_distribution: CategoryDistributionType;
  response_times: ResponseTimeType;
  user_satisfaction: UserSatisfactionType;
  usage_statistics: UsageStatisticsType;
};
