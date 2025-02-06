export const updateName = async (name: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (name.length < 3) {
    return "Имя должно быть длиннее 2 символов";
  }

  return null;
};