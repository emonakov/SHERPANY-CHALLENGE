import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'grommet';
import { useInfiniteQuery } from 'react-query';
import { InView } from 'react-intersection-observer';

import {
  addUsersToList,
  selectNat,
  selectUsers,
  addUsersFromBatch,
  addToBatch,
} from '../store';
import { buildUrl } from '../helpers/buildUrl';
import { UserDocInterface, UsersQueryResult } from '../StateInterface';

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
  isError,
}: {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  isLoading: boolean;
  isError: boolean;
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
        : isError
        ? 'Something went wrong'
        : 'No more users to load'}
    </Button>
  </>
);

export const useUsersQuery = (): {
  data?: UserDocInterface[];
  Interceptor: FC;
} => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);
  const nat = useSelector(selectNat);
  const {
    data: queryData,
    isFetchingNextPage,
    isFetched,
    isLoading,
    hasPreviousPage,
    fetchNextPage,
    hasNextPage,
    isError,
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
      getNextPageParam: (firstPageData) =>
        firstPageData.info.page < PAGES
          ? firstPageData.info.page + 1
          : undefined,
      getPreviousPageParam: (lastPageData, allPages) =>
        lastPageData.info.page < allPages[allPages.length - 1].info.page
          ? allPages[allPages.length - 1].info.page - 1
          : undefined,
    },
  );

  useEffect(() => {
    if (queryData) {
      if (!hasPreviousPage) {
        dispatch(addUsersToList(queryData));
        fetchNextPage();
      }
      if (hasPreviousPage && isFetched) {
        dispatch(addToBatch(queryData));
      }
    }
  }, [
    queryData,
    dispatch,
    hasPreviousPage,
    fetchNextPage,
    hasNextPage,
    isFetched,
  ]);

  useEffect(() => {
    if (isFetchingNextPage && hasPreviousPage) {
      dispatch(addUsersFromBatch());
    }
  }, [dispatch, hasPreviousPage, isFetchingNextPage]);

  return {
    Interceptor: () => (
      <InterceptorComponent
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isError={isError}
      />
    ),
    data,
  };
};
