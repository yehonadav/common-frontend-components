import { getLocation } from '../services/router/useRouterStore'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export type Query = Record<string, string>;

export type GetQuery = <T extends Query>(defaultValues?:Partial<T>) => Partial<T> & Query;

export const getUrlQuery:GetQuery = <T extends Query>(defaultValues?:Partial<T>) => {
  const search = getLocation().search;
  const params = new URLSearchParams(search);
  const query: Partial<T> & Query = {};

  // @ts-ignore
  params.forEach((value, key) => {query[key] = value});

  if (defaultValues)
    for (const k in defaultValues) // @ts-ignore
      query[k] = query[k] === undefined ? defaultValues[k] : query[k];

  return query;
}

export const useUrlQuery:GetQuery = <T extends Query>(defaultValues?:Partial<T>) => {
  const search = useLocation().search;

  const [query, setQuery] = useState(getUrlQuery(defaultValues))

  useEffect(()=>{
    setQuery(getUrlQuery(defaultValues))
  },[search, defaultValues]);

  return query;
}