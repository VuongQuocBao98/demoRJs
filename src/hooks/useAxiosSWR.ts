import { AxiosError } from 'axios';
import useSWR, { Key, SWRConfiguration, SWRResponse } from 'swr';

interface Return<Data, Error>
  extends Pick<SWRResponse<Data, AxiosError<Error>>, 'isValidating' | 'error'> {
  data: Data | undefined;
  isLoading: boolean;
  mutate: any;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<Data, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}

export type UseAxiosSWRFetcher<Data> = (...args: any[]) => Promise<Data> | undefined;

export function useAxiosSWR<Data = unknown, Error = unknown>(
  key: Key,
  fetcher: UseAxiosSWRFetcher<Data> | null,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const { data, isValidating, error, mutate } = useSWR(key, fetcher, {
    ...config,

    fallbackData: fallbackData && {
      status: 200,
      statusText: 'InitialData',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      headers: {},
      data: fallbackData,
    },
  } as any);

  return {
    data,
    isValidating,
    error,
    mutate,
    isLoading: !data && !error,
  };
}
