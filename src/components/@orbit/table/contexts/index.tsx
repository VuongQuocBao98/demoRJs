import { ComponentType, ForwardedRef } from 'react';
import { TableParamsProvider } from './TableParamsCtx';
import { TableSelectProvider } from './TableSelectCtx';
import { RemoteTableMethods } from '../components/RemoteDataTable';
import { TableOptionProvider } from './TableOptionCtx';

export function withTableProvider<T>(WrappedComponent: ComponentType<T>) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function ComponentWithTableProvider(props: T & { tableRef?: ForwardedRef<RemoteTableMethods> }) {
    return (
      <TableOptionProvider>
        <TableParamsProvider>
          <TableSelectProvider>
            <WrappedComponent {...props} ref={props.tableRef} />
          </TableSelectProvider>
        </TableParamsProvider>
      </TableOptionProvider>
    );
  }

  ComponentWithTableProvider.displayName = `withTheme(${displayName})`;

  return ComponentWithTableProvider;
}
