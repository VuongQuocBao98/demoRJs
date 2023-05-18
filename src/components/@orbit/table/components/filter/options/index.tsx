import { Switch, Case, Default } from 'react-if';
import {
  FilterOptionType,
  TableFilterOptionProps,
  FilterOptionComProps,
  FilterOptionMetaData,
} from './types';
import { FilterOptionInput } from './FilterOptionInput';
import { FilterOptionSelect } from './FilterOptionSelect';
import { FilterOptionDRP } from './FilterOptionDRP';
import { FilterOptionDP } from './FilterOptionDP';

export function TableFilterOption(props: TableFilterOptionProps) {
  return (
    <Switch>
      <Case condition={props.compType === FilterOptionType.Input}>
        <FilterOptionInput compProps={props.compProps as FilterOptionComProps[FilterOptionType.Input]} metadata={props.metadata} />
      </Case>
      <Case condition={props.compType === FilterOptionType.Select}>
        <FilterOptionSelect
          compProps={props.compProps as FilterOptionComProps[FilterOptionType.Select]}
          metadata={props.metadata as FilterOptionMetaData[FilterOptionType.Select]}
        />
      </Case>
      <Case condition={props.compType === FilterOptionType.DateRangePicker}>
        <FilterOptionDRP
          compProps={props.compProps as FilterOptionComProps[FilterOptionType.DateRangePicker]}
          metadata={props.metadata as FilterOptionMetaData[FilterOptionType.DateRangePicker]}
        />
      </Case>
      <Case condition={props.compType === FilterOptionType.DatePicker}>
        <FilterOptionDP
          compProps={props.compProps as FilterOptionComProps[FilterOptionType.DatePicker]}
          metadata={props.metadata as FilterOptionMetaData[FilterOptionType.DatePicker]}
        />
      </Case>
      <Default>{null}</Default>
    </Switch>
  );
}
