import { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'grommet';
import { useInfiniteQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { InView } from 'react-intersection-observer';

import { addUsersToList, selectUsers } from '../store';
import { UsersQueryResult } from '../StateInterface';

const ALL_USERS = 1000;
const PER_PAGE = 50;
const PAGES = ALL_USERS / PER_PAGE;

const Interceptor = styled(InView)`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 100vh;
`;

interface QueryParams {
  nat?: string;
}

const InterceptorComponent = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isLoading,
}: {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  isLoading: boolean;
}) => (
  <>
    <Interceptor
      onChange={(isInView) => isInView && fetchNextPage()}
      initialInView={false}
      rootMargin="40px"
      threshold={0}
    >
      <div />
    </Interceptor>

    <Button disabled>
      {isFetchingNextPage || isLoading
        ? 'Loading...'
        : hasNextPage
        ? ''
        : 'No more users to load'}
    </Button>
    {process.env.NODE_ENV === 'development' && (
      <ReactQueryDevtools initialIsOpen />
    )}
  </>
);

export const useUsersQuery = ({
  nat = 'ES',
}: QueryParams): {
  data?: UsersQueryResult[];
  Interceptor: ReactElement;
} => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);
  const {
    data: queryData,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<UsersQueryResult>(
    'users',
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `https://randomuser.me/api/?results=50&page=${pageParam}&seed=randomuser&nat=${nat}`,
      );

      return res.data;
    },
    {
      getNextPageParam: (firstPageData) => {
        const page =
          firstPageData.info.page < PAGES
            ? firstPageData.info.page + 1
            : undefined;

        return page;
      },
    },
  );

  useEffect(() => {
    if (queryData) {
      dispatch(addUsersToList(queryData));
    }
  }, [queryData, dispatch]);

  return {
    Interceptor: (
      <InterceptorComponent
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
      />
    ),
    data,
  };
};
