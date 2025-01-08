import { rem, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

function ThemeSwitch() {
    const theme = useMantineTheme();
    const { setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    })

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[6]}
        />
    );

    return <Switch
        style={{ width: "max-content" }}
        label="Theme"
        onChange={e => setColorScheme(e.currentTarget.checked ? "dark" : "light")}
        size="md"
        color="dark.4"
        onLabel={moonIcon}
        offLabel={sunIcon} />;
}

export default ThemeSwitch