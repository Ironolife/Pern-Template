import React, { FC, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const ReactQueryProvider: FC = ({ children }) => {
  const client = useMemo(() => new QueryClient(), []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
