import { ForwardedRef, forwardRef } from 'react'
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export const Button = forwardRef<View, PressableProps>(
  (props: PressableProps, ref) => {
    return (
      <Pressable
        {...props}
        style={styles.button}
        ref={ref}
      >
        {props.children}
      </Pressable>
    )
  }
)

export const SmallButton = forwardRef<View, PressableProps>(
  (props: PressableProps, ref) => {
    return (
      <Pressable
        {...props}
        style={styles.smallButton}
        ref={ref}
      >
        {props.children}
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 36,
    width: 'auto',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  smallButton: {
    backgroundColor: 'white',
    color: 'black',
    height: 24,
    maxWidth: 80,
    paddingHorizontal: 5,
    paddingVertical: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
})
