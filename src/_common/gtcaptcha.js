const $ = window.$;

export default class GTCaptcha {
  obj = null

  ready = false

  handleReset = () => {}

  waitList = {
    onReady: [],
    onSuccess: [],
    onError: [],
  }

  constructor(selector) {
    this.selector = selector;
    if (!document.querySelector(selector)) return;
    $.ajax({
      url: '/captchas/new?_=' + new Date().getTime(),
      type: 'get',
      dataType: 'json',
    }).done((data) => {
      if (!document.querySelector(selector)) return;
      // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
      window.initGeetest({
        // 以下配置参数来自服务端 SDK
        gt: data.gt,
        challenge: data.challenge,
        offline: data.offline,
        new_captcha: true,
        product: 'popup',
        width: '100%',
        lang: (window.locale || 'en').toLowerCase(),
      }, (captchaObj) => {
        if (!document.querySelector(selector)) return;
        this.obj = captchaObj;
        this.ready = true;
        this.waitList.onReady.forEach(func => this.obj.onReady(func));
        this.waitList.onSuccess.forEach(func => this.obj.onSuccess(func));
        this.waitList.onError.forEach(func => this.obj.onError(func));
        captchaObj.appendTo(selector); // 将验证按钮插入到宿主页面中captchaBox元素内
      });
    });
  }

  reset() {
    if (!this.ready) return;
    this.obj.reset();
    this.handleReset();
  }

  getValidate() {
    if (!this.ready) return null;
    const ret = this.obj.getValidate();
    if (!ret) return ret;
    return {
      challenge: ret.geetest_challenge,
      validate: ret.geetest_validate,
      seccode: ret.geetest_seccode,
    };
  }

  onReady(func) {
    if (this.ready) {
      this.obj.onReady(func);
    } else {
      this.waitList.onReady.push(func);
    }
    return this;
  }

  onSuccess(func) {
    const _func = () => {
      func(this.getValidate());
    };
    if (this.ready) {
      this.obj.onSuccess();
    } else {
      this.waitList.onSuccess.push(_func);
    }
    return this;
  }

  onError(func) {
    if (this.ready) {
      this.obj.onError(func);
    } else {
      this.waitList.onError.push(func);
    }
    return this;
  }

  onReset(func) {
    this.handleReset = func;
  }
}
