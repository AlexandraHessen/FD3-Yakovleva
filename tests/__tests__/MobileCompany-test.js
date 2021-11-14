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

                            // "нажмём" кнопку ещё раз
    buttonAll.props.onClick();
  
                            // 3. и получаем окончательный снэпшот
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

                            // "нажмём" кнопку ещё раз
    buttonActive.props.onClick();
  
                            // 3. и получаем окончательный снэпшот
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

                            // "нажмём" кнопку ещё раз
    buttonBlock.props.onClick();
  
                            // 3. и получаем окончательный снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
}

)