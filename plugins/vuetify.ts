import {createVuetify} from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            themes: {
                light: {
                    colors: {
                        primary: "#4caf50",
                        secondary: "#ff9800",
                        accent: "#e91e63",
                        error: "#f44336",
                        warning: "#ff5722",
                        info: "#3f51b5",
                        success: "#8bc34a"
                    }
                }
            }
        }
    })

    nuxtApp.vueApp.use(vuetify);
})