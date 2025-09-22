import { type Ref, onMounted } from "vue";
import { useUserData } from "~~/controllers/userDataController";

export const useUserDataComposable = (paramId: Ref<string | number>) => {
  const {
    status: statusUserData,
    userdata: usersData,
    error,
    refresh: usersDataRefresh,
    clear: usersDataClear,
  } = useUserData(paramId);

  return {
    statusUserData,
    usersData,
    usersDataClear,
    usersDataRefresh,
  };
};
