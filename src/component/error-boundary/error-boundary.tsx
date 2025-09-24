"use client";

import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";
import { JsonView } from "../json-view/json-view";

type State = { is: false, } | { is: true, payload: Error }

export class ErrorBoundary extends Component<PropsWithChildren, State> {

    constructor(props: PropsWithChildren) {
        super(props);
        this.state = { is: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { is: true, payload: error };
    }

    render(): ReactNode {
        if (this.state.is)
            return <JsonView data={this.state.payload} />;

        return this.props.children;
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.setState({
            is: true,
            payload: error,
        });
    }
}