import { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'grommet';
import { useInfiniteQuery } from 'react-query';
import { InView } from 'react-intersection-observer';

import { addUsersToList, selectNat, selectUsers } from '../store';
import { buildUrl } from '../helpers/buildUrl';
import { UsersQueryResult } from '../StateInterface';

const ALL_USERS = Number(process.env.REACT_APP_MAX_USERS);
const PER_PAGE = Number(process.env.REACT_APP_USERS_PER_PAGE);
const PAGES = ALL_USERS / PER_PAGE;

const Interceptor = styled(InView)`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 300vh;
`;

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
  </>
);

export const useUsersQuery = (): {
  data?: UsersQueryResult[];
  Interceptor: ReactElement;
} => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);
  const nat = useSelector(selectNat);
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
        buildUrl(String(process.env.REACT_APP_USERS_API), {
          results: PER_PAGE,
          page: pageParam,
          seed: process.env.REACT_APP_USERS_SEEDNAME,
          nat,
        }),
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
