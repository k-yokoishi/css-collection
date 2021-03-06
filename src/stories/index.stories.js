/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

// import MyButton from '../components/MyButton.vue'
import BouncingLoader from '../components/BouncingLoader'
import CircleSpinner from '../components/CircleSpinner'
import Toaster from '../components/Toaster'
import FAB from '../components/FAB'
import CreditCard from '../components/CreditCard'

storiesOf('Loader', module)
  .add('Bouncing', () => ({
    components: { BouncingLoader },
    template: '<bouncing-loader></bouncing-loader>'
  }))
  .add('Spinner (scale)', () => ({
    components: { CircleSpinner },
    template: '<circle-spinner></circle-spinner>'
  }))

storiesOf('FAB', module).add('show items', () => ({
  components: { FAB },
  template: '<FAB></FAB>'
}))

storiesOf('Toast', module).add('fade in-out', () => ({
  components: { Toaster },
  data() {
    return {
      toasted: false
    }
  },
  methods: {
    toggleToast() {
      this.toasted = !this.toasted
    }
  },
  template: `
  <div>
    <button @click="toggleToast">Show toast</button>
    <toaster :show="toasted">Disappear after few sec!</toaster>
  </div>
  `
}))

storiesOf('Credit Card', module).add('Credit Card', () => ({
  components: { CreditCard },
  template: '<credit-card></credit-card>'
}))

// storiesOf('Button', module)
//   .add('with text', () => ({
//     components: { MyButton },
//     template: '<my-button @click="action">Hello Button</my-button>',
//     methods: { action: action('clicked') }
//   }))
//   .add('with JSX', () => ({
//     components: { MyButton },
//     render() {
//       return <my-button onClick={this.action}>With JSX</my-button>
//     },
//     methods: { action: linkTo('Button', 'with some emoji') }
//   }))
//   .add('with some emoji', () => ({
//     components: { MyButton },
//     template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
//     methods: { action: action('clicked') }
//   }))
