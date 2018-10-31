import React, { Component } from 'react';

export const PlannerContext = React.createContext();

export const PlannerProvider = PlannerContext.Provider;
export const PlannerConsumer = PlannerContext.Consumer;

// export class PlannerProvider extends Component() {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			totalEngineers: 0
// 		}
// 	}

// 	render() {
// 		const { children } = this.props;

// 		<PlannerContext.Provider 
// 			value={{
// 				totalEngineers: this.state.totalEngineers
// 			}}
// 		>
// 			<PlannerTimeline/>
// 			{children}
// 		</PlannerContext.Provider>
// 	}
// }

// export const PlannerConsumer = PlannerContext.Consumer;
