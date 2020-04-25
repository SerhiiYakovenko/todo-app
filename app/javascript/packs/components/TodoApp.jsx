import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            hideCompletedTodoItems: false,
            isLoading: true,
            errorMessage: null,
        };
        this.getTodoItems = this.getTodoItems.bind(this);
        this.createTodoItem = this.createTodoItem.bind(this);
        this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const todoItems = reorder(
            this.state.todoItems,
            result.source.index,
            result.destination.index
        );

        this.setState({
            todoItems
        });
    }
    componentDidMount() {
        this.getTodoItems();
    }
    getTodoItems() {
        axios
            .get("/api/v1/todo_items")
            .then(response => {
                this.clearErrors();
                this.setState({ isLoading: true });
                const todoItems = response.data;
                this.setState({ todoItems });
                this.setState({ isLoading: false });
            })
            .catch(error => {
                this.setState({ isLoading: true });
                this.setState({
                    errorMessage: {
                        message: "There was an error loading your todo items..."
                    }
                });
            });
    }
    createTodoItem(todoItem) {
        const todoItems = [todoItem, ...this.state.todoItems];
        this.setState({ todoItems });
    }
    toggleCompletedTodoItems() {
        this.setState({
            hideCompletedTodoItems: !this.state.hideCompletedTodoItems
        });
    }
    handleErrors(errorMessage) {
        this.setState({ errorMessage });
    }
    clearErrors() {
        this.setState({
            errorMessage: null
        });
    }
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {this.state.errorMessage && (
                                <ErrorMessage errorMessage={this.state.errorMessage} />
                            )}
                            {!this.state.isLoading && (
                                <>
                                    <TodoForm
                                        createTodoItem={this.createTodoItem}
                                        handleErrors={this.handleErrors}
                                        clearErrors={this.clearErrors}
                                    />
                                    <TodoItems
                                        toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                                        hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                                    >
                                        {this.state.todoItems.map((todoItem,index) => (
                                            <TodoItem
                                                key={todoItem.id}
                                                todoItem={todoItem}
                                                getTodoItems={this.getTodoItems}
                                                hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                                                handleErrors={this.handleErrors}
                                                clearErrors={this.clearErrors}
                                                index={index}
                                            />
                                        ))}
                                    </TodoItems>
                                </>
                            )}
                            {this.state.isLoading && <Spinner />}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('todo-app');
    app && ReactDOM.render(<TodoApp />, app)
});