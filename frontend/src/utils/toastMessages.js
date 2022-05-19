const customToast = {
    danger(instance, message, title) {
        instance.$bvToast.toast(`${message}`, {
            title: title,
            autoHideDelay: 5000,
            variant: 'danger',
            toaster: 'b-toaster-top-center',
            appendToast: false,
            solid: true
        })
    },
    success(instance, message, title) {
        instance.$bvToast.toast(`${message}`, {
            title: title,
            autoHideDelay: 5000,
            variant: 'success',
            toaster: 'b-toaster-top-center',
            appendToast: false,
            solid: true
        })
    },
    errors(instance, error) {
        for (const errorIndex in error) {
            this.danger(instance, error[errorIndex], errorIndex)
        }
    },
}
export default customToast
