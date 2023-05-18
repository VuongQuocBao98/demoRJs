import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

type IProps = {
  fn: Function;
  addParams?: object;
};

const useAutocomplete = ({ fn, addParams }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const getOptions = async (SearchContent: string) => {
    setIsLoading(true);
    try {
      const { data }: any = await fn({
        PageSize: 20,
        PageIndex: 1,
        SearchContent,
        ...addParams,
      });
      if (data && data.items) {
        setOptions(data.items);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOptions('');
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(getOptions, 1000), []);

  return { isLoading, options, debounceFn };
};

export default useAutocomplete;
