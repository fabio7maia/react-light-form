import React from 'react';
import { Form } from '../components';
import { StorybookHelper } from '../storybook';
import { BasicForm } from './basicForm';

const story = StorybookHelper.writeStory({ component: Form, group: 'Modules' });

export default story.meta;

const template = (): JSX.Element => <BasicForm />;

export const Default = template.bind({});

Default.args = {};
