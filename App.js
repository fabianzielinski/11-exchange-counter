const Cash = (props) => {
  const value = ((props.cash / props.ratio) * props.price).toFixed(2);
  return (
    <div>
      {props.title} {props.cash <= 0 ? "" : value}
    </div>
  );
};

class ExchangeCouter extends React.Component {
  state = {
    amount: "",
    product: "electricity",
  };

  static defaultProps = {
    currencies: [
      {
        id: 0,
        name: "złotówka",
        ratio: 1,
        title: "Wartość w złotych : ",
      },
      {
        id: 1,
        name: "dollar",
        ratio: 3.6,
        title: "Wartość w dolarach : ",
      },
      {
        id: 2,
        name: "euro",
        ratio: 4.2,
        title: "Wartość w euro : ",
      },
      {
        id: 3,
        name: "pound",
        ratio: 5.2,
        title: "Wartość w funtach : ",
      },
      {
        id: 4,
        name: "dfrank",
        ratio: 4.8,
        title: "Wartość w frankach : ",
      },
    ],

    prices: {
      electricity: 0.51,
      gas: 4.76,
      oranges: 3.79,
    },
  };

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleSelect = (e) => {
    this.setState({
      product: e.target.value,
      amount: "",
    });
  };

  insertSuffx(select) {
    if (select === "electricity") return <em> kWh </em>;
    else if (select === "gas") return <em> l </em>;
    else if (select === "oranges") return <em> kg </em>;
  }

  selectPrice = (select) => this.props.prices[select];

  render() {
    const { amount, product } = this.state;
    const price = this.selectPrice(product);

    const calculators = this.props.currencies.map((currency) => (
      <Cash
        key={currency.id}
        ratio={currency.ratio}
        title={currency.title}
        cash={amount}
        price={price}
      />
    ));

    return (
      <div className="app">
        <label>
          Wybierz produkt:
          <select value={product} onChange={this.handleSelect}>
            <option value="electricity">Prąd</option>
            <option value="gas">Bęzyna</option>
            <option value="oranges">Pomarańcze</option>
          </select>
        </label>
        <br />
        <label>
          <input type="number" value={amount} onChange={this.handleChange} />
          {this.insertSuffx(this.state.product)}
        </label>
        {calculators}
      </div>
    );
  }
}

ReactDOM.render(<ExchangeCouter />, document.getElementById("root"));
