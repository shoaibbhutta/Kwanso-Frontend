import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import todo from '../assets/images/todo.svg';
import '../App.css';

const getLocalItmes = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};

const ListTask = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItmes());
  const [isEditItem, setIsEditItem] = useState(null);
  const history = useHistory();

  const addItem = useCallback(() => {
    if (!inputData) {
      alert('plzz fill data');
    } else {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );

      setInputData('');

      setIsEditItem(null);
    }
  }, [inputData, isEditItem, items]);

  const deleteItem = useCallback((index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updatedItems);
  }, [items]);

  const editItem = useCallback((id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  }, [items]);

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Add Your List Here </figcaption>
          </figure>
          {isEditItem ? (
            <div className="addItems">
              <input
                type="text"
                placeholder=" Add Task name..."
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              <i
                className="far fa-edit add-btn"
                title="Update Item"
                onClick={addItem}></i>
            </div>
          ) : null}

          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(elem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="CLICK TO ADD"
              onClick={() => history.push('/create-tasks')}>
              <span>{items.length ? 'ADD ANOTHER' : 'ADD TODO'}</span>{' '}
            </button>
          </div>

          {items.length ? (
            <div className="showItems">
              <button
                className="btn effect04"
                data-sm-link-text="Remove All"
                onClick={removeAll}>
                <span> CHECK LIST </span>{' '}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ListTask;
