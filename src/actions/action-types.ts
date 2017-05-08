function generateAction(type: String) {
  return {
    ADD: type + '_ADD',
    DELETE: type + '_DELETE',
    ERROR: type + '_ERROR',
  }
}

export const NODE = generateAction('NODE')
export const EDGE = generateAction('EDGE')
