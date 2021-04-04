const shortData = (data, length) => {
  try {
    if (data === null || data === undefined) return null;
    const trimmedData = data.substring(0, length);
    return `${trimmedData}.`;
  } catch (error) {
    return error.toString();
  }
};

const validateResetPassword = (state) => {
  try {
    const getInsertedUserPassword = state.password;
    const giveFormatInsertedUserPassword = getInsertedUserPassword.toString().trim().toLowerCase();
    const passwordLength = giveFormatInsertedUserPassword.length < 6 || giveFormatInsertedUserPassword.length > 16;
    const passwordContainNumber = (giveFormatInsertedUserPassword.search(/[0-9]/) === -1);
    const passwordContainCharacter = (giveFormatInsertedUserPassword.search(/[! @ # $ % & * ~ ` : "" '' ' " ? / , .]/) === -1);

    let result = 'loading';
    let error = false;

    if (state.password.length < 1 && state.confirmPassword.length < 1) {
      error = true;
      result = 'Empty form found';
      const formClass = 'form-result';
      const passwordClass = 'password-input';
      const confirmPasswordClass = 'confirmPassword-input';
      return { error, result, formClass, passwordClass, confirmPasswordClass };
    }

    if (state.password.length < 1) {
      error = true;
      result = 'Password is required';
      const formClass = 'form-result';
      const passwordClass = 'password-input';
      return { error, result, formClass, passwordClass, };
    }

    if (passwordLength || passwordContainNumber || passwordContainCharacter) {
      error = true;
      result = 'Strong password is required eg:qwerty@123';
      const passwordClass = 'password-input';
      const formClass = 'form-result';
      return { error, result, formClass, passwordClass, };
    }

    if (state.password !== state.confirmPassword) {
      error = true;
      result = 'Confirm password should equal to password';
      const formClass = 'form-result';
      const confirmPasswordClass = 'confirmPassword-input';
      return { error, result, formClass, confirmPasswordClass, };
    }

    return { error };
  } catch (error) {
    return error.toString();
  }
};

const validateLogin = (state) => {
  try {
    // Validate a strong password
    const getInsertedUserPassword = state.password;
    const giveFormatInsertedUserPassword = getInsertedUserPassword.toString().trim().toLowerCase();
    const passwordLength = giveFormatInsertedUserPassword.length < 6 || giveFormatInsertedUserPassword.length > 16;
    const passwordContainNumber = (giveFormatInsertedUserPassword.search(/[0-9]/) === -1);
    const passwordContainCharacter = (giveFormatInsertedUserPassword.search(/[! @ # $ % & * ~ ` : "" '' ' " ? / , .]/) === -1);

    // validate email or phone number
    const getInsertedUserEmail = state.email;
    const giveFormatInsertedUserEmail = getInsertedUserEmail.toString().trim().toLowerCase();
    const email = giveFormatInsertedUserEmail;
    const emailLength = email.length > 40;
    const goodEmail = /^(([a-zA-Z0-9 .-_]{2,6})+)@(([a-zA-Z0-9]{2,6})+).([a-z]{2,6})(.[a-z]{2,6})$/;
    const checkedEmailCredential = (!goodEmail.test(email));

    let result = 'loading';
    let error = false;

    if (state.email.length < 1 && state.password.length < 1) {
      error = true;
      result = 'Empty form found';
      const formClass = 'form-result';
      const emailClass = 'email-input';
      const passwordClass = 'password-input';
      return { error, result, formClass, emailClass, passwordClass, };
    }

    if (state.email.length < 1) {
      error = true;
      result = 'Email is required';
      const formClass = 'form-result';
      const emailClass = 'email-input';
      return { error, result, formClass, emailClass, };
    }

    if (checkedEmailCredential || emailLength) {
      error = true;
      result = 'Valid email is required eg: your@email.com';
      const emailClass = 'email-input';
      const formClass = 'form-result';
      return { error, result, formClass, emailClass, };
    }

    if (state.password.length < 1) {
      error = true;
      result = 'Password is required';
      const formClass = 'form-result';
      const passwordClass = 'password-input';
      return { error, result, formClass, passwordClass, };
    }

    if (passwordLength || passwordContainNumber || passwordContainCharacter) {
      error = true;
      result = 'Strong password is required eg:qwerty@123';
      const passwordClass = 'password-input';
      const formClass = 'form-result';
      return { error, result, formClass, passwordClass, };
    }

    return { error };
  } catch (error) {
    return error.toString();
  }
};

const validateResendLink = (state) => {
  try {
    const getInsertedUserEmail = state.email;
    const giveFormatInsertedUserEmail = getInsertedUserEmail.toString().trim().toLowerCase();
    const email = giveFormatInsertedUserEmail;
    const emailLength = email.length > 40;
    const goodEmail = /^(([a-zA-Z0-9 .-_]{2,6})+)@(([a-zA-Z0-9]{2,6})+).([a-z]{2,6})(.[a-z]{2,6})$/;
    const checkedEmail = (!goodEmail.test(email));

    let result = 'loading';
    let error = false;

    if (state.email.length < 1) {
      error = true;
      result = 'Email is required';
      const formClass = 'form-result';
      const emailClass = 'email-input';
      return { error, result, formClass, emailClass, };
    }

    if (checkedEmail || emailLength) {
      error = true;
      result = 'Valid email is required eg: your@email.com';
      const emailClass = 'email-input';
      const formClass = 'form-result';
      return { error, result, formClass, emailClass, };
    }

    return { error };
  } catch (error) {
    return error.toString();
  }
};

export { shortData, validateLogin, validateResendLink, validateResetPassword };
