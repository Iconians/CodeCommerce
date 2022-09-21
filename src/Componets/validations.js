export const emailValidation = (value) => {
  if (value) {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) {
      return '';
    }else {
      return 'Enter Valid email'
    }
  }
  else {
    return 'Enter Valid email'
  }
}

export const passwordValidation = (value) => {
  if (value) {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)) {
      return '';
    }else {
      return 'Invalid password'
    }
  }
}

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return '';
    }else {
      return 'Alpabetical letters only'
    }
  }
  else {
   return undefined;
  }
};

export const onlyNumberValidation = (value) => {
  if (value) {
    if (/\D/g.test(value)) {
      return '';
    }else {
      return 'Numbers Only'
    }
  }
  else {
    return 'Numbers Only'
  }
};