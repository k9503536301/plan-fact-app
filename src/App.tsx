import { createBrowserRouter, RouterProvider, defer, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getWorkList } from './service/getWorkList';

import { Table } from './tables/Table';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/summary',
    element: <Table />,
    loader: async () => {
      const existingData = queryClient.getQueryData(['workList']);
      if (existingData) {
        return defer({ workList: existingData });
      }
      return defer({ workList: queryClient.fetchQuery({ queryKey: ['workList'], queryFn: getWorkList }) });
    },
  },
  {
    path: '/',
    element: <Navigate to="summary" replace />,
  },
]);


const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
