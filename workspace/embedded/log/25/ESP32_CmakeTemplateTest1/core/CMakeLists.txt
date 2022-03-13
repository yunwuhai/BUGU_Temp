set(COMPONENT_REQUIRES )
set(COMPONENT_PRIV_REQUIRES )

set(srcs "src/core.c" "src/main.c")

idf_component_register(SRCS "${srcs}" 
                    INCLUDE_DIRS "." "include"
                    REQUIRES u8g2-hal-esp-idf)