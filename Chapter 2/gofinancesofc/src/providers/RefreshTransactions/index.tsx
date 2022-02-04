import React, { createContext } from 'react';

export interface IRefreshContext {
  toRefresh: boolean;
}

export const RefreshContext = createContext<IRefreshContext>({
  toRefresh: false
});

export function RefreshProvider({ children }: any) {
  return (
    <RefreshContext.Provider value={{ toRefresh: false }}>
      {children}
    </RefreshContext.Provider>
  );
}