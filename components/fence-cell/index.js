Component({
  data: {},
  properties: {
    cell: Object
  },
  methods: {
    onTap() {
      this.triggerEvent('celltap', {
        cell: this.properties.cell
      }, {
          bubbles: true,
          composed: true
      })
    }
  }
})