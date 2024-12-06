import { ForwardedRef, forwardRef } from 'react'
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
} from 'react-native'

export const Button = forwardRef<View, PressableProps>(
  (props: PressableProps, ref) => {
    return (
      <Pressable
        {...props}
        style={styles.button}
        ref={ref}
      ></Pressable>
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
      ></Pressable>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 18,
    maxWidth: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
})
