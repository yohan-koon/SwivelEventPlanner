import { TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Text } from './Text'
import { Spacer } from './Spacer'
import { spacing } from '../theme'

/**
 * Used static data as requested in the task
 */
const eventName = 'Event Name'
const eventLocation = "56 O'Mally Road, ST LEONARDS, 2065, NSW"

interface EventInfoProps {
  /**  
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

export const EventInfo: FC<EventInfoProps> = ({ style: $styleOverride}) => {
  return (
    <View style={[$root, $styleOverride]}>
        <Text text={eventName} preset='h3' style={$eventName}/>
        <Spacer mainAxisSize={spacing.md}/>
        <Text tx={eventLocation} size='xxs'/>
      </View>
  )
}

const $root: ViewStyle = {

}

const $eventName: TextStyle = {
  fontWeight: '500'
}