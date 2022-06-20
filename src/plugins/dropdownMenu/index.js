export default {
    install(Vue) {
      if(this.installed) {
        return
      }
      this.installed = true
      this.caller = null
  
      Vue.prototype.$dropdownMenu = {
        EventBus: new Vue(),
  
        open({event, items}) {
          const caller = event.target
          if(caller !== this.caller) {
            this.caller = caller
            this.EventBus.$emit('open', {items, caller})
          }else {
            this.close()
          }
        },
  
        close() {
          this.caller = null
          this.EventBus.$emit('close')
        }
      }
    }
  }