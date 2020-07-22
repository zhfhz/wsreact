function Reg(str, mode) {
  let regMap = {
    '\\d': '0123456789',
    '\\w': '!(0123456789.-,./\\:;"\'{}[]【】。，？?~`!#$%^&*()=+ \\r\\n\\t)',
    '\\s': '\\r\\n\\t ',
    '\\.': '.',
    '.': 'any_char', // 单个任意字符
    ']': 'option', // 列表单项可选
    ']{': 'option_range', // 列表多项指定范围可选
    ']*': 'option_range_from_0', // 列表多项可选
    '.*': 'any_char_range_from_0',
    '\\s*': 'blank_char_range_from_0', // 空白字符多项可选
    '\\w*': 'lang_char_range_from_0', // 语言字符列表多项可选
    '\\d*': 'num_char_range_from_0', // 数字字符列表多项可选
    '\\s{': 'blank_char_range_from_0', // 空白字符列表指定范围多项可选
    '\\w{': 'lang_char_range_from_0', // 语言字符列表指定范围多项可选
    '\\d{': 'num_char_range_from_0', // 数字字符列表指定范围多项可选
  };
  /* 自定义正则 */
  function Reg() {
    this.str = str;
    this.matchBegin = false;
    this.matchEnd = false;
    this.modeGlobal = false;
    this.modeIgnoreCase = false;
    if (str.charAt(0) === '^') {
      this.matchBegin = true;
    }
    if (str.charAt(str.length - 1) === '$') {
      this.matchEnd = true;
    }
    if (typeof mode === 'string') {
      for (let c of mode) {
        if (c === 'g') {
          this.modeGlobal = true;
        }
        if (c === 'i') {
          this.modeIgnoreCase = true;
        }
      }
    }
    if (this.matchBegin) {
      this.str = this.str.slice(1);
    }
    if (this.matchEnd) {
      this.str = this.str.slice(0, -1);
    }
  }
  Reg.prototype.test = function (str) {
    for (let c of this.str) {
      if (c === '[') {
        // 列表处理
      } else if (c === '\\') {
        // 通配符处理
      } else {
        // 字符处理
      }
    }
  };

  return new Reg();
}
