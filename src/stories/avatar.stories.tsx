import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from 'lib'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'assets';

interface LoadingExport extends ComponentMeta<typeof Avatar> {}
interface LoadingStory extends ComponentStory<typeof Avatar> {}

export default {
    title: 'Exibição de Dados/Avatar',
    component: Avatar,
} as LoadingExport;

const Template: LoadingStory = (args) => <ThemeProvider theme={theme}>
    <GlobalStyle theme={{ ...theme }} />
    <Avatar
        image={args.image}
    />
</ThemeProvider>

export const Default = Template.bind({});
export const AvatarImage = Template.bind({});

Default.args = {}

AvatarImage.args = {
    image: 'https://avatars0.githubusercontent.com/u/17098981'
}