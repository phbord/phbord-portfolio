export const useHandleFilterClick = (data, id) => {
  const onFilterClick = () => {
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

  return {
    onFilterClick
  }
};