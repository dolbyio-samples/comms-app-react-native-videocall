import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
import { Text } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../utils/test-utils';

import CustomText from './Text';

const { colors } = theme;

const text = 'Sample text';
const testID = 'testID';
const color = 'primary.500';
const customComponent = <Text testID="say-hello">Hello World</Text>;

describe('Text component', () => {
  test('Renders text passed as children', () => {
    const { getByText } = render(<CustomText>{text}</CustomText>);
    const regEx = new RegExp(text, 'i');
    expect(getByText(regEx)).not.toBeNull();
  });

  test('Passes TestID', () => {
    const { getByTestId } = render(<CustomText testID={testID}>{text}</CustomText>);
    expect(getByTestId(testID)).not.toBeNull();
  });

  test('Passes given styles', () => {
    const align = 'center';
    const { getByTestId } = render(
      <CustomText testID={testID} color={color} type="H3" align={align}>
        {text}
      </CustomText>,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.color).toBe(colors.primary[500]);
    expect(styles.textAlign).toBe(align);
  });

  test('Handles uppercase on/off', () => {
    const { getByTestId, rerender } = render(<CustomText testID={testID}>{text}</CustomText>);
    const element = getByTestId(testID);
    let styles = mergeStyles(element.props.style);
    expect(styles.textTransform).toBeUndefined();
    rerender(
      <CustomText testID={testID} uppercase>
        {text}
      </CustomText>,
    );
    styles = mergeStyles(element.props.style);
    expect(styles.textTransform).toBe('uppercase');
    // validate default align is left
    expect(styles.textAlign).toBe('left');
  });
});

describe('Text component snapshot', () => {
  test('should match default param configuration', () => {
    const tree = renderer.create(<CustomText testID={testID}>{text}</CustomText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match with children component', () => {
    const tree = renderer
      .create(
        <CustomText testID={testID} uppercase align="right" type="bodySmallSemiBold">
          {customComponent}
        </CustomText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
