<template>
    <div class="login">
      <div class="content">
        <div class="copy">
          <div class="create-an-account">Sign in</div>
          <div class="enter-your-email-to-sign-up-for-this-app">
            Enter your email to sign in for this app
          </div>
        </div>
        <div class="input-and-button">
          <div class="field">
            <div class="label">test@email.com</div>
          </div>
          <div class="field">
            <div class="label">password</div>
          </div>
          <!-- <div class="button"> -->
            <button class="button" @click="login">Sign in with email</button>
          <!-- </div> -->
        </div>
        <div class="divider">
          <div class="rectangle-11"></div>
          <div class="or-continue-with">or continue with</div>
          <div class="rectangle-10"></div>
        </div>
        <div class="form-group d-flex justify-content-center">
            <a href="http://localhost:9080">
            <img class="bi me-2" width="55" height="55" src="../../../src/assets/google.png" />
            </a>
            <a href="http://localhost:9080">
              <img class="bi me-2" width="55" height="55" src="../../../src/assets/naver.png" />
            </a>
            <a href="http://localhost:9080">
              <img class="bi me-2" width="55" height="55" src="../../../src/assets/kakao.png" />
            </a>
          </div>
        <div
          class="by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy"
        >
          <span>
            <span
              class="by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span"
            >
              By clicking continue, you agree to our
            </span>
            <span
              class="by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span2"
            >
              Terms of Service
            </span>
            <span
              class="by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span3"
            >
              and
            </span>
            <span
              class="by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span4"
            >
              Privacy Policy
            </span>
          </span>
        </div>
      </div>
    </div>
  </template>
  import { useRouter } from "vue-router";
  <script>

  export default {
    name: "LoginView",
    components: {},
    props: {},
    data() {},
    methods: {

      login() {
        this.$router.push({ path: '/' });
      }
    }
  };
  </script>
  <style scoped>
  .login,
  .login * {
    box-sizing: border-box;
  }
  .login {
    background: #ffffff;
    height: 900px;
    position: relative;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: flex-start;
    width: 400px;
    position: absolute;
    left: calc(50% - 200px);
    top: calc(5%);
  }
  .copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
  }
  .create-an-account {
    color: #000000;
    text-align: center;
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 24px;
    line-height: 150%;
    letter-spacing: -0.01em;
    font-weight: 600;
    position: relative;
  }
  .enter-your-email-to-sign-up-for-this-app {
    color: #000000;
    text-align: center;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
    position: relative;
  }
  .input-and-button {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
  }
  .field {
    background: #ffffff;
    border-radius: 8px;
    border-style: solid;
    border-color: #e0e0e0;
    border-width: 1px;
    padding: 8px 16px 8px 16px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 400px;
    height: 40px;
    position: relative;
  }
  .label {
    color: #828282;
    text-align: left;
    font-family: var(--body-text-font-family, "Inter-Medium", sans-serif);
    font-size: var(--body-text-font-size, 20px);
    line-height: var(--body-text-line-height, 150%);
    font-weight: var(--body-text-font-weight, 500);
    position: relative;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .button {
    background: #000000;
    border-radius: 8px;
    padding: 0px 16px 0px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 400px;
    height: 40px;
    position: relative;
  }
  .primary {
    color: #ffffff;
    text-align: left;
    font-family: var(--small-text-font-family, "Inter-Medium", sans-serif);
    font-size: var(--small-text-font-size, 16px);
    line-height: var(--small-text-line-height, 150%);
    font-weight: var(--small-text-font-weight, 500);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .divider {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
  }
  .rectangle-11 {
    background: #e6e6e6;
    flex: 1;
    height: 1px;
    position: relative;
  }
  .or-continue-with {
    color: #828282;
    text-align: center;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
    position: relative;
  }
  .rectangle-10 {
    background: #e6e6e6;
    flex: 1;
    height: 1px;
    position: relative;
  }
  .button2 {
    background: #eeeeee;
    border-radius: 8px;
    padding: 0px 16px 0px 16px;
    align-self: stretch;
    flex-shrink: 0;
    height: 40px;
    position: relative;
  }
  .secondary {
    color: #000000;
    text-align: left;
    font-family: var(--small-text-font-family, "Inter-Medium", sans-serif);
    font-size: var(--small-text-font-size, 16px);
    line-height: var(--small-text-line-height, 150%);
    font-weight: var(--small-text-font-weight, 500);
    position: absolute;
    left: 172.5px;
    top: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .google {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 14px;
    top: 10px;
    overflow: visible;
  }
  .by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy {
    text-align: center;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
    position: relative;
    align-self: stretch;
  }
  .by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span {
    color: #828282;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
  }
  .by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span2 {
    color: #000000;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
  }
  .by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span3 {
    color: #828282;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
  }
  .by-clicking-continue-you-agree-to-our-terms-of-service-and-privacy-policy-span4 {
    color: #000000;
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
  }
  </style>
  