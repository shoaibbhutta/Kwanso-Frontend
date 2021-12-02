import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import todo from '../assets/images/todo.svg';
import '../App.css';

const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};

const NewList = () => {
  const [inputData, setInputData] = useState('');
  const [items] = useState(getLocalItems());
  const history = useHistory();

  const addItem = useCallback(() => {
    if (!inputData) {
      alert('plzz fill data');
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setInputData('');
      localStorage.setItem('lists', JSON.stringify([...items, allInputData]));
      history.push('/list-tasks');
    }
  }, [history, inputData, items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Task name..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewList;
