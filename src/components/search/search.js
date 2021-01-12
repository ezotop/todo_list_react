import React, {Component} from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'All'},
            {name: 'important', label: 'Important'}
        ]
    }
       

    onUpdate = (e) => {
        const term = e.target.value;
        this.props.onUpdateSearch(term.toLowerCase());
    }


    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {onFilterSelect, filter} = this.props;
            const active = filter === name;
            const clazz = active ? 'active_btn' : 'btn';

            return (
                <button
                    key={name}
                    className={clazz}
                    onClick={ () => onFilterSelect(name) }>{label}</button>
            );
        });
        
        return (
            <div className="search">
                <input
                    onChange={this.onUpdate}
                    type="text"
                    name="find"
                    placeholder="Search task">
    
                </input>
                <div className="filter_btns">
                    {buttons}
                </div>
            </div>
        );
    }
};

