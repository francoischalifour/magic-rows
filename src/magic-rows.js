class MagicRows {
  constructor (form) {
    if (!form) return

    this.rows = [...form.querySelectorAll('input[type="text"], input[type="email"]')]

    this.maxRows = form.dataset.maxRows || 6
    this.placeholderFormat = form.dataset.formatPlaceholder
    this.idFormat = form.dataset.formatId
    this.nameFormat = form.dataset.formatName

    this.noRows = this.rows.length
    this.lastRow = this.rows[this.noRows - 1]

    this.addRow = this.addRow.bind(this)

    this.addEventListeners()
  }

  addEventListeners () {
    if (!this.lastRow) return

    this.lastRow.addEventListener('focus', this.addRow)
    this.lastRow.addEventListener('change', this.addRow)
  }

  removeEventListeners () {
    if (!this.lastRow) return

    this.lastRow.removeEventListener('focus', this.addRow)
    this.lastRow.removeEventListener('change', this.addRow)
  }

  addRow () {
    if (this.noRows >= this.maxRows) return
    if (this.noRows > 1) {
      if (!this.rows[this.noRows - 2].value) return
    }

    this.removeEventListeners()

    this.noRows++

    const cloneRow = this.cloneRow(this.lastRow)
    const newRow = this.fillRow(cloneRow)

    this.insertRow(this.lastRow, newRow)

    this.lastRow = newRow
    this.rows.push(this.lastRow)

    this.addEventListeners()
  }

  cloneRow (row) {
    const newRow = this.lastRow.cloneNode(true)
    newRow.value = ''

    return newRow
  }

  fillRow (row) {
    const id = row.getAttribute('id')
    const placeholder = row.getAttribute('placeholder')
    const name = row.getAttribute('name')

    if (id) row.setAttribute('id', this.getNextValue(id, this.idFormat))
    if (placeholder) row.setAttribute('placeholder', this.getNextValue(placeholder, this.placeholderFormat))
    if (name) row.setAttribute('name', this.getNextValue(name, this.nameFormat))

    return row
  }

  insertRow (reference, node) {
    reference.parentNode.insertBefore(node, reference.nextSibling)
  }

  getNextValue (value, format) {
    if (format) {
      return format.includes('$')
        ? format.replace(/\$+/g, this.getPatternNumbers(format, format.split('$').length - 1))
        : format.includes('@')
          ? format.replace('@', this.getLetter(this.guessNextPatternNumber()))
          : this.guessNextValue(value)
    } else {
      return this.guessNextValue(value, true)
    }
  }

  getPatternNumbers (format, noDigits) {
    return (Array(noDigits).fill('0').join('') + this.guessNextPatternNumber()).slice(-noDigits)
  }

  guessNextPatternNumber () {
    const likelyAttribute =
      this.lastRow.getAttribute('id') ||
      this.lastRow.getAttribute('name') ||
      this.lastRow.getAttribute('placeholder')

    const numberGuessed = Number(likelyAttribute.replace(/^\D+/g, '')) + 1

    return numberGuessed
  }

  guessNextValue (value, detection) {
    return detection
      ? value.replace(/\d+/g, n => ++n)
      : this.hasNumber(value)
        ? value.replace(/\d+/g, this.getPatternNumbers(value, value.replace(/^\D+/g, '').length))
        : `${value}-${this.noRows}`
  }

  getLetter (number) {
    return String.fromCharCode(96 + number).toUpperCase()
  }

  hasNumber (string) {
    return /\d/.test(string)
  }
}

window.addEventListener('load', () => {
  [...document.querySelectorAll('[data-action="magic-rows"]')]
    .forEach(form => new MagicRows(form))
})
