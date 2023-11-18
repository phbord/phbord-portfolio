export const useHandleFilterClick = (data, id) => {
  const onIsImportantClick = () => {
    let newData;

    switch (id) {
      case 'btn-filter':
        newData = data.filter((item) => item.is_important);
        break;
      case 'btn-filter-inverse':
        newData = data.filter((item) => !item.is_important);
        break;
      default:
        newData = data;
        break;
    }
    return newData;
  };

  const onPositionCodeClick = () => {
    let newData;

    switch (id) {
      case 'btn-filter':
        newData = data.filter((item) => item.position_code === 'dev-js');
        break;
      case 'btn-filter-inverse':
        newData = data.filter((item) => item.position_code === 'int');
        break;
      default:
        newData = data;
        break;
    }
    return newData;
  };

  return {
    onIsImportantClick,
    onPositionCodeClick
  }
};