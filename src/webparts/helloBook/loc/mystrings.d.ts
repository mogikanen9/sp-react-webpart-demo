declare interface IHelloBookWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HelloBookWebPartStrings' {
  const strings: IHelloBookWebPartStrings;
  export = strings;
}
