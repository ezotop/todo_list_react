import React, {Component} from 'react';
import Header from '../header';
import Search from '../search';
import List from '../list';
import FormAdd from '../form-add';
import './app.css';

export default class App extends Component {

    state = {
        data: [
            {label: 'Feed the Cat', important: false, done: false, order: 1, id: 1},
            {label: 'Cook dinner', important: false, done: false, order: 2, id: 2},
            {label: 'Do the laundry', important: false, done: false, order: 3, id: 3}
        ],
        currentCard: null,
        term: '',
        filter: 'all'
    }

    onToggleImportant = (id) => {
        this.setState(this.state.data.map((item) => {
            if (item.id === id) {
                item.important = !item.important
            }
            return this.state.data;
        }))
    }

    onDoneTask = (id) => {
        this.setState(this.state.data.map((item) => {
            if (item.id === id) {
                item.done = !item.done
                item.important = false
            }
            return this.state.data;
        }))
    }

    onDeleteTask = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);

            const newData = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newData
            }
        });
    }

    onAddTask = (body) => {
        const newTask = {
            label: body,
            important: false,
            done: false,
            order: 1
        }

        let keys = [];
        this.state.data.forEach(obj => {
            keys.push(obj.id);
        });

        const getId = (n = 7) => {
            const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let newId = [0];
            for (let i = 0; i < n; i++) {
                newId += symbols[Math.round(Math.random() * (symbols.length)) + ''];
            }
            return newId;
        }
        getId();
        

        keys.forEach(key => {
            if (key === getId) {
                getId();
            } else {
                newTask.order = ++newTask.order;
                newTask.id = getId().replace(/^0/, '');
            }
        });

        this.setState(({data}) => {
            const newData = [...data, newTask];
            return {
                data: newData
            }
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    searchTask = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.label.toLowerCase().indexOf(term) > -1
        });
    }

    filterTask = (items, filter) => {
        if (filter === 'important') {
            return items.filter(item => item.important);
        } else {
            return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    dragStartHandler = (e, card) => {
        console.log('dragStart', card);

        this.setState({
            currentCard: card
        })
    }

    dragEndHandler = (e) => {
        e.target.style.background = '#fff';
        e.target.style.borderRadius = '6px';
    }

    dragOverHandler = (e) => {
        e.preventDefault();
        e.target.style.background = 'lightgray';
        e.target.style.borderRadius = '6px';
    }

    dropHandler = (e, card) => {
        e.preventDefault();
        console.log('drop', card);

        const {currentCard} = this.state;
        
        this.setState(({data}) => {
            const newData = data.map((c) => {
                if (c.id === card.id) {
                    return {...c, order: currentCard.order}
                }
    
                if (c.id === currentCard.id) {
                    return {...c, order: card.order}
                }
                return c
            });
            return {
                data: newData
            }
        });

        e.target.style.background = '#fff';
        e.target.style.borderRadius = '6px';
    }

    sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    };

    render() {
        const {data, term, filter} = this.state;
        const shownTasks = this.filterTask(this.searchTask(data, term), filter).sort(this.sortCards);
        // console.log(shownTasks);

        return (
            <div className="container">
                <Header/>
                <Search
                    onUpdateSearch={this.onUpdateSearch}
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                <List
                    tasks={shownTasks}
                    onToggleImportant={this.onToggleImportant}
                    onDoneTask={this.onDoneTask}
                    onDeleteTask={this.onDeleteTask}
                    dragStartHandler={this.dragStartHandler}
                    dragEndHandler={this.dragEndHandler}
                    dragOverHandler={this.dragOverHandler}
                    dropHandler={this.dropHandler}/>
                <FormAdd onAddTask={this.onAddTask}/>
            </div>
        )
    }
};

// export default App;

// const [data, setData] = useState([
//     {label: 'Feed the Cat', important: true, id: 1},
//     {label: 'Cook dinner', important: false, id: 2},
//     {label: 'Do the laundry', important: false, id: 3}
// ]);

// useEffect(() => {
//     onToggleImportant();
// });

// setData(() => {
//     data.map((item) => {
//         if (item.id === id) {
//             //console.log(item); // Нужный обьект консолится
//             item.important = !item.important;
//         }
//         return item;
//     });
//     return data;
// });