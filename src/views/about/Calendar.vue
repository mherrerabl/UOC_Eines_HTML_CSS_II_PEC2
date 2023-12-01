<template>
<calendar locale="es" expanded :columns="columns" :attributes="attributes" color="primary-color"></calendar>
</template>

<script>
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { ref } from 'vue';
import { useScreens } from 'vue-screen-utils';

export default {
  components: {
    Calendar},
  setup() {
    let date = ref(new Date());
    const { mapCurrent  } = useScreens({xs: '0px', sm: '576px', md: '768px', lg: '960px'})
    const columns = mapCurrent ({ lg: 2 }, 1);

    const attributes = ref([
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 0, 13),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 0, 13),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 0, 14),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 0, 14),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 0, 20),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 0, 20),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 0, 21),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 0, 21),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 0, 27),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 0, 27),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 0, 28),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 0, 28),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 3),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 3),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 4),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 4),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 5€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 10),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 10),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 11),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 11),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 17),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 17),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 18),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 18),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 7€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 24),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 10€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 24),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 10€"
            }
        },
        {
            highlight: {
            fillMode: 'solid',
            },
            dates: new Date(2024, 1, 25),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 10€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 1, 25),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 10€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 2, 2),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 12€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 2, 3),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 12€"
            }
        },
        {
            highlight: {
            fillMode: 'light',
            },
            dates: new Date(2024, 2, 10),
            popover: {
                label: "Hora: 10:00h. Precio entrada: 15€"
            }
        }
    ])
    return { date, columns, attributes };
  },
}
</script>

<style lang="scss">
.vc-primary-color {
  --vc-accent-50: #ffffff;
  --vc-accent-100: #f5f6d8;
  --vc-accent-200: #eaecb1;
  --vc-accent-300: #dde38a ;
  --vc-accent-400: #d0da61;
  --vc-accent-500: #c1d12e;
  --vc-accent-600: #97a329;
  --vc-accent-700: #707823;
  --vc-accent-800: #4a4f1c;
  --vc-accent-900: #282913;
}
</style>