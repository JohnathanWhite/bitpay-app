import React, {useState, useCallback} from 'react';
import debounce from 'lodash.debounce';
import styled, {css} from 'styled-components/native';
import {TouchableOpacity, FlatList, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/core';
import AddressBookIcon from '../../../../../assets/img/tab-icons/contacts.svg';
import AddIcon from '../../../../../assets/img/plus-gray.svg';
import Button from '../../../../components/button/Button';
import {
  ActiveOpacity,
  Hr,
  HEIGHT,
  WIDTH,
} from '../../../../components/styled/Containers';
import {BaseText, H4} from '../../../../components/styled/Text';
import {SlateDark, White} from '../../../../styles/colors';
import BoxInput from '../../../../components/form/BoxInput';
import {RootState} from '../../../../store';

import ContactRow, {
  ContactRowProps,
} from '../../../../components/list/ContactRow';

const ContactsContainer = styled.SafeAreaView`
  flex: 1;
`;

const ContactsHeader = styled(BaseText)`
  font-size: 18px;
  font-weight: 700;
  margin-top: ${Platform.select({
    ios: css`
      20px
    `,
    android: css`
      40px
    `,
  })};
  text-align: center;
  margin-bottom: 30px;
`;

const ZeroState = styled.View`
  height: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: center;
`;

const ZeroStateIcon = styled.View`
  display: flex;
  align-items: center;
`;

const ZeroStateTitle = styled(BaseText)`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({theme: {dark}}) => (dark ? White : SlateDark)};
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  margin-top: 40px;
`;

const ZeroStateSubTitle = styled(BaseText)`
  text-align: center;
  font-size: 12px;
  color: ${({theme: {dark}}) => (dark ? White : SlateDark)};
`;

const Title = styled(BaseText)`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme: {dark}}) => (dark ? White : SlateDark)};
  margin-left: 8px;
`;

const ContentTitle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 7px;
`;

const ContentIcon = styled.View`
  padding-right: 10px;
`;

const SectionHeaderContainer = styled.View<{justifyContent?: string}>`
  flex-direction: row;
  margin: 10px 15px;
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
`;

const horizontalPadding = 20;
const SearchBox = styled(BoxInput)`
  width: ${WIDTH - horizontalPadding * 2}px;
  font-size: 16px;
  position: relative;
`;

const SearchContainer = styled.View`
  padding: 0 ${horizontalPadding}px;
  margin-bottom: 20px;
`;

const SearchResults = styled.View`
  margin: 0 0 50px 0;
`;

const NoResultsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${HEIGHT - 300}px;
  padding-top: 20px;
`;

const NoResultsHeader = styled(H4)`
  font-size: 17px;
`;

interface HideableViewProps {
  show: boolean;
}

const HideableView = styled.View<HideableViewProps>`
  display: ${({show}) => (show ? 'flex' : 'none')};
`;

const ContactSettingsRoot: React.FC = () => {
  const contacts = useSelector(({CONTACT}: RootState) => CONTACT.list);
  const navigation = useNavigation();
  const {control} = useForm();
  const [searchResults, setSearchResults] = useState([] as ContactRowProps[]);
  const [searchVal, setSearchVal] = useState('');

  // Sort list
  contacts.sort((x, y) => {
    let a = x.name.toUpperCase(),
      b = y.name.toUpperCase();
    return a === b ? 0 : a > b ? 1 : -1;
  });

  const contactList = contacts as Array<ContactRowProps>;

  const updateSearchResults = debounce((text: string) => {
    setSearchVal(text);
    const results = contactList.filter(contact =>
      contact.name.toLowerCase().includes(text.toLocaleLowerCase()),
    );
    setSearchResults(results);
  }, 300);

  const renderItem = useCallback(
    ({item}) => (
      <ContactRow
        contact={item}
        onPress={() => {
          navigation.navigate('ContactSettings', {
            screen: 'ContactsDetails',
            params: item,
          });
        }}
      />
    ),
    [navigation],
  );

  const goToCreateContact = () => {
    navigation.navigate('ContactSettings', {
      screen: 'ContactsAdd',
    });
  };

  return (
    <ContactsContainer>
      <ContactsHeader>My Contacts</ContactsHeader>
      {contactList.length ? (
        <>
          <SearchContainer>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <SearchBox
                  placeholder={'Search Contacts'}
                  onBlur={onBlur}
                  onChangeText={(text: string) => {
                    onChange(text);
                    updateSearchResults(text);
                  }}
                  value={value}
                  type={'search'}
                />
              )}
              name="search"
            />
          </SearchContainer>
          <SectionHeaderContainer justifyContent={'space-between'}>
            <ContentTitle>
              <AddressBookIcon />
              <Title>Contacts</Title>
            </ContentTitle>
            <TouchableOpacity
              activeOpacity={ActiveOpacity}
              onPress={goToCreateContact}>
              <ContentIcon>
                <AddIcon />
              </ContentIcon>
            </TouchableOpacity>
          </SectionHeaderContainer>
          <Hr />
        </>
      ) : (
        <ZeroState>
          <ZeroStateIcon>
            <AddressBookIcon width={60} height={100} />
          </ZeroStateIcon>
          <ZeroStateTitle>No contacts yet</ZeroStateTitle>
          <ZeroStateSubTitle>
            Get started by adding your first one.
          </ZeroStateSubTitle>
          <ButtonContainer>
            <Button onPress={goToCreateContact} children="New Contact" />
          </ButtonContainer>
        </ZeroState>
      )}
      <HideableView show={!!searchVal}>
        {searchResults.length ? (
          <SearchResults>
            <FlatList
              contentContainerStyle={{paddingBottom: 250, marginTop: 5}}
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.address + index.toString()}
            />
          </SearchResults>
        ) : (
          <NoResultsContainer>
            <NoResultsHeader>No Results</NoResultsHeader>
          </NoResultsContainer>
        )}
      </HideableView>
      <HideableView show={!searchVal}>
        <SearchResults>
          <FlatList
            contentContainerStyle={{paddingBottom: 250, marginTop: 5}}
            data={contactList}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.address + index.toString()}
          />
        </SearchResults>
      </HideableView>
    </ContactsContainer>
  );
};

export default ContactSettingsRoot;
