<template>
  <div class="container">
    <div class="form-group">
      <div class="form-border"></div>
      <div class="card" :class="[{reversed: !isFrontNow}]">
        <div class="front">
          <div class="focus-square" :style="focusSquareStyle"></div>
          <section class="section card-num" ref="cardNumSection">
            <div v-for="i in 16" :key="i" class="card-num-char card-text">
              <transition name="fade-vertical">
                <span
                  v-if="form.cardNumber.charAt(i - 1)"
                  key="filled"
                >{{form.cardNumber.charAt(i - 1)}}</span>
                <span v-else key="empty">#</span>
              </transition>
            </div>
          </section>
          <section class="section card-holders" ref="cardHoldersSection">
            <title class="section-title">Card Holders</title>
            <div class="card-text card-holders-text">
              <transition name="fade-vertical">
                <span v-if="form.cardHolders.length === 0">FULL NAME</span>
                <transition-group v-else name="card-holders-char">
                  <span
                    v-for="i in form.cardHolders.length"
                    :key="i"
                    class="card-holders-char"
                  >{{ form.cardHolders.charAt(i - 1).toUpperCase() }}</span>
                </transition-group>
              </transition>
            </div>
          </section>
          <section class="section expiration-date" ref="expirationDateSection">
            <div class="expiration-date card-text">
              <transition name="fade-vertical">
                <span v-if="!form.expirationMonth" key="empty-month">MM</span>
                <template v-for="m in monthOption">
                  <span
                    v-if="m === form.expirationMonth"
                    :key="`month-${m}`"
                  >{{form.expirationMonth}}</span>
                </template>
              </transition>
              <span>/</span>
              <transition name="fade-vertical">
                <span v-if="!form.expirationYear" key="empty-year">YY</span>
                <template v-for="y in yearOption">
                  <span v-if="y === form.expirationYear" :key="`year-${y}`">{{form.expirationYear}}</span>
                </template>
              </transition>
            </div>
          </section>
        </div>
        <div class="back">
          <section class="section cvv">
            <div>{{form.cvv}}</div>
          </section>
        </div>
      </div>
      <form>
        <div class="form">
          <label>
            Card Number
            <input
              type="tel"
              maxlength="16"
              v-on:focus="onFocus(FormType.CardNumber)"
              v-on:blur="onBlur"
              v-model="form.cardNumber"
            />
          </label>
        </div>
        <div class="form">
          <label>
            Card Holders
            <input
              @focus="onFocus(FormType.CardHolders)"
              @blur="onBlur"
              v-model="form.cardHolders"
            />
          </label>
        </div>
        <div class="flex">
          <div class="form">
            <label>Expiration Date</label>
            <div class="flex">
              <select
                v-on:focus="onFocus(FormType.ExpirationMonth)"
                v-on:blur="onBlur"
                v-model="form.expirationMonth"
              >
                <option disabled>Month</option>
                <option v-for="m in monthOption" :key="m">{{ m }}</option>
              </select>
              <select
                v-on:focus="onFocus(FormType.ExpirationYear)"
                v-on:blur="onBlur"
                v-model="form.expirationYear"
              >
                <option disabled>Year</option>
                <option v-for="y in yearOption" :key="y">{{ y }}</option>
              </select>
            </div>
          </div>
          <div class="form">
            <label>
              CVV
              <input type="tel" v-on:focus="onFocus(FormType.CVV)" v-model="form.cvv" />
            </label>
          </div>
        </div>
        <button type="submit" class="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';

enum FormType {
  CardNumber,
  CardHolders,
  ExpirationYear,
  ExpirationMonth,
  CVV,
}

enum Side {
  Front,
  Back,
}

const FormSide = {
  [FormType.CardNumber]: Side.Front,
  [FormType.CardHolders]: Side.Front,
  [FormType.ExpirationYear]: Side.Front,
  [FormType.ExpirationMonth]: Side.Front,
  [FormType.CVV]: Side.Back,
};

@Component
export default class CreditCard extends Vue {
  get isFrontNow() {
    if (this.focused === null) {
      return true;
    }
    return this.isFront(this.focused);
  }

  get FormType() {
    return FormType;
  }

  get monthOption() {
    return Array.from(Array(12).keys())
      .map((v) => String(v + 1))
      .map((v) => v.padStart(2, '0'));
  }

  get yearOption() {
    return Array.from(Array(10).keys())
      .map((v) => String(new Date().getFullYear() - 2000 + v))
  }

  @Ref() public cardNumSection!: HTMLElement;
  @Ref() public cardHoldersSection!: HTMLElement;
  @Ref() public expirationDateSection!: HTMLElement;
  @Ref() public focusSquare!: HTMLDivElement;

  public form = {
    cardNumber: '',
    cardHolders: '',
    expirationYear: '',
    expirationMonth: '',
    cvv: '',
  };

  public focused: FormType | null = null;


  public isFront(formType: FormType) {
    return FormSide[formType] === Side.Front;
  }

  public initialFocusSquareStyle = () => ({
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
  })

  public focusSquareStyle = this.initialFocusSquareStyle();

  public isBack(formType: FormType) {
    return FormSide[formType] === Side.Back;
  }

  public onFocus(formType: FormType) {
    this.focused = formType;
    if (this.focused === null || !this.isFrontNow) {
      this.focusSquareStyle = this.initialFocusSquareStyle();
      return;
    }

    let focused = null;
    if (this.focused === FormType.CardNumber) {
      focused = this.cardNumSection;
    } else if (this.focused === FormType.CardHolders) {
      focused = this.cardHoldersSection;
    } else if (
      this.focused === FormType.ExpirationYear ||
      this.focused === FormType.ExpirationMonth
    ) {
      focused = this.expirationDateSection;
    }
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = focused!;
    this.focusSquareStyle.top = `${offsetTop - 8}px`;
    this.focusSquareStyle.left = `${offsetLeft - 10}px`;
    this.focusSquareStyle.width = `${offsetWidth}px`;
    this.focusSquareStyle.height = `${offsetHeight + 16}px`;
    this.focusSquareStyle.opacity = '1';
  }

  public onBlur() {
    this.focused = null;
    this.focusSquareStyle = this.initialFocusSquareStyle();
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  width: 480px;
  padding: 16px;
  position: relative;

  .form-border {
    border: solid 1px dodgerblue;
    border-radius: 10px;
    width: 100%;
    height: 75%;
    position: absolute;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }
}

.form {
  margin-top: 12px;
  margin-bottom: 12px;

  label {
    font-size: small;
  }

  input {
    height: 24px;
    display: block;
    width: 100%;
  }

  select {
    height: 24px;
  }
}

button.submit {
  background-color: royalblue;
  color: whitesmoke;
  width: 100%;
  height: 40px;
  font-size: large;
  border-radius: 10px;
}

.flex {
  display: flex;

  > * {
    margin-left: 8px;
    margin-right: 8px;
  }
}
.fade-vertical-enter-active,
.fade-vertical-leave-active {
  transition: all 0.3s;
}

.fade-vertical-leave-active {
  position: absolute;
}

.fade-vertical-enter {
  opacity: 0;
  transform: translateY(50%);
}

.fade-vertical-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

.card-holders-char-enter-active,
.card-holders-char-leave-active {
  transition: all 0.2s;
}

.card-holders-char-enter {
  opacity: 0;
  transform: rotate(45deg) translate(6px, 6px);
}

.card-holders-char-leave-to {
  opacity: 0;
  transform: rotate(-45deg) translate(-6px, -6px);
}

.card {
  background-color: #222222;
  width: 480px;
  height: 240px;
  border-radius: 10px;
  position: relative;
  transition: transform 1s ease-in-out;

  .front,
  .back {
    transition: opacity 0.5s steps(1, end);
  }

  .back {
    opacity: 0;
  }

  &.reversed {
    transform: rotateY(180deg);

    .front {
      opacity: 0;
    }

    .back {
      opacity: 1;
    }
  }

  .card-text {
    color: white;
    font-size: x-large;

    > span {
      display: inline-block;
    }
  }

  .focus-square {
    position: absolute;
    transition: all 0.5s;
    border-radius: 10px;
    border: solid 2px whitesmoke;
  }

  .section {
    .section-title {
      color: whitesmoke;
    }

    &.card-num {
      display: flex;
      position: absolute;
      top: 35%;
      left: 13%;
      height: 36px;

      .card-num-char {
        min-width: 0.8em;
        min-height: 1rem;
        &:nth-child(4n) {
          margin-right: 16px;
        }
      }
    }

    &.card-holders {
      position: absolute;
      bottom: 10%;
      left: 10%;
      height: 32px;
      width: 60%;

      .card-holders-text {
        position: relative;
      }

      .card-holders-char {
        display: inline-block;
        min-width: 0.5rem;
      }
    }

    &.expiration-date {
      position: absolute;
      bottom: 10%;
      right: 10%;
      width: 22%;
    }

    &.cvv {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: whitesmoke;
      width: 90%;
      transform: translate(-50%, -50%) rotateY(180deg);
      height: 15%;
      border-radius: 10px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>