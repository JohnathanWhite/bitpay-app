import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  H5,
  H7,
  ListItemSubText,
  Smallest,
} from '../../../components/styled/Text';
import {
  Caution25,
  LightBlack,
  NeutralSlate,
  Success25,
  Warning25,
} from '../../../styles/colors';
import AngleRight from '../../../../assets/img/angle-right.svg';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {
  ActiveOpacity,
  Column,
  CtaContainerAbsolute,
  CurrencyColumn,
  Hr,
  Row,
} from '../../../components/styled/Containers';
import {HeaderTitle} from '../styled/WalletConnectText';
import {
  IconContainer,
  ItemContainer,
  ItemTitleContainer,
  WalletConnectContainer,
} from '../styled/WalletConnectContainers';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {sleep} from '../../../utils/helper-methods';
import haptic from '../../../components/haptic-feedback/haptic';
import {
  dismissBottomNotificationModal,
  dismissOnGoingProcessModal,
  showBottomNotificationModal,
} from '../../../store/app/app.actions';
import Clipboard from '@react-native-clipboard/clipboard';
import CopiedSvg from '../../../../assets/img/copied-success.svg';
import {FormatAmountStr} from '../../../store/wallet/effects/amount/amount';
import {Wallet} from '../../../store/wallet/wallet.models';
import {useTranslation} from 'react-i18next';
import {startOnGoingProcessModal} from '../../../store/app/app.effects';
import {
  getAddressFrom,
  walletConnectV2OnUpdateSession,
} from '../../../store/wallet-connect-v2/wallet-connect-v2.effects';
import {
  GetAmFormatDate,
  GetAmTimeAgo,
  WithinPastDay,
} from '../../../store/wallet/utils/time';
import {
  WCV2RequestType,
  WCV2SessionType,
} from '../../../store/wallet-connect-v2/wallet-connect-v2.models';
import {WALLET_CONNECT_SUPPORTED_CHAINS} from '../../../constants/WalletConnectV2';
import {BottomNotificationConfig} from '../../../components/modal/bottom-notification/BottomNotification';
import {CustomErrorMessage} from '../../wallet/components/ErrorMessages';
import {BWCErrorMessage} from '../../../constants/BWCError';
import {WalletConnectHeader} from '../WalletConnectGroup';
import {InAppNotificationContextType} from '../../../store/app/app.models';
import Blockie from '../../../components/blockie/Blockie';
import {CurrencyImage} from '../../../components/currency-image/CurrencyImage';
import {buildTestBadge} from '../../../components/list/WalletRow';
import Button from '../../../components/button/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import {BitpaySupportedCoins} from '../../../constants/currencies';
import WarningOutlineSvg from '../../../../assets/img/warning-outline.svg';
import TrustedDomainSvg from '../../../../assets/img/trusted-domain.svg';
import InvalidDomainSvg from '../../../../assets/img/invalid-domain.svg';
import {SvgProps} from 'react-native-svg';
import VerifyContextModal from '../../../components/modal/wallet-connect/VerifyModalContext';

export type WalletConnectHomeParamList = {
  topic?: string;
  selectedAccountAddress: string;
  keyId: string;
  context?: InAppNotificationContextType;
};

const SummaryContainer = styled.View`
  padding-bottom: 64px;
`;

export const NoteContainer = styled.TouchableOpacity<{isDappUri?: boolean}>`
  background-color: ${({theme}) => (theme.dark ? LightBlack : NeutralSlate)};
  border-radius: 40px;
  max-width: ${({isDappUri}) => (isDappUri ? '175px' : '126px')};
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

export const NoteLabel = styled(H7)`
  margin-left: 5px;
`;

const PRContainer = styled.View`
  flex: 1;
`;

export const ClipboardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

const BalanceColumn = styled(Column)`
  align-items: flex-end;
  margin-right: 10px;
`;

const VerifyIconContainer = styled(TouchableOpacity)`
  padding: 10px;
  border-radius: 50px;
`;

const WalletConnectHome = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {keys} = useAppSelector(({WALLET}) => WALLET);
  const [accountDisconnected, setAccountDisconnected] = useState(false);
  const [clipboardObj, setClipboardObj] = useState({copied: false, type: ''});
  const {
    params: {topic, selectedAccountAddress, keyId, context},
  } = useRoute<RouteProp<{params: WalletConnectHomeParamList}>>();
  const key = keys[keyId];
  const keyFullWalletObjs = key.wallets.filter(
    w => w.receiveAddress === selectedAccountAddress,
  );
  const [showVerifyContextBottomModal, setShowVerifyContextBottomModal] =
    useState<boolean>(false);

  // version 2
  const sessionV2: WCV2SessionType | undefined = useAppSelector(
    ({WALLET_CONNECT_V2}) =>
      WALLET_CONNECT_V2.sessions.find(session => session.topic === topic),
  );
  const requestsV2 = useAppSelector(({WALLET_CONNECT_V2}) =>
    WALLET_CONNECT_V2.requests
      .filter(request => {
        const addressFrom = getAddressFrom(request)?.toLowerCase();
        const filterWithAddress = addressFrom
          ? addressFrom === selectedAccountAddress?.toLowerCase()
          : true; // if address exist in request check if it matches with connected wallets addresses
        return request.topic === topic && filterWithAddress;
      })
      .reverse(),
  );
  const {peer} = sessionV2 || {};
  const {name: peerName, icons, url: peerUrl} = peer?.metadata || {};
  const peerIcon = icons && icons[0];
  let VerifyIcon: React.FC<SvgProps> | null = null;
  let bgColor = '';
  switch (sessionV2?.verifyContext?.verified?.validation) {
    case 'UNKNOWN':
      bgColor = Warning25;
      VerifyIcon = WarningOutlineSvg;
      break;
    case 'VALID':
      bgColor = Success25;
      VerifyIcon = TrustedDomainSvg;
      break;
    case 'INVALID':
      bgColor = Caution25;
      VerifyIcon = InvalidDomainSvg;
      break;
  }

  const showErrorMessage = useCallback(
    async (msg: BottomNotificationConfig) => {
      await sleep(500);
      dispatch(showBottomNotificationModal(msg));
    },
    [dispatch],
  );

  const disconnectAccount = async () => {
    haptic('impactLight');
    dispatch(
      showBottomNotificationModal({
        type: 'question',
        title: t('Confirm delete'),
        message: t(
          'Are you sure you want to delete this account from the connection?',
        ),
        enableBackdropDismiss: true,
        actions: [
          {
            text: t('DELETE'),
            action: async () => {
              try {
                if (sessionV2) {
                  dispatch(dismissBottomNotificationModal());
                  await sleep(600);
                  dispatch(startOnGoingProcessModal('LOADING'));
                  await sleep(600);
                  await dispatch(
                    walletConnectV2OnUpdateSession({
                      session: sessionV2,
                      address: selectedAccountAddress,
                      action: 'disconnect',
                    }),
                  );
                  dispatch(dismissOnGoingProcessModal());
                  await sleep(600);
                  setAccountDisconnected(true);
                }
              } catch (err) {
                dispatch(dismissOnGoingProcessModal());
                await sleep(500);
                await showErrorMessage(
                  CustomErrorMessage({
                    errMsg: BWCErrorMessage(err),
                    title: t('Uh oh, something went wrong'),
                  }),
                );
              }
            },
            primary: true,
          },
          {
            text: t('GO BACK'),
            action: () => {},
          },
        ],
      }),
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => WalletConnectHeader(),
    });
  }, [navigation, disconnectAccount, t]);

  const goToConfirmView = async (request: any, wallet: Wallet) => {
    try {
      dispatch(dismissBottomNotificationModal());
      await sleep(500);

      const {to: toAddress} = request.params.request.params[0];

      const recipient = {
        address: toAddress,
      };

      navigation.navigate('WalletConnectConfirm', {
        wallet: wallet,
        recipient,
        request,
        peerName,
        peerUrl,
        icons,
        topic: sessionV2?.topic!,
        selectedAccountAddress,
      });
    } catch (error: any) {
      await showErrorMessage(
        CustomErrorMessage({
          errMsg: BWCErrorMessage(error.err ? error.err : error),
          title: t('Uh oh, something went wrong'),
        }),
      );
    }
  };

  const copyToClipboard = (value: string, type: string) => {
    haptic('impactLight');
    if (!clipboardObj.copied && value) {
      Clipboard.setString(value);
      setClipboardObj({copied: true, type});

      setTimeout(() => {
        setClipboardObj({copied: false, type});
      }, 3000);
    }
  };

  const handleRequestMethod = (request: WCV2RequestType, wallet?: Wallet) => {
    const {method} = request.params.request;
    if (!wallet) {
      const chain =
        WALLET_CONNECT_SUPPORTED_CHAINS[request.params.chainId]?.chain;
      wallet = key.wallets.find(
        w => w.receiveAddress === selectedAccountAddress && w.chain === chain,
      );
    }
    if (!wallet) {
      return;
    }
    method !== 'eth_sendTransaction' && method !== 'eth_signTransaction'
      ? navigation.navigate('WalletConnectRequestDetails', {
          request,
          wallet,
          peerName,
          topic,
        })
      : goToConfirmView(request, wallet);
  };

  useEffect(() => {
    if (!clipboardObj.copied) {
      return;
    }
    const timer = setTimeout(() => {
      setClipboardObj({copied: false, type: clipboardObj.type});
    }, 3000);

    return () => clearTimeout(timer);
  }, [clipboardObj]);

  useEffect(() => {
    if (!sessionV2) {
      setAccountDisconnected(true);
    }
  }, [sessionV2]);

  useEffect(() => {
    if (accountDisconnected) {
      navigation.goBack();
    }
  }, [accountDisconnected]);

  useEffect(() => {
    if (context && ['notification'].includes(context) && requestsV2[0]) {
      handleRequestMethod(requestsV2[0]);
    }
  }, [context]);

  const closeModal = () => {
    setShowVerifyContextBottomModal(false);
  };

  const renderItem = useCallback(
    ({item, index}: {item: WCV2RequestType; index: number}) => {
      const {createdOn} = item;
      const {value = '0x0', data} = item.params.request.params[0];
      const _chain =
        WALLET_CONNECT_SUPPORTED_CHAINS[item.params.chainId]?.chain;
      const wallet = keyFullWalletObjs.find(wallet => wallet.chain === _chain);
      const {
        chain,
        network,
        currencyAbbreviation,
        tokenAddress,
        img,
        badgeImg,
        walletName,
        currencyName,
      } = wallet as Wallet;
      const amountStr = dispatch(
        FormatAmountStr(
          BitpaySupportedCoins[_chain]?.feeCurrency,
          _chain || chain,
          tokenAddress,
          parseInt(value, 16),
        ),
      );
      return (
        <TouchableOpacity
          activeOpacity={ActiveOpacity}
          onPress={() => {
            haptic('impactLight');
            handleRequestMethod(item, wallet);
          }}>
          <Row
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.dark ? LightBlack : '#ECEFFD',
              display: 'flex',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 4,
              paddingRight: 4,
              margin: 0,
              marginLeft: 6,
              marginRight: 6,
            }}>
            <CurrencyImage img={img} badgeUri={badgeImg} size={45} />
            <CurrencyColumn>
              <H5 numberOfLines={1} ellipsizeMode="tail">
                {walletName || currencyName}
              </H5>
              <ListItemSubText ellipsizeMode="tail" numberOfLines={1}>
                <Smallest>{currencyAbbreviation.toUpperCase()}</Smallest>
              </ListItemSubText>
              <Row style={{alignItems: 'center', marginLeft: 2, marginTop: 2}}>
                {buildTestBadge(network, chain, false)}
              </Row>
            </CurrencyColumn>
            <BalanceColumn>
              <H5 numberOfLines={1} ellipsizeMode="tail">
                {amountStr}
              </H5>
              <ListItemSubText ellipsizeMode="tail" numberOfLines={1}>
                {createdOn &&
                  (WithinPastDay(createdOn) ? (
                    <Smallest>
                      {t('Created ', {
                        date: GetAmTimeAgo(createdOn),
                      })}
                    </Smallest>
                  ) : (
                    <Smallest>
                      {t('Created on', {
                        date: GetAmFormatDate(createdOn),
                      })}
                    </Smallest>
                  ))}
              </ListItemSubText>
            </BalanceColumn>
            <IconContainer>
              <AngleRight />
            </IconContainer>
          </Row>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <WalletConnectContainer>
      <View style={{marginTop: 20, padding: 16, flex: 1}}>
        <SummaryContainer>
          <HeaderTitle>{t('Summary')}</HeaderTitle>
          <Hr />
          <ItemContainer>
            <H7>{t('Connected to')}</H7>
            {peerUrl && peerIcon ? (
              <ClipboardContainer>
                {clipboardObj.copied && clipboardObj.type === 'dappUri' ? (
                  <CopiedSvg width={17} />
                ) : null}
                {/* {VerifyIcon ? (
                  <VerifyIconContainer
                    style={{
                      backgroundColor: bgColor,
                    }}
                    onPress={() => setShowVerifyContextBottomModal(true)}>
                    <VerifyIcon />
                  </VerifyIconContainer>
                ) : null} */}
                <NoteContainer
                  isDappUri={true}
                  disabled={clipboardObj.copied}
                  onPress={() =>
                    peerUrl ? copyToClipboard(peerUrl, 'dappUri') : null
                  }>
                  <IconContainer>
                    <FastImage
                      source={{uri: peerIcon}}
                      style={{width: 19, height: 19}}
                    />
                  </IconContainer>
                  <NoteLabel numberOfLines={1} ellipsizeMode={'tail'}>
                    {peerUrl?.replace('https://', '')}
                  </NoteLabel>
                </NoteContainer>
              </ClipboardContainer>
            ) : null}
          </ItemContainer>
          <Hr />
          <ItemContainer>
            <H7>{t('Linked Wallet')}</H7>
            {selectedAccountAddress ? (
              <ClipboardContainer>
                {clipboardObj.copied && clipboardObj.type === 'address' ? (
                  <CopiedSvg width={17} />
                ) : null}
                <NoteContainer
                  disabled={clipboardObj.copied}
                  onPress={() =>
                    copyToClipboard(selectedAccountAddress!, 'address')
                  }>
                  <IconContainer>
                    <Blockie size={19} seed={selectedAccountAddress} />
                  </IconContainer>
                  <NoteLabel numberOfLines={1} ellipsizeMode={'middle'}>
                    {selectedAccountAddress}
                  </NoteLabel>
                </NoteContainer>
              </ClipboardContainer>
            ) : null}
          </ItemContainer>
          <Hr />
        </SummaryContainer>
        <PRContainer>
          <HeaderTitle>{t('Pending Requests')}</HeaderTitle>
          <Hr />
          {requestsV2 && requestsV2.length ? (
            <FlatList
              data={
                requestsV2 && requestsV2.length ? requestsV2 : ([] as any[])
              }
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({
                item,
                index,
              }: {
                item: WCV2RequestType;
                index: number;
              }) => renderItem({item, index})}
            />
          ) : (
            <ItemContainer>
              <ItemTitleContainer>
                <H7>{t('No pending requests')}</H7>
              </ItemTitleContainer>
            </ItemContainer>
          )}
        </PRContainer>
      </View>
      <CtaContainerAbsolute
        background={true}
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
          bottom: 20,
        }}>
        <Button
          buttonStyle="secondary"
          onPress={async () => {
            haptic('impactLight');
            disconnectAccount();
          }}>
          {t('Disconnect')}
        </Button>
      </CtaContainerAbsolute>

      {/* <VerifyContextModal
        isVisible={showVerifyContextBottomModal}
        closeModal={closeModal}
        sessionV2={sessionV2}
        onRemovePress={disconnectAccount}
      /> */}
    </WalletConnectContainer>
  );
};

export default WalletConnectHome;
