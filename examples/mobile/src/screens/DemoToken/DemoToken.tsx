import {
  Layout,
  TokenTab,
  Text,
  useToken,
} from '@dolbyio/comms-uikit-react-native';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import {ConferenceCreateHeader} from '../../components/ConferenceCreateHeader/ConferenceCreateHeader';
import Footer from '../../components/Footer';
import {Routes} from '../../types/routes.types';
import tokenStorage from '../../utils/tokenStorage.util';
import {validateToken} from '../../utils/validation.util';
import InputToken from '../InputToken';
import ScanToken from '../ScanToken';

export const DemoToken = ({navigation}) => {
  const {storeToken} = tokenStorage();
  const {setToken} = useToken();
  const [switchTab, setSwtichTab] = useState<boolean>(true);
  const [showError, setError] = useState<boolean>(false);

  const onToken = (token: string) => {
    if (validateToken(token)) {
      setError(false);
      storeToken(token);
      setToken(token);
      navigation.navigate(Routes.Home);
    } else {
      setError(true);
    }
  };

  const onTabChange = (index: number) => {
    setError(false);
    setSwtichTab(index === 0);
  };

  return (
    <Layout>
      <SafeAreaView style={{flex: 1}}>
        <ConferenceCreateHeader />
        <Text
          type="h2"
          align="center"
          color="grey.800"
          style={{paddingTop: 40}}>
          Provide a demo token
        </Text>
        <Text
          type="paragraph"
          align="center"
          color="grey.500"
          style={{paddingTop: 8, paddingBottom: 24}}>
          In order to use this app you need to provide a token from your Dolby
          IO dashboard.
        </Text>
        <TokenTab onSelectionChange={onTabChange} />
        <View style={{height: 40}} />
        {switchTab ? (
          <ScanToken onToken={onToken} />
        ) : (
          <InputToken onToken={onToken} />
        )}
        {showError && (
          <Text
            type="captionRegular"
            align="center"
            color="infoError"
            style={{paddingTop: 8}}>
            The demo token is invalid or has expired. Please verify.
          </Text>
        )}
      </SafeAreaView>
      <Footer />
    </Layout>
  );
};
