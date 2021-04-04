const verifyLogin = () => {
  try {
    const data = localStorage.getItem('data');
    if (data) {
      const unstringfyData = JSON.parse(data);
      const { user } = unstringfyData;
      const { session } = unstringfyData;
      return { user, session };
    }

    window.location.replace('/login');
    return null;
  } catch (error) {
    window.location.replace('/login');
    return error.toString();
  }
};

const encrypt = (data) => {
  try {
    return btoa(data);
  } catch (error) {
    window.location.replace('/');
    return error.toString();
  }
};

const dencrypt = (data) => {
  try {
    return atob(data);
  } catch (error) {
    window.location.replace('/');
    return error.toString();
  }
};

export {
  verifyLogin,
  encrypt,
  dencrypt,
};
