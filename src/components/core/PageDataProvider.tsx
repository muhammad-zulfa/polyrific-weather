import React, {createContext, useState} from "react";

interface IPageDataContext{
    pageTitle?: string;
    setPageTitle: (title: string) => void;
    pageDescription?: string;
    setPageDescription: (description: string) => void;
}

export const PageDataContext = createContext<IPageDataContext>({
  setPageTitle: (title) => {},
  setPageDescription: (description) => {}
})

interface IPageDataProvider {
    children?: React.ReactNode
}

export const PageDataProvider : React.FunctionComponent<IPageDataProvider> = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>()
  const [pageDescription, setPageDescription] = useState<string>();

  const value: IPageDataContext = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription
  }
  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  )
}
