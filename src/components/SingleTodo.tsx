import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from '../Models/models';
import './styles.css'

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };
    return (
        <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            className="todos__single"
        >
            {edit ? (
                <input
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todos__single--text"
                    ref={inputRef}
                />
            ) : todo.isDone ? (
                <s className="todos__single--text">{index+1}. {todo.todo}</s>
            ) : (
                <span className="todos__single--text">{index+1}. {todo.todo}</span>
            )}
            <div>
                <span
                    className="icon"
                    onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit);
                        }
                    }}
                >
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;