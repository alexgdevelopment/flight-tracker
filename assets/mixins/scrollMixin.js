const scrollMixin = {
  methods: {
    scrollIntoView(ref) {
      ref.$el.scrollIntoView({ behaviour: 'smooth', inline: 'center' })
    },
  },
}

export default scrollMixin
