import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GlobalStyle, theme } from 'assets';
import { InputSelect } from 'lib';
import { SelectItemProps } from 'models';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

interface InputSelectExport extends ComponentMeta<typeof InputSelect> {}
interface InputSelectStory extends ComponentStory<typeof InputSelect> {}

export default {
    title: 'Input/Select',
    component: InputSelect,
    argTypes: {
        onChange: { action: 'onChange(item, name)' },
        onBlur: { action: 'onBlur()' },
        onSearchChange: { action: 'onSearchChange(value)' },
    }
} as InputSelectExport;

const Template: InputSelectStory = (args) => {
    const [value, setValue] = useState<SelectItemProps>({ value: '', label: '' });

    return <ThemeProvider theme={theme}>
        <GlobalStyle theme={{ ...theme }} />
        <InputSelect
            alert={args.alert}
            disabled={args.disabled}
            icon={args.icon}
            items={args.items}
            hasReset={args.hasReset}
            helpText={args.helpText}
            inputVariant={args.inputVariant}
            isSearchable={args.isSearchable}
            label={args.label}
            multiple={args.multiple}
            onChange={(value) => setValue(value[0] || [])}
            onBlur={args.onBlur}
            onSearchChange={args.onSearchChange}
            placeholder={args.placeholder}
            selectedItems={items.filter(item => item.value === value.value)}
        />
    </ThemeProvider>
}

export const Default = Template.bind({});
export const SelectComplete = Template.bind({});
export const SelectDisabled = Template.bind({});
export const SelectMultiple = Template.bind({});
export const SelectSearchable = Template.bind({});
export const SelectVariantTertiary = Template.bind({});
export const SelectWithAlert = Template.bind({});
export const SelectWithLabel = Template.bind({});
export const SelectWithPlaceholder = Template.bind({});
export const SelectWithSelection = Template.bind({});

const items = [
    {
        'ibge_code': 2700102,
        'county_name': 'Água Branca',
        'county_state': 'AL',
        'value': '2700102',
        'label': 'Água Branca'
    },
    {
        'ibge_code': 2700201,
        'county_name': 'Anadia',
        'county_state': 'AL',
        'value': '2700201',
        'label': 'Anadia'
    },
    {
        'ibge_code': 2700300,
        'county_name': 'Arapiraca',
        'county_state': 'AL',
        'value': '2700300',
        'label': 'Arapiraca'
    },
    {
        'ibge_code': 2700409,
        'county_name': 'Atalaia',
        'county_state': 'AL',
        'value': '2700409',
        'label': 'Atalaia'
    },
    {
        'ibge_code': 2700508,
        'county_name': 'Barra de Santo Antônio',
        'county_state': 'AL',
        'value': '2700508',
        'label': 'Barra de Santo Antônio'
    },
    {
        'ibge_code': 2700607,
        'county_name': 'Barra de São Miguel',
        'county_state': 'AL',
        'value': '2700607',
        'label': 'Barra de São Miguel'
    },
    {
        'ibge_code': 2700706,
        'county_name': 'Batalha',
        'county_state': 'AL',
        'value': '2700706',
        'label': 'Batalha'
    },
    {
        'ibge_code': 2700805,
        'county_name': 'Belém',
        'county_state': 'AL',
        'value': '2700805',
        'label': 'Belém'
    },
    {
        'ibge_code': 2700904,
        'county_name': 'Belo Monte',
        'county_state': 'AL',
        'value': '2700904',
        'label': 'Belo Monte'
    },
    {
        'ibge_code': 2701001,
        'county_name': 'Boca da Mata',
        'county_state': 'AL',
        'value': '2701001',
        'label': 'Boca da Mata'
    },
    {
        'ibge_code': 2701100,
        'county_name': 'Branquinha',
        'county_state': 'AL',
        'value': '2701100',
        'label': 'Branquinha'
    },
    {
        'ibge_code': 2701209,
        'county_name': 'Cacimbinhas',
        'county_state': 'AL',
        'value': '2701209',
        'label': 'Cacimbinhas'
    },
    {
        'ibge_code': 2701308,
        'county_name': 'Cajueiro',
        'county_state': 'AL',
        'value': '2701308',
        'label': 'Cajueiro'
    },
    {
        'ibge_code': 2701357,
        'county_name': 'Campestre',
        'county_state': 'AL',
        'value': '2701357',
        'label': 'Campestre'
    },
    {
        'ibge_code': 2701407,
        'county_name': 'Campo Alegre',
        'county_state': 'AL',
        'value': '2701407',
        'label': 'Campo Alegre'
    },
    {
        'ibge_code': 2701506,
        'county_name': 'Campo Grande',
        'county_state': 'AL',
        'value': '2701506',
        'label': 'Campo Grande'
    },
    {
        'ibge_code': 2701605,
        'county_name': 'Canapi',
        'county_state': 'AL',
        'value': '2701605',
        'label': 'Canapi'
    },
    {
        'ibge_code': 2701704,
        'county_name': 'Capela',
        'county_state': 'AL',
        'value': '2701704',
        'label': 'Capela'
    },
    {
        'ibge_code': 2701803,
        'county_name': 'Carneiros',
        'county_state': 'AL',
        'value': '2701803',
        'label': 'Carneiros'
    },
    {
        'ibge_code': 2701902,
        'county_name': 'Chã Preta',
        'county_state': 'AL',
        'value': '2701902',
        'label': 'Chã Preta'
    },
    {
        'ibge_code': 2702009,
        'county_name': 'Coité do Nóia',
        'county_state': 'AL',
        'value': '2702009',
        'label': 'Coité do Nóia'
    },
    {
        'ibge_code': 2702108,
        'county_name': 'Colônia Leopoldina',
        'county_state': 'AL',
        'value': '2702108',
        'label': 'Colônia Leopoldina'
    },
    {
        'ibge_code': 2702207,
        'county_name': 'Coqueiro Seco',
        'county_state': 'AL',
        'value': '2702207',
        'label': 'Coqueiro Seco'
    },
    {
        'ibge_code': 2702306,
        'county_name': 'Coruripe',
        'county_state': 'AL',
        'value': '2702306',
        'label': 'Coruripe'
    },
    {
        'ibge_code': 2702355,
        'county_name': 'Craíbas',
        'county_state': 'AL',
        'value': '2702355',
        'label': 'Craíbas'
    },
    {
        'ibge_code': 2702405,
        'county_name': 'Delmiro Gouveia',
        'county_state': 'AL',
        'value': '2702405',
        'label': 'Delmiro Gouveia'
    },
    {
        'ibge_code': 2702504,
        'county_name': 'Dois Riachos',
        'county_state': 'AL',
        'value': '2702504',
        'label': 'Dois Riachos'
    },
    {
        'ibge_code': 2702553,
        'county_name': 'Estrela de Alagoas',
        'county_state': 'AL',
        'value': '2702553',
        'label': 'Estrela de Alagoas'
    },
    {
        'ibge_code': 2702603,
        'county_name': 'Feira Grande',
        'county_state': 'AL',
        'value': '2702603',
        'label': 'Feira Grande'
    },
    {
        'ibge_code': 2702702,
        'county_name': 'Feliz Deserto',
        'county_state': 'AL',
        'value': '2702702',
        'label': 'Feliz Deserto'
    },
    {
        'ibge_code': 2702801,
        'county_name': 'Flexeiras',
        'county_state': 'AL',
        'value': '2702801',
        'label': 'Flexeiras'
    },
    {
        'ibge_code': 2702900,
        'county_name': 'Girau do Ponciano',
        'county_state': 'AL',
        'value': '2702900',
        'label': 'Girau do Ponciano'
    },
    {
        'ibge_code': 2703007,
        'county_name': 'Ibateguara',
        'county_state': 'AL',
        'value': '2703007',
        'label': 'Ibateguara'
    },
    {
        'ibge_code': 2703106,
        'county_name': 'Igaci',
        'county_state': 'AL',
        'value': '2703106',
        'label': 'Igaci'
    },
    {
        'ibge_code': 2703205,
        'county_name': 'Igreja Nova',
        'county_state': 'AL',
        'value': '2703205',
        'label': 'Igreja Nova'
    },
    {
        'ibge_code': 2703304,
        'county_name': 'Inhapi',
        'county_state': 'AL',
        'value': '2703304',
        'label': 'Inhapi'
    },
    {
        'ibge_code': 2703403,
        'county_name': 'Jacaré dos Homens',
        'county_state': 'AL',
        'value': '2703403',
        'label': 'Jacaré dos Homens'
    },
    {
        'ibge_code': 2703502,
        'county_name': 'Jacuípe',
        'county_state': 'AL',
        'value': '2703502',
        'label': 'Jacuípe'
    },
    {
        'ibge_code': 2703601,
        'county_name': 'Japaratinga',
        'county_state': 'AL',
        'value': '2703601',
        'label': 'Japaratinga'
    },
    {
        'ibge_code': 2703700,
        'county_name': 'Jaramataia',
        'county_state': 'AL',
        'value': '2703700',
        'label': 'Jaramataia'
    },
    {
        'ibge_code': 2703759,
        'county_name': 'Jequiá da Praia',
        'county_state': 'AL',
        'value': '2703759',
        'label': 'Jequiá da Praia'
    },
    {
        'ibge_code': 2703809,
        'county_name': 'Joaquim Gomes',
        'county_state': 'AL',
        'value': '2703809',
        'label': 'Joaquim Gomes'
    },
    {
        'ibge_code': 2703908,
        'county_name': 'Jundiá',
        'county_state': 'AL',
        'value': '2703908',
        'label': 'Jundiá'
    },
    {
        'ibge_code': 2704005,
        'county_name': 'Junqueiro',
        'county_state': 'AL',
        'value': '2704005',
        'label': 'Junqueiro'
    },
    {
        'ibge_code': 2704104,
        'county_name': 'Lagoa da Canoa',
        'county_state': 'AL',
        'value': '2704104',
        'label': 'Lagoa da Canoa'
    },
    {
        'ibge_code': 2704203,
        'county_name': 'Limoeiro de Anadia',
        'county_state': 'AL',
        'value': '2704203',
        'label': 'Limoeiro de Anadia'
    },
    {
        'ibge_code': 2704302,
        'county_name': 'Maceió',
        'county_state': 'AL',
        'value': '2704302',
        'label': 'Maceió'
    },
    {
        'ibge_code': 2704401,
        'county_name': 'Major Isidoro',
        'county_state': 'AL',
        'value': '2704401',
        'label': 'Major Isidoro'
    },
    {
        'ibge_code': 2704500,
        'county_name': 'Maragogi',
        'county_state': 'AL',
        'value': '2704500',
        'label': 'Maragogi'
    },
    {
        'ibge_code': 2704609,
        'county_name': 'Maravilha',
        'county_state': 'AL',
        'value': '2704609',
        'label': 'Maravilha'
    },
    {
        'ibge_code': 2704708,
        'county_name': 'Marechal Deodoro',
        'county_state': 'AL',
        'value': '2704708',
        'label': 'Marechal Deodoro'
    },
    {
        'ibge_code': 2704807,
        'county_name': 'Maribondo',
        'county_state': 'AL',
        'value': '2704807',
        'label': 'Maribondo'
    },
    {
        'ibge_code': 2704906,
        'county_name': 'Mar Vermelho',
        'county_state': 'AL',
        'value': '2704906',
        'label': 'Mar Vermelho'
    },
    {
        'ibge_code': 2705002,
        'county_name': 'Mata Grande',
        'county_state': 'AL',
        'value': '2705002',
        'label': 'Mata Grande'
    },
    {
        'ibge_code': 2705101,
        'county_name': 'Matriz de Camaragibe',
        'county_state': 'AL',
        'value': '2705101',
        'label': 'Matriz de Camaragibe'
    },
    {
        'ibge_code': 2705200,
        'county_name': 'Messias',
        'county_state': 'AL',
        'value': '2705200',
        'label': 'Messias'
    },
    {
        'ibge_code': 2705309,
        'county_name': 'Minador do Negrão',
        'county_state': 'AL',
        'value': '2705309',
        'label': 'Minador do Negrão'
    },
    {
        'ibge_code': 2705408,
        'county_name': 'Monteirópolis',
        'county_state': 'AL',
        'value': '2705408',
        'label': 'Monteirópolis'
    },
    {
        'ibge_code': 2705507,
        'county_name': 'Murici',
        'county_state': 'AL',
        'value': '2705507',
        'label': 'Murici'
    },
    {
        'ibge_code': 2705606,
        'county_name': 'Novo Lino',
        'county_state': 'AL',
        'value': '2705606',
        'label': 'Novo Lino'
    },
    {
        'ibge_code': 2705705,
        'county_name': 'Olho d\'Água das Flores',
        'county_state': 'AL',
        'value': '2705705',
        'label': 'Olho d\'Água das Flores'
    },
    {
        'ibge_code': 2705804,
        'county_name': 'Olho d\'Água do Casado',
        'county_state': 'AL',
        'value': '2705804',
        'label': 'Olho d\'Água do Casado'
    },
    {
        'ibge_code': 2705903,
        'county_name': 'Olho d\'Água Grande',
        'county_state': 'AL',
        'value': '2705903',
        'label': 'Olho d\'Água Grande'
    },
    {
        'ibge_code': 2706000,
        'county_name': 'Olivença',
        'county_state': 'AL',
        'value': '2706000',
        'label': 'Olivença'
    },
    {
        'ibge_code': 2706109,
        'county_name': 'Ouro Branco',
        'county_state': 'AL',
        'value': '2706109',
        'label': 'Ouro Branco'
    },
    {
        'ibge_code': 2706208,
        'county_name': 'Palestina',
        'county_state': 'AL',
        'value': '2706208',
        'label': 'Palestina'
    },
    {
        'ibge_code': 2706307,
        'county_name': 'Palmeira dos Índios',
        'county_state': 'AL',
        'value': '2706307',
        'label': 'Palmeira dos Índios'
    },
    {
        'ibge_code': 2706406,
        'county_name': 'Pão de Açúcar',
        'county_state': 'AL',
        'value': '2706406',
        'label': 'Pão de Açúcar'
    },
    {
        'ibge_code': 2706422,
        'county_name': 'Pariconha',
        'county_state': 'AL',
        'value': '2706422',
        'label': 'Pariconha'
    },
    {
        'ibge_code': 2706448,
        'county_name': 'Paripueira',
        'county_state': 'AL',
        'value': '2706448',
        'label': 'Paripueira'
    },
    {
        'ibge_code': 2706505,
        'county_name': 'Passo de Camaragibe',
        'county_state': 'AL',
        'value': '2706505',
        'label': 'Passo de Camaragibe'
    },
    {
        'ibge_code': 2706604,
        'county_name': 'Paulo Jacinto',
        'county_state': 'AL',
        'value': '2706604',
        'label': 'Paulo Jacinto'
    },
    {
        'ibge_code': 2706703,
        'county_name': 'Penedo',
        'county_state': 'AL',
        'value': '2706703',
        'label': 'Penedo'
    },
    {
        'ibge_code': 2706802,
        'county_name': 'Piaçabuçu',
        'county_state': 'AL',
        'value': '2706802',
        'label': 'Piaçabuçu'
    },
    {
        'ibge_code': 2706901,
        'county_name': 'Pilar',
        'county_state': 'AL',
        'value': '2706901',
        'label': 'Pilar'
    },
    {
        'ibge_code': 2707008,
        'county_name': 'Pindoba',
        'county_state': 'AL',
        'value': '2707008',
        'label': 'Pindoba'
    },
    {
        'ibge_code': 2707107,
        'county_name': 'Piranhas',
        'county_state': 'AL',
        'value': '2707107',
        'label': 'Piranhas'
    },
    {
        'ibge_code': 2707206,
        'county_name': 'Poço das Trincheiras',
        'county_state': 'AL',
        'value': '2707206',
        'label': 'Poço das Trincheiras'
    },
    {
        'ibge_code': 2707305,
        'county_name': 'Porto Calvo',
        'county_state': 'AL',
        'value': '2707305',
        'label': 'Porto Calvo'
    },
    {
        'ibge_code': 2707404,
        'county_name': 'Porto de Pedras',
        'county_state': 'AL',
        'value': '2707404',
        'label': 'Porto de Pedras'
    },
    {
        'ibge_code': 2707503,
        'county_name': 'Porto Real do Colégio',
        'county_state': 'AL',
        'value': '2707503',
        'label': 'Porto Real do Colégio'
    },
    {
        'ibge_code': 2707602,
        'county_name': 'Quebrangulo',
        'county_state': 'AL',
        'value': '2707602',
        'label': 'Quebrangulo'
    },
    {
        'ibge_code': 2707701,
        'county_name': 'Rio Largo',
        'county_state': 'AL',
        'value': '2707701',
        'label': 'Rio Largo'
    },
    {
        'ibge_code': 2707800,
        'county_name': 'Roteiro',
        'county_state': 'AL',
        'value': '2707800',
        'label': 'Roteiro'
    },
    {
        'ibge_code': 2707909,
        'county_name': 'Santa Luzia do Norte',
        'county_state': 'AL',
        'value': '2707909',
        'label': 'Santa Luzia do Norte'
    },
    {
        'ibge_code': 2708006,
        'county_name': 'Santana do Ipanema',
        'county_state': 'AL',
        'value': '2708006',
        'label': 'Santana do Ipanema'
    },
    {
        'ibge_code': 2708105,
        'county_name': 'Santana do Mundaú',
        'county_state': 'AL',
        'value': '2708105',
        'label': 'Santana do Mundaú'
    },
    {
        'ibge_code': 2708204,
        'county_name': 'São Brás',
        'county_state': 'AL',
        'value': '2708204',
        'label': 'São Brás'
    },
    {
        'ibge_code': 2708303,
        'county_name': 'São José da Laje',
        'county_state': 'AL',
        'value': '2708303',
        'label': 'São José da Laje'
    },
    {
        'ibge_code': 2708402,
        'county_name': 'São José da Tapera',
        'county_state': 'AL',
        'value': '2708402',
        'label': 'São José da Tapera'
    },
    {
        'ibge_code': 2708501,
        'county_name': 'São Luís do Quitunde',
        'county_state': 'AL',
        'value': '2708501',
        'label': 'São Luís do Quitunde'
    },
    {
        'ibge_code': 2708600,
        'county_name': 'São Miguel dos Campos',
        'county_state': 'AL',
        'value': '2708600',
        'label': 'São Miguel dos Campos'
    },
    {
        'ibge_code': 2708709,
        'county_name': 'São Miguel dos Milagres',
        'county_state': 'AL',
        'value': '2708709',
        'label': 'São Miguel dos Milagres'
    },
    {
        'ibge_code': 2708808,
        'county_name': 'São Sebastião',
        'county_state': 'AL',
        'value': '2708808',
        'label': 'São Sebastião'
    },
    {
        'ibge_code': 2708907,
        'county_name': 'Satuba',
        'county_state': 'AL',
        'value': '2708907',
        'label': 'Satuba'
    },
    {
        'ibge_code': 2708956,
        'county_name': 'Senador Rui Palmeira',
        'county_state': 'AL',
        'value': '2708956',
        'label': 'Senador Rui Palmeira'
    },
    {
        'ibge_code': 2709004,
        'county_name': 'Tanque d\'Arca',
        'county_state': 'AL',
        'value': '2709004',
        'label': 'Tanque d\'Arca'
    },
    {
        'ibge_code': 2709103,
        'county_name': 'Taquarana',
        'county_state': 'AL',
        'value': '2709103',
        'label': 'Taquarana'
    },
    {
        'ibge_code': 2709152,
        'county_name': 'Teotônio Vilela',
        'county_state': 'AL',
        'value': '2709152',
        'label': 'Teotônio Vilela'
    },
    {
        'ibge_code': 2709202,
        'county_name': 'Traipu',
        'county_state': 'AL',
        'value': '2709202',
        'label': 'Traipu'
    },
    {
        'ibge_code': 2709301,
        'county_name': 'União dos Palmares',
        'county_state': 'AL',
        'value': '2709301',
        'label': 'União dos Palmares'
    },
    {
        'ibge_code': 2709400,
        'county_name': 'Viçosa',
        'county_state': 'AL',
        'value': '2709400',
        'label': 'Viçosa'
    }
]

Default.args = {
    items
}

SelectComplete.args = {
    items,
    alert: {
        message: 'This is an alert message',
        type: 'error'
    },
    label: 'Select',
    helpText: 'Texto de ajuda',
    placeholder: 'Selecione',
}

SelectDisabled.args = {
    items,
    alert: {
        message: 'This is an alert message',
        type: 'error'
    },
    disabled: true,
    label: 'Select',
    helpText: 'Texto de ajuda',
    placeholder: 'Selecione',
}

SelectMultiple.args = {
    items,
    label: 'Select Multiple',
    multiple: true
}

SelectSearchable.args = {
    items,
    isSearchable: 'internal',
}

SelectVariantTertiary.args = {
    items,
    inputVariant: 'secondary'
}

SelectWithAlert.args = {
    alert: {
        type: 'error',
        message: 'This is an alert message'
    },
    items,
}

SelectWithLabel.args = {
    items,
    label: 'Select with label'
}

SelectWithPlaceholder.args = {
    items,
    placeholder: 'Selecione'
}

SelectWithSelection.args = {
    items,
    selectedItems: [items[0]]
}