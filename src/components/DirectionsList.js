import React from "react";

class DirectionsList extends React.Component {
  constructor(props) {
    super(props);

    const { directions } = this.props;

    this.state = {
      steps: directions.routeLegs[0].itineraryItems
    };
  }
  render() {
    console.log("this.props: ");
    console.log(this.props);
    if (this.state.steps !== null) {
      var directions = this.state.steps.map(step => {
        return (
          <div
            style={{
              display: "flex",
              backgroundColor: "white",
              witdh: "90%",
              padding: "5%",
              margin: "5% 0",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
            }}
          >
            <div
              id="distance-entry"
              style={{
                width: "20%",
                float: "left",
                verticalAlign: "middle",
                display: "inline-block"
              }}
            >
              <h1 style={{ fontWeight: 600, color: "#6B7A8F" }}>
                {Math.round(step.travelDistance / 0.01) * 0.01} mi.
              </h1>
            </div>

            <div
              id="instruction-entry"
              style={{
                width: "80%",
                float: "right",
                textAlign: "left",
                height: "100%",
                borderLeft: "3px solid #F7882F",
                paddingLeft: "10px"
              }}
            >
              <h1>{step.instruction.text}</h1>
            </div>
          </div>
        );
      });

      return (
        <div
          style={{ textAlign: "center", width: "100%", margin: "50px auto" }}
        >
          <ul>{directions}</ul>
        </div>
      );
    } else {
      return (
        <div
          style={{ textAlign: "center", width: "100%", margin: "50px auto" }}
        >
          <h1>Could not find directions</h1>
        </div>
      );
    }
  }
}

export default DirectionsList;
