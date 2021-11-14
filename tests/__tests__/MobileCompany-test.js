"use strict"
import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from "../components/MobileCompany"
                            //импортируем файл который будем тестировать

let clientsArr = [{code: 1, surname: "Иванов", name: "Иван", patronymic: "Иванович", balance: 200},
                  {code: 2, surname: "Сидоров", name: "Сидор", patronymic: "Сидорович", balance: 250},
                  {code: 3, surname: "Петров", name: "Петр", patronymic: "Петрович", balance: 180},
                  {code: 4, surname: "Григорьев", name: "Григорий", patronymic: "Григорьевич", balance: -220}]
                  // -------- нужен для создания компонента --------//

test("работа кнопок Filter", ()=>{
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
    <MobileCompany  clients={clientsArr}/> // с нужными данными для построения
  );

                            // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

                            // найдём в вёрстке компонента саму кнопку
                            // в верстке <input type="button" value="Все" onClick={this.allClients}/>
    const buttonAll = component.root.find( el => el.type=='input' && el.props.value == 'Все' ); 
                            // нажимаем на кнопку
    buttonAll.props.onClick();

                            // 2. получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

                            // найдём в вёрстке компонента саму кнопку
                            // в верстке <input type="button" value="Активные" onClick={this.activeClients}/> 
                            const buttonActive = component.root.find( el => el.type=='input' && el.props.value == 'Активные' ); 
                            // нажимаем на кнопку
    buttonActive.props.onClick();

                            // 2. получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

                            // найдём в вёрстке компонента саму кнопку
                            // в верстке <input type="button" value="Заблокированные" onClick={this.blockedClients}/> 
                            const buttonBlock = component.root.find( el => el.type=='input' && el.props.value == 'Заблокированные' ); 
                            // нажимаем на кнопку
    buttonBlock.props.onClick();

                            // 2. получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

})

test("работа кнопки Add", ()=>{
                              // создаём тестовую версию компонента который будем тестировать
    const component = renderer.create(
        <MobileCompany  clients={clientsArr}/> // с нужными данными для построения
    );

                            // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

                            // имитируем добавление нового клиента
    let newClient={code: 5, surname: "Романов", name: "Роман", patronymic: "Романович", balance: -400};
    component.getInstance().evAdd(newClient); //evAdd=(newRow)=> функция добавления в MobileCompany

                            //получаем снимок с новым клиентом
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
})

test("работа кнопки Delete", ()=>{
  // создаём тестовую версию компонента который будем тестировать
    const component = renderer.create(
    <MobileCompany  clients={clientsArr}/> // с нужными данными для построения
    );

    // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // имитируем удаление клиента
    component.getInstance().evDelete(2); //evDelete=(code)=> функция удаления в MobileCompany

    //получаем снимок с новым клиентом
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
})

// 

test("работа кнопки Edit", ()=>{
  // создаём тестовую версию компонента который будем тестировать
    const component = renderer.create(
    <MobileCompany  clients={clientsArr}/> // с нужными данными для построения
    );

    // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // имитируем изменение клиента
    let editRow={code: 1, surname: "Edit", name: "Edit", patronymic: "Edit", balance: 0}
    component.getInstance().evSave(editRow); //evSave=(editRow)=> функция сохранениея изменений в MobileCompany

    //получаем снимок с новым клиентом
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
})