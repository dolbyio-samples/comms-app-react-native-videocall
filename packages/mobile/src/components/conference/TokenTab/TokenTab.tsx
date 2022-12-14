import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';

import useTheme from '../../../hooks/useTheme';
import TabPill from '../../ui/TabPill/TabPill';

import styles from './TokenTab.style';

export type TabProps = {
  onSelectionChange: (index: number) => void;
};

const Tab = ({ onSelectionChange }: TabProps) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const { colors } = useTheme();
  const intl = useIntl();

  const onPress = (index: number) => {
    setToggle(index === 0);
    onSelectionChange(index);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.grey[100] }]}>
      <TabPill
        title={intl.formatMessage({ id: 'scan' })}
        icon="scan"
        isFocussed={toggle}
        onPress={() => {
          onPress(0);
        }}
      />
      <TabPill
        title={intl.formatMessage({ id: 'paste' })}
        icon="paste"
        isFocussed={!toggle}
        onPress={() => {
          onPress(1);
        }}
      />
    </View>
  );
};

export default Tab;
