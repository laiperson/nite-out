import React from "react";

class DirectionsList extends React.Component {

  render() {

    var directions = this.props.directions.routeLegs[0].itineraryItems.map(
      step => {
        return (
          <div
            style={{
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
              <h1 style={{ fontWeight: 600, color: "#6B7A8F" }}>{Math.round(step.travelDistance / 0.01) * 0.01} mi.</h1>
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
      }
    );

    return (
      <div style={{ textAlign: "center", width: "100%", margin: "50px auto" }}>
        <ul>{directions}</ul>
      </div>
    );
  }
}

export default DirectionsList;
