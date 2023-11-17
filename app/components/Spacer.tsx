import React, {FC} from 'react';
import {View} from 'react-native';

export interface SpacerProps {
  /**
   * Orientation of the spacer
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Main axis size of the spacer
   */
  mainAxisSize?: number;
  /**
   * Cross axis size of the spacer
   */
  crossAxisSize?: number;
}

/**
 * Spacer is a component that allows you to add space between elements or components.
 */
export const Spacer: FC<SpacerProps> = ({
  orientation = 'vertical',
  mainAxisSize,
  crossAxisSize = 1,
}) => {
  return (
    <View
      style={[
        {
          [orientation === 'horizontal' ? 'width' : 'height']: mainAxisSize,
          [orientation === 'vertical' ? 'width' : 'height']: crossAxisSize,
        },
      ]}
    />
  );
};
