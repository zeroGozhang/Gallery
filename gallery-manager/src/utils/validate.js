/*eslint-disable*/
import {ref, withParams} from 'vuelidate/lib/validators/common'

export function equalTo(equalTo) {
  return withParams(
      {type: 'equalTo'},
      function (value, parentVm) {
        let flag = true;
        if (value) {
          flag = !(value === ref(equalTo, this, parentVm));
        }
        return flag;
      }
  )
}

// 字符串长短范围校验
export function betweenLength(min, max) {
  return withParams(
      {type: 'betweenLength'},
      function (value) {
        let flag = true;
        if (value) {
          flag = value.length >= min && value.length <= max;
        }
        return flag;
      }
  )
}

// 校验字母与数字
export function isNumStr() {
  return withParams(
      {type: 'isNumStr'},
      function (value) {
        let flag = true;
        if (value) {
          const reg = /^[A-Za-z0-9]+$/;
          flag = reg.test(value);
        }
        return flag;
      }
  )
}

// 校验nickname
export function checkNickName(type) {
  return withParams(
      {type: 'checkNickName'},
      function (value) {
        let flag = true;
        if (value) {
          let reg = '';
          if (type === 'nickName') {
            reg = /^[\u4e00-\u9fa5+\dA-Za-z_-]{4,20}$/g;
          } else if (type === 'memberName') {
            reg = /^[\u4e00-\u9fa5+\dA-Za-z_-]{2,20}$/g;
          } else if (type === 'name') {
            reg = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/g;
          }
          flag = reg.test(value);
        }

        return flag;
      }
  )
}

// 校验手机号码
export function checkLoginName() {
  return withParams(
      {type: 'checkLoginName'},
      function (value) {
        let flag = true;
        if (value) {
          const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
          const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          flag = phoneReg.test(value) || emailReg.test(value);
        }
        return flag;
      }
  )
}

// 校验手机号码
export function checkPhone() {
  return withParams(
      {type: 'checkPhone'},
      function (value) {
        let flag = true;
        if (value) {
          const reg1 = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
          const reg2 = /\d{3}\*{4}\d{4}/;
          flag = reg1.test(value) || !!value.match(reg2);
        }
        return flag;
      }
  )
}

// 校验固定电话
export function checkTelephone() {
  return withParams(
      {type: 'checkTelephone'},
      function (value) {
        let flag = true;
        if (value && value !== '-') {
          const reg1 = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,17})+(\-[0-9]{1,4})?$/;
          const reg2 = /^(\d{3,4}-)(\*{4})\d{3,4}$/;
          flag = reg1.test(value) || !!value.match(reg2);
        }
        return flag;
      }
  )
}
