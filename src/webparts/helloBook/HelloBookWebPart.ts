import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloBookWebPartStrings';
//import HelloBook from './components/HelloBook';
//import { IHelloBookProps } from './components/IHelloBookProps';
import AppRoute from './AppRoute';

export interface IHelloBookWebPartProps {
  description: string;
}

export default class HelloBookWebPart extends BaseClientSideWebPart<IHelloBookWebPartProps> {

  public render(): void {
    /*const element: React.ReactElement<IHelloBookProps> = React.createElement(
      HelloBook,
      {
        description: this.properties.description
      }
    );*/
    const element = React.createElement(
      AppRoute
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
