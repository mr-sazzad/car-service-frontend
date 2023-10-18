export const hideEmail = (email: string) => {
    const [username, domain] = email.split("@");
    const usernameLength = Math.min(2, username.length);

    const hiddenUsername = username
      .slice(0, usernameLength)
      .padEnd(username.length, "*");
    return `${hiddenUsername}@${domain}`;
  };