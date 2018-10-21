const Card = (props) => {
    return(
        <div style={{margin: '1em'}}>
            <img width="75" src={props.avatar_url} />
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
                    {props.name}
                </div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card {...card} />)}
        </div>
    );
}


class Form extends React.Component {
    state = {userName: ''}
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form Submit', this.state.userName);
        //ajax...(fetch or axios)
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.prop.onSubmit(resp.data);
            });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                       value={this.state.userName}
                       onChange={(event) => this.setState({ userName: event.target.value })}
                       placeholder="Github username" required />
                <button type="submit">Add card</button>
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        cards: [
            {
                name: "Angry Grizzly Bear",
                avatar_url: "https://avatars3.githubusercontent.com/u/24954397?v=4",
                company: "Originate",
            },
            {
                name: "Angry Goats",
                avatar_url: "https://avatars0.githubusercontent.com/u/11184919?v=4",
                company: "Originate",
            },
        ]
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />

            </div>
        );
    }
}
ReactDOM.render(<App />, mountNode);