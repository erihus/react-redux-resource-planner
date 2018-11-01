import React, { Component } from 'react';

export const PlannerContext = React.createContext();

export const PlannerProvider = PlannerContext.Provider;
export const PlannerConsumer = PlannerContext.Consumer;
