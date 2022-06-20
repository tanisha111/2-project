import { mount } from '@vue/test-utils';
import TestComponent from '../components/TestComponent';
import App from '../components/calculator';
describe('TestComponent', () => {
    test('Content of TestComponent', () => {
        const wrapper = mount(TestComponent, {
            propsData: {
                message: 'Hello from test!'
            }
        })
        expect(wrapper.text()).toEqual('The message is: Hello from test!')
    })
});
describe('Calculator input tests', () => {
    test('Test operand1 input value', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('1')
        expect(wrapper.vm.operand1).toBe(1)
    })
    test('Test operand2 input value', () => {
        const wrapper = mount(App)
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('1')
        expect(wrapper.vm.operand2).toBe(1)
    })
});

describe('Calculator operations tests', () => {
    test('Test sum operation', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('100')
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')
        const sumOperationButton = wrapper.find('button[name="+"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.result).toBe(105)
    })
    test('Test deduct operation', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('10')
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')
        const sumOperationButton = wrapper.find('button[name="-"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.result).toBe(5)
    })
    test('Test multiply operation', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('10')
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')
        const sumOperationButton = wrapper.find('button[name="*"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.result).toBe(50)
    })
    test('Test divide operation', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('20')
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')
        const sumOperationButton = wrapper.find('button[name="/"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.result).toBe(4)
    })
    test('Test divide operation to ZERO', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('20')
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('0')
        const sumOperationButton = wrapper.find('button[name="/"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.error).toBe('Делить на ноль нелья!')
    })
    test('Test exponentiation operation', () => {
        const wrapper = mount(App)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('4')
        const sumOperationButton = wrapper.find('button[name="^"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.result).toBe(16)
    })
    test('Test screen keyboard OPEN/CLOSE', () => {
        const wrapper = mount(App)
        const showScreenKeyboard = wrapper.find('input[name=show_keyboard]');
        showScreenKeyboard.setChecked();
        expect(wrapper.vm.screenKeyboard).toBe(true)
        showScreenKeyboard.setChecked(false);
        expect(wrapper.vm.screenKeyboard).toBe(false)
    })
    test('Test screen keyboard', async () => {
        const wrapper = mount(App)
        const buttonToSetOneInField = wrapper.find('button[name=key1]'); //клавиша 1 на клавиатуре
        const buttonToSetTwoInField = wrapper.find('button[name=key2]'); //клавиша 2 на клавиатуре
        const buttonToSetFourInField = wrapper.find('button[name=key4]'); //клавиша 4 на клавиатуре
        const buttonToRemoveNumberFromKeyboard = wrapper.find('button[name=remove]'); //клавиша УДАЛЕНИЯ на клавиатуре
        const showScreenKeyboard = wrapper.find('input[name=show_keyboard]'); //активатор клавиатуры
        const setOperand1AsPickedItem = wrapper.find('input[value=operand1]'); //радиокнопка переключения на поле операнда 1
        const setOperand2AsPickedItem = wrapper.find('input[value=operand2]'); //радиокнопка переключения на поле операнда 2

        //Открываем клавиатуру
        showScreenKeyboard.setChecked();
        expect(wrapper.vm.screenKeyboard).toBe(true);
        //Вводим 12 в operand1
        buttonToSetOneInField.trigger('click'); 
        buttonToSetTwoInField.trigger('click');
        expect(wrapper.vm.operand1).toBe(12);
        //Изменяем поле ввода на operand2
       await setOperand2AsPickedItem.setChecked();
        expect(wrapper.vm.picked).toEqual('operand2');
        //Вводим 24 в operand2
        buttonToSetTwoInField.trigger('click');
        buttonToSetFourInField.trigger('click');
        expect(wrapper.vm.operand2).toBe(24);
        //Изменяем поле ввода на operand1
        await setOperand1AsPickedItem.setChecked();
        expect(wrapper.vm.picked).toEqual('operand1');
        //Удаляем последнюю цифру из operand1
        buttonToRemoveNumberFromKeyboard.trigger('click');
        expect(wrapper.vm.operand1).toBe(1);
        const sumOperationButton = wrapper.find('button[name="+"]')
        sumOperationButton.trigger('click')
        expect(wrapper.vm.result).toBe(25)
    })
})
