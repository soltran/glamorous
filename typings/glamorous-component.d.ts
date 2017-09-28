import {CSSProperties} from './css-properties'

import {Component, GlamorousOptions} from './glamorous';

import {Omit} from './helpers'

/**
* `glamorousComponentFactory` returns a ComponentClass
*
* @see {@link https://github.com/paypal/glamorous/blob/master/src/create-glamorous.js#L28-L131}
*/

export interface ExtraGlamorousProps {
  /**
   * Called with the inner element's reference
   */
  innerRef?: (instance: any) => void

  className?: string
  /**
   * Same type as any of the styles provided, will be merged with this component's styles and take highest priority over the component's predefined styles
   */
  css?: CSSProperties
  theme?: object
}

export interface GlamorousComponentFunctions<ExternalProps, Props> {
  /**
   * Copies the styles of an already created glamorous component with a different tag
   */
  withComponent: (
    component: string | Component<Props>,
  ) => GlamorousComponent<ExternalProps, Props>

  /**
   * Applies props by default for a component
   */
  withProps: <DefaultProps extends object>(
    props: DefaultProps,
  ) => GlamorousComponent<ExternalProps & Partial<DefaultProps>, Props>

  /**
   * Primarily for tooling, applies config for a component
   */
  withConfig: <Context = object, DefaultProps extends object = object>(
    config: Partial<GlamorousOptions<Props, Context, DefaultProps>>
  ) => GlamorousComponent<ExternalProps & Partial<DefaultProps>, Props>
}

export interface GlamorousComponent<ExternalProps, Props>
  extends React.ComponentClass<ExternalProps & ExtraGlamorousProps>,
    GlamorousComponentFunctions<ExternalProps, Props> {}

export type GlamorousComponentProps<ExternalProps> = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<
    React.Component<ExtraGlamorousProps & ExternalProps, React.ComponentState>
  > &
  ExternalProps & {children?: React.ReactNode}
