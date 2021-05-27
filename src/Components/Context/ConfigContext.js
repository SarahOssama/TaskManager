import React, { createContext, Component } from "react";


export const ConfigContext = createContext();

/** Configuration Class to move between mock and Back Servers
 * @extends Component
 */
class ConfigContextProvider extends Component {
    state = {  
        configURL:'http://localhost:5000',
    }
    render() { 
        return ( 
            <ConfigContext.Provider value={{ ...this.state }}>
                 {this.props.children}
            </ConfigContext.Provider>
         );
    }
}
 
export default ConfigContextProvider;