const classNames = (...classes: Array<string>): String => {
  return classes.filter(Boolean).join(' ')
}

export default classNames;