import axios from "axios";

const getUserByEmail = async (email: string) => {
  const userInfos = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${email}`
  );

  return userInfos.data;
};

const getUserById = async (id: string) => {
  const userInfos = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
  );

  return userInfos.data;
};

export { getUserByEmail, getUserById };
