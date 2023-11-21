export const useHandleClickMenu = (store) => {
  const handleClickMenu = () => {
    return store.getState().setSideBarOpened();
  };

  return {
    handleClickMenu
  };
};