'use client';

import { isEmpty } from '@/utils/isEmpty';
import {
  SearchCardContent,
  SearchCardStatus,
  SearchCardThumbnail,
  SearchCardTitle,
  SearchCardWrapper
} from './SearchMemberCard';
import { CheckFillIcon, UnCheckIcon } from '@/icons';
import { useSearch } from '../_hooks/useSearch';
import useChatSearchUsersStore from '@/store/chatSearchUserStore';

const SearchResults = () => {
  const { handleSelectUser, selectedUsers } = useChatSearchUsersStore();
  const { searchUsers } = useSearch();

  if (isEmpty(searchUsers)) {
    return <div className="text-gray-500 text-center">검색 결과가 없어요</div>;
  }

  return (
    <ul className="lg:flex lg:flex-wrap lg:gap-y-6 lg:mb-8">
      {searchUsers?.map((result) => (
        <SearchCardWrapper key={result.id} onClick={() => handleSelectUser(result)}>
          <SearchCardContent>
            <SearchCardThumbnail src={result.profile_image ?? undefined} />
            <SearchCardTitle>{result.name}</SearchCardTitle>
          </SearchCardContent>
          <SearchCardStatus>
            {selectedUsers.some((user) => user.id === result.id) ? <CheckFillIcon /> : <UnCheckIcon />}
          </SearchCardStatus>
        </SearchCardWrapper>
      ))}
    </ul>
  );
};

export default SearchResults;
